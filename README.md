# Pet Shop Scheduler

Aplicação web para gestao de agendamentos de atendimento em pet shop.

Permite criar, listar por períodos do dia, editar e remover agendamentos com validação de horário e prevenção de conflito de agenda.

---

## Contexto do Projeto

Este projeto foi desenvolvido durante um curso de Next.js da Rocketseat, com o objetivo de aplicar na prática conceitos de desenvolvimento web moderno.

A aplicação simula um sistema de gerenciamento para pet shops, permitindo organizar atendimentos e estruturar o fluxo de agendamentos de forma simples e eficiente.

Durante o desenvolvimento, foram explorados conceitos como componentização, organização de código e construção de interfaces com foco em usabilidade.

---

## Links

- Demo: [vercel](https://pet-shop-system-nu.vercel.app/)
- Repositorio: [github](https://github.com/thayline07/pet-shop-system)

---

## Visão Geral

Este projeto foi construido com foco em:

- Experiência de uso simples para cadastro rápido
- Estrutura moderna com App Router (Next.js)
- Persistência com PostgreSQL via Prisma

---

## Funcionalidades

- Criar agendamento
- Editar agendamento
- Remover agendamento
- Filtrar visualização por data
- Organizar agendamentos por periodo:
  - Manhã (09h-12h)
  - Tarde (13h-18h)
  - Noite (19h-21h)
- Bloquear horários inválidos e conflitos de horário

---

## Stack Tecnica

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- React Hook Form + Zod

---

## Arquitetura (resumo)

- UI e composição de página: src/app e src/components
- Regras do formulário: src/components/appointment-form
- Server Actions (create/update/delete): src/app/actions.ts
- Persistência e cliente do banco: prisma e lib/prisma.ts
- Utilitários de agenda: src/utils/appointment-utils.ts

---

## Estrutura de Pastas (essencial)

```text
src/
	app/
		actions.ts
		page.tsx
	components/
		appointment-form/
		appointment-card/
		period-section/
	utils/
		appointment-utils.ts
prisma/
	schema.prisma
	migrations/
lib/
	prisma.ts
docker-compose.yml
```

---

## Como Rodar Localmente

### Requisitos

- Node.js 20+
- pnpm
- Docker Desktop em execucao

### 1) Instalar dependências

```bash
pnpm install
```

### 2) Configurar variáveis de ambiente

Criar arquivo .env com base no .env.example.

Exemplo:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/petshop?schema=public"
```

### 3) Subir banco local

```bash
docker compose up -d
```

### 4) Aplicar migrações

```bash
pnpm prisma migrate deploy
```

### 5) Rodar aplicação

```bash
pnpm dev
```

Aplicação disponível em:

- http://localhost:3000

---

## Comandos Úteis

```bash
pnpm run validate:typecheck
pnpm lint
pnpm build
pnpm prisma studio
```

## Troubleshooting Rapido

### Erro P1001 (nao conecta no banco)

Causa comum: PostgreSQL local nao esta rodando.

Solução:

```bash
docker compose up -d
```

Verifique se o Docker Desktop está aberto.

### Erro ao criar agendamento

Checklist:

- DATABASE_URL configurada no .env
- Banco ativo em localhost:5432
- Migracoes aplicadas com sucesso

---

## Autor

- Nome: Thayline Inês Simioni
- LinkedIn: (www.linkedin.com/in/thayline-simioni-222b7b313)
- Email: thaylinesimioni@gmail.com
