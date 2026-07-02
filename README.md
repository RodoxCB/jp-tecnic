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

Configure o WhatsApp em `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5527997169987
```

## Deploy

Deploy automático na Vercel a cada push. Detalhes em [DEPLOY.md](./DEPLOY.md).

**Fluxo:** commit em `staging` → validar preview → aprovar → merge em `main`.
