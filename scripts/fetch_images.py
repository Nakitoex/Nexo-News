#!/usr/bin/env python3
"""Busca a imagem de divulgação (og:image) de cada notícia e salva em assets/images/.

Para cada notícia cujo arquivo de imagem NÃO existe, o script:
  1. abre a página da matéria (campo sourceUrl);
  2. procura a imagem de compartilhamento (og:image / twitter:image);
  3. baixa, recorta na proporção dos cards (16:8,7), reduz e salva como WebP;
  4. atualiza data/news.json (image, imageAlt, imageCredit).

Se a página não tiver imagem utilizável, a notícia passa a usar a imagem da própria
categoria (nunca fica com a imagem reserva). Notícias que já têm imagem não são alteradas.

Uso:  python scripts/fetch_images.py [--root .] [--force-id ID ...]
Requer: pip install pillow
"""
import argparse
import hashlib
import io
import json
import re
import time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

from PIL import Image, ImageOps

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; NexusNewsBot/1.0; projeto universitario; link preview)',
    'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
}
TARGET_W, TARGET_H = 1200, 652          # proporção 16 / 8,7 usada pelos cards
MIN_W, MIN_H = 600, 300                 # imagens menores que isso costumam ser logos
MAX_HTML, MAX_IMG = 2_000_000, 8_000_000
SKIP_WORDS = ('logo', 'favicon', 'sprite', 'placeholder', 'default-share', 'blank')


class MetaParser(HTMLParser):
    """Coleta as URLs de imagem declaradas no <head> da página."""
    def __init__(self):
        super().__init__()
        self.found = []

    def handle_starttag(self, tag, attrs):
        a = {k.lower(): (v or '') for k, v in attrs}
        if tag == 'meta':
            key = (a.get('property') or a.get('name') or '').lower()
            if key in ('og:image', 'og:image:url', 'og:image:secure_url', 'twitter:image', 'twitter:image:src') and a.get('content'):
                self.found.append(a['content'].strip())
        elif tag == 'link' and a.get('rel', '').lower() == 'image_src' and a.get('href'):
            self.found.append(a['href'].strip())


def get(url, limit):
    with urlopen(Request(url, headers=HEADERS), timeout=25) as resp:
        data = resp.read(limit + 1)
        if len(data) > limit:
            raise ValueError('arquivo grande demais')
        return data, resp.headers.get('Content-Type', ''), resp.geturl()


def candidates(page_url):
    html, _, final_url = get(page_url, MAX_HTML)
    parser = MetaParser()
    parser.feed(html.decode('utf-8', 'replace'))
    out = []
    for raw in parser.found:
        url = urljoin(final_url, raw)
        if urlparse(url).scheme in ('http', 'https')
