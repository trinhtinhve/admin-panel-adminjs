# NFT5 Admin

## Database Setup
```bash
# Generate Prisma client for launchy db:
yarn prisma:generate:launchy
```

```bash
# Generate Prisma client for admin db:
yarn prisma:generate
```

```bash
# Migrate Admin db:
migrate:dev
```

## Project Structure
admin
- features: all of bussiness logic for resources
- resources: all of resource configurations and UI components

## Setup <a id="runtime">runtime</a>:

```bash
asdf install
```

Then verify correct package runtime is used.

eg.

```bash
which node
# ~/.asdf/shims/node
```

```bash
node -v
# v16.13.0
```


## Setup <a id="app">App</a>

#### Copy env variables (get any other required vars from PM)

```bash
cp .env.example .env
```

#### Install project dependencies

```bash
npm install -g yarn
```

```bash
yarn install
```



## <a id="scripts">Scripts</a>:

This project uses [Nest](https://github.com/nestjs/nest).

Read through the following sections if you're not familiar yet:

- [Introduction](https://docs.nestjs.com/#introduction)
- [First steps](https://docs.nestjs.com/first-steps)
- [Fundamentals](https://docs.nestjs.com/fundamentals/custom-providers)
- [CLI/nest-generate](https://docs.nestjs.com/cli/usages#nest-generate)

#### Run dev server

```bash
yarn start:dev
```

#### Production mode

```bash
yarn start:prod
```

#### Run production build

```bash
yarn build
```

#### Running tests

```bash
# unit tests
yarn run test
```

```bash
# e2e tests
yarn run test:e2e
```

```bash
# test coverage
yarn run test:cov
```


## Database <a id="database">management</a>

This project uses [Prisma](https://www.prisma.io/docs/guides). Checkout
[this
link](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate)
on DB migrations/seeding and the differences between environments.

Run

```bash
yarn prisma --help
```

for list of useful commands.


## <a id="linting">Linting</a>

```bash
# Fix issues with eslint
$ yarn lint
```

```bash
# Format code with prettier
$ yarn format
```

