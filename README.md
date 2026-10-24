# Cartão digital · Saulo Rocha

Cartão digital do Saulo Rocha, corretor de imóveis, feito pela HM Digital.

Abertura que monta a logo "Chave-casa": a casa é desenhada, a chave entra girando e destranca a porta, a porta abre com luz,
e a chave se encaixa na lateral da casa (a casa vira a cabeça da chave). Depois aparecem o "SR", o nome e o CRECI.

## Editar os dados

Tudo fica em `assets/js/perfil.js`:

- `HM_PROFILE`: nome, cargo, texto, WhatsApp, Instagram e **CRECI** (`creci: "12345"` faz o número aparecer na abertura e no cartão).
- `HM_INTENTS`: botões "Quero comprar / vender / investir", cada um com a mensagem pronta do WhatsApp.
- `HM_PROJECTS`: empreendimentos. Lista vazia = a seção não aparece. Imagens em `assets/img/`.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar na Vercel

Site estático, sem build: **Add New → Project → importar este repositório → Deploy** (Framework Preset: *Other*).
Domínio sugerido: `saulo.hmdigitalgo.com` (já usado na prévia do link em `index.html`).
