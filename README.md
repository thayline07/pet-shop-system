# Pet Shop Scheduler

Aplicacao web para gestao de agendamentos de atendimento em pet shop.

Permite criar, listar por periodos do dia, editar e remover agendamentos com validacao de horario e prevencao de conflito de agenda.

## Links

- Demo (producao): COLE_AQUI_URL_PUBLICA
- Repositorio: COLE_AQUI_URL_GITHUB

## Visao Geral

Este projeto foi construido com foco em:

- Experiencia de uso simples para cadastro rapido
- Regras de negocio claras para horarios permitidos
- Estrutura moderna com App Router (Next.js)
- Persistencia com PostgreSQL via Prisma

## Funcionalidades

- Criar agendamento
- Editar agendamento
- Remover agendamento
- Filtrar visualizacao por data
- Organizar agendamentos por periodo:
  - Manha (09h-12h)
  - Tarde (13h-18h)
  - Noite (19h-21h)
- Bloquear horarios invalidos e conflitos de horario

## Stack Tecnica

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- React Hook Form + Zod

## Arquitetura (resumo)

- UI e composicao de pagina: src/app e src/components
- Regras do formulario: src/components/appointment-form
- Server Actions (create/update/delete): src/app/actions.ts
- Persistencia e cliente do banco: prisma e lib/prisma.ts
- Utilitarios de agenda: src/utils/appointment-utils.ts

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

## Como Rodar Localmente

### Requisitos

- Node.js 20+
- pnpm
- Docker Desktop em execucao

### 1) Instalar dependencias

```bash
pnpm install
```

### 2) Configurar variaveis de ambiente

Criar arquivo .env com base no .env.example.

Exemplo:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/petshop?schema=public"
```

### 3) Subir banco local

```bash
docker compose up -d
```

### 4) Aplicar migracoes

```bash
pnpm prisma migrate deploy
```

### 5) Rodar aplicacao

```bash
pnpm dev
```

Aplicacao disponivel em:

- http://localhost:3000

## Comandos Uteis

```bash
pnpm run validate:typecheck
pnpm lint
pnpm build
pnpm prisma studio
```

## Troubleshooting Rapido

### Erro P1001 (nao conecta no banco)

Causa comum: PostgreSQL local nao esta rodando.

Solucao:

```bash
docker compose up -d
```

Verifique se o Docker Desktop esta aberto.

### Erro ao criar agendamento

Checklist:

- DATABASE_URL configurada no .env
- Banco ativo em localhost:5432
- Migracoes aplicadas com sucesso

## Deploy em Producao (recomendado para avaliacao)

### Arquitetura recomendada

- App Next.js: Vercel
- Banco PostgreSQL: Neon ou Supabase

### Passo a passo

1. Criar banco PostgreSQL gerenciado.
2. Copiar a connection string para DATABASE_URL.
3. Importar repositorio no Vercel.
4. Configurar variavel de ambiente DATABASE_URL no projeto.
5. Fazer deploy.
6. Executar migracoes no ambiente de producao.

## Publicacao no GitHub

### O que deve existir no repo

- Codigo fonte completo
- README atualizado
- .env.example
- Migracoes Prisma
- docker-compose.yml

### O que nao deve ser versionado

- .env
- pgdata
- node_modules

## Evidencias para Recrutador

Para facilitar a avaliacao, inclua no topo deste README:

- Link da aplicacao publicada
- Link do repositorio
- 2 a 4 screenshots da interface
- Curta descricao do desafio que o projeto resolve

## Diferenciais Tecnicos

- Validacao de formulario no client com Zod
- Validacao de regras de negocio no servidor
- Revalidacao de tela apos operacoes de escrita
- Separacao de responsabilidades entre UI, regras e persistencia

## Roadmap (opcional)

- Testes unitarios (utils e regras de horario)
- Testes de integracao das server actions
- CI com lint + typecheck + build
- Autenticacao para multiusuario

## Autor

- Nome: SEU_NOME
- LinkedIn: COLE_AQUI_SEU_LINKEDIN
- Email: SEU_EMAIL
