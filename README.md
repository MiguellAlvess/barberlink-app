# BarbarLink

Aplicação web full stack para gestão de barbearias, permitindo que usuários realizem reservas de serviços, acompanhem e gerenciem seus agendamentos, visualizando detalhes como data, horário, valor e localização da barbearia.

![Banner BarberLink](public/banner.png)

## Configuração de ambiente

Antes de rodar o projeto, copie o arquivo .env.example para **.env** e configure a variável DATABASE_URL conforme seu ambiente:

```bash
cp .env.example .env
```

Se estiver usando o Docker para o banco, a URL deve seguir o padrão:

```bash
postgresql://postgres:suasenha@localhost:5432/nomedobanco
```

Substitua **suasenha** e **nomedobanco** pelos valores usados na criação do container.

## Executando o projeto

### Subindo banco de dados com o Docker Compose

Para facilitar o desenvolvimento, utilize o Docker Compose para criar e iniciar o container PostgreSQL:

```bash
docker-compose up -d
```

Esse comando iniciará o container conforme definido no arquivo docker-compose.yml.

## Aplicando migrations com o prisma

Com o banco ativo, aplique as migrations para criar a estrutura do banco:

```bash
npx prisma migrate deploy
```

Em ambiente de desenvolvimento, você também pode usar:

```bash
npx prisma migrate dev
```

## Instalação

```bash
# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

## Principais tecnologias utilizadas

- **Next.js**
- **Shadcn**
- **TailwindCSS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**
- **Next Auth**
- **Zod**
- **React Hook Form**

## Autenticação

A autenticação é realizada utilizando **NextAuth.js** com provedor do **Google**, permitindo que os usuários façam login de forma rápida e segura sem precisar criar uma senha manualmente. As credenciais do Google (Client ID e Client Secret) são armazenadas em variáveis de ambiente e configuradas no **.env**. Quando um usuário faz login, o NextAuth valida a sessão junto ao Google e gera um **JWT** que é usado para autenticar as requisições às rotas protegidas da aplicação. Esse token é gerenciado internamente pelo NextAuth e pode ser acessado através da função **getSession()** no frontend ou pelo middleware no backend, garantindo que apenas usuários autenticados possam realizar ações como criar ou gerenciar reservas.

Exemplo de configuração no `.env`:

```env
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
NEXTAUTH_URL=http://localhost:3000
```

## Deploy

A aplicação está hospedada na Vercel, aproveitando a integração nativa com Next.js para deploys rápidos e escaláveis, enquanto o banco de dados PostgreSQL utiliza o Neon.tech, uma solução serverless que simplifica o gerenciamento e oferece escalabilidade automática na nuvem.

## Vídeo

Vídeo mostrando funcionalidades e interfaces do sistema:

https://github.com/user-attachments/assets/3fdcf1a1-fab1-4307-9d2c-b914219a6074

## Funcionalidades atuais

- ✅ **Reserva de serviços:** os usuários podem selecionar e reservar serviços das barbearias
- ✅ **Gerenciamento de agendamentos:** acompanhamento detalhado de reservas, incluindo data, horário e valor

- ✅ **Autenticação:** login rápido com Google via NextAuth.js
- ✅ **Busca rápida:** filtro de serviços disponível para facilitar a seleção

---

## Melhorias futuras

- ⭐ **Sistema de avaliações:** permitir que usuários avaliem os serviços
- 🎛️ **Painel de controle:** dashboard administrativo para barbearias
- 📈 **Dashboard visual:** métricas de desempenho e agendamentos
- 🗺️ **Barbearias próximas:** localização e proximidade com o usuário
- 🧭 **Integração com mapas:** rotas e navegação até a barbearia
