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
        if urlparse(url).scheme in ('http', 'https') and url not in out:
            out.append(url)
    return out


def prepare(data):
    """Valida e converte os bytes baixados em uma imagem RGB 1200x652, ou None."""
    try:
        img = Image.open(io.BytesIO(data))
        img.load()
    except Exception:
        return None  # SVG, HTML ou arquivo corrompido
    img = ImageOps.exif_transpose(img)
    if img.width < MIN_W or img.height < MIN_H:
        return None
    if img.mode in ('RGBA', 'LA', 'P'):
        base = Image.new('RGB', img.size, (255, 255, 255))
        base.paste(img.convert('RGBA'), mask=img.convert('RGBA').split()[-1])
        img = base
    else:
        img = img.convert('RGB')
    return ImageOps.fit(img, (TARGET_W, TARGET_H), Image.LANCZOS, centering=(0.5, 0.4))


def fingerprint(img):
    return hashlib.md5(img.resize((16, 16)).convert('L').tobytes()).hexdigest()


def all_articles(data):
    yield data['hotNews']
    for items in data['categories'].values():
        yield from items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', default='.')
    ap.add_argument('--force-id', nargs='*', default=[], help='refaz a imagem destas notícias, mesmo que já exista')
    args = ap.parse_args()

    root = Path(args.root)
    news_path = root / 'data' / 'news.json'
    images = root / 'assets' / 'images'
    images.mkdir(parents=True, exist_ok=True)
    data = json.loads(news_path.read_text(encoding='utf-8'))
    articles = list(all_articles(data))

    def has_file(a):
        return bool(a.get('image')) and (root / a['image']).is_file()

    seen = set()
    for a in articles:  # imagens já existentes entram na checagem de duplicadas
        if has_file(a):
            try:
                seen.add(fingerprint(Image.open(root / a['image']).convert('RGB')))
            except Exception:
                pass
    by_category = {}
    for a in articles:
        if has_file(a) and a['category'] not in by_category and not a['image'].endswith('.svg'):
            by_category[a['category']] = (a['image'], a.get('imageAlt', ''))

    report, changed = [], False
    for a in articles:
        if has_file(a) and a['id'] not in args.force_id:
            continue
        status = None
        try:
            for url in candidates(a['sourceUrl']):
                if any(w in url.lower() for w in SKIP_WORDS):
                    continue
                try:
                    raw, ctype, _ = get(url, MAX_IMG)
                except Exception:
                    continue
                img = prepare(raw)
                if img is None:
                    continue
                fp = fingerprint(img)
                if fp in seen:
                    status = 'imagem repetida de outra notícia'
                    continue
                seen.add(fp)
                dest = images / f"{a['id']}.webp"
                img.save(dest, 'WEBP', quality=80, method=6)
                host = urlparse(url).netloc.removeprefix('www.')
                a['image'] = f"assets/images/{a['id']}.webp"
                a['imageAlt'] = f"Imagem de divulgação da matéria “{a['title']}”"
                a['imageCredit'] = f"Imagem: {a['source']} ({host})"
                report.append((a['id'], 'OK', host, f'{dest.stat().st_size // 1024} KB'))
                status = 'ok'
                changed = True
                break
            if status != 'ok':
                status = status or 'a página não tem imagem utilizável'
        except Exception as exc:  # página fora do ar, bloqueio, timeout...
            status = f'erro ao abrir a página ({type(exc).__name__})'
        if status != 'ok':
            fallback = by_category.get(a['category'])
            if fallback:
                a['image'], a['imageAlt'] = fallback
                a.pop('imageCredit', None)
                changed = True
            report.append((a['id'], 'categoria', status, ''))
        time.sleep(1)  # gentileza com os sites de origem

    if changed:
        news_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('\nRESUMO')
    for rid, st, info, size in report:
        print(f'  {st:9} {rid:34} {info} {size}')
    if not report:
        print('  Nenhuma notícia precisava de imagem.')


if __name__ == '__main__':
    main()
