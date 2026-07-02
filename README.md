# JP Tecnic

Site institucional da JP Tecnic — assistência técnica de celulares.

## Branches

| Branch | Ambiente |
|--------|----------|
| `staging` | Preview (Vercel) — branch de trabalho |
| `main` | Production (Vercel) — só após validação |

## Desenvolvimento

```bash
npm install
npm run dev
```

Configure em `.env.local`:

```
ADMIN_PASSWORD=sua_senha_aqui
NEXT_PUBLIC_WHATSAPP_NUMBER=5527997169987
BLOB_READ_WRITE_TOKEN=   # opcional local; obrigatório na Vercel para salvar edições
```

## Admin

Painel em **`/admin`** para editar textos, galeria, loja e conteúdo do site.

- **Geral:** site, hero, contato, regiões
- **Galeria:** fotos dos serviços (upload ou URL)
- **Loja:** celulares à venda
- **Conteúdo:** serviços, FAQ, avaliações, textos das seções

Conteúdo salvo em `data/content.json` (local) ou Vercel Blob (produção).

## Loja

Página **`/loja`** com celulares revisados à venda. Compra via WhatsApp.

## Deploy

Deploy automático na Vercel a cada push. Detalhes em [DEPLOY.md](./DEPLOY.md).

**Fluxo:** commit em `staging` → validar preview → aprovar → merge em `main`.
