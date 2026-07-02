# Deploy na Vercel — JP Tecnic

## Branches e ambientes

| Branch | Ambiente Vercel | Uso |
|--------|-----------------|-----|
| `staging` | **Preview** | Desenvolvimento e validação antes de ir para produção |
| `main` | **Production** | Produção — só após aprovação explícita |

## Fluxo de trabalho

1. Trabalhar sempre na branch `staging`
2. Commit e push em `staging` → deploy automático de **Preview** na Vercel
3. Validar o preview (URL gerada pela Vercel)
4. Só depois de confirmar que está ok, pedir aprovação para merge/push em `main`
5. Push em `main` → deploy automático de **Production**

**Nunca commitar direto em `main` sem validação prévia em `staging`.**

## Setup inicial (uma vez)

### 1. Autenticar CLIs

```bash
gh auth login
vercel login
```

### 2. Criar repositório e enviar branches

```bash
gh repo create jp-tecnic --public --source=. --remote=origin --push
git push -u origin staging
```

### 3. Conectar Vercel ao GitHub

```bash
vercel link
vercel git connect
```

No dashboard Vercel (**Project Settings → Git**):

- **Production Branch:** `main`
- Preview deployments: habilitado (inclui `staging`)

### 4. Variáveis de ambiente

Configure em **Settings → Environment Variables** conforme o projeto precisar, marcando Production e/ou Preview.

## Deploy manual (opcional)

```bash
# Preview
vercel

# Production
vercel --prod
```
