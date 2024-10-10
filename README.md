# AgendaWeb

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.0.

## Servidor de Desenvolvimento

Execute `ng s` para iniciar o servidor de desenvolvimento. Acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos fonte.

## Desenvolvimento de Componentes

Utilizando Angular, é possível desenvolver componentes que são blocos reutilizáveis e modulares da interface. Para gerar um novo componente, use o comando `ng g c nome-componente`.

## Navegação em Rotas (SPA)

Este projeto utiliza a navegação em rotas para criar uma aplicação de página única (SPA), onde a navegação entre as páginas acontece sem recarregar a página inteira. As rotas podem ser configuradas no arquivo `app.routes.ts`.

## HttpClient e Consumo de APIs

O `HttpClient` é utilizado para consumir APIs RESTful, permitindo realizar requisições HTTP como GET, POST, PUT, DELETE, etc. As APIs usadas no projeto são:

- [AgendaApp](https://github.com/sergio-coti/AgendaApp)
- [UsuariosApp](https://github.com/sergio-coti/UsuariosApp)

Essas APIs permitem a integração com serviços de backend para buscar ou enviar dados.

## Ambientes

O Angular permite configurar diferentes ambientes (como desenvolvimento e produção) através dos arquivos de configuração `environment.ts` e `environment.development.ts`. Cada um desses arquivos pode conter variáveis específicas do ambiente.

## Formulários Reativos

O projeto utiliza formulários reativos (`Reactive Forms`), que fornecem maior controle sobre a validação, manipulação e submissão de dados nos formulários. Eles são construídos no TypeScript, o que permite a criação de formulários dinâmicos e mais robustos.

## Local Storage

Para persistir dados no navegador, é utilizado o `Local Storage`, que permite armazenar informações no lado do cliente e acessá-las posteriormente, mesmo após a recarga da página.

## Guards

Os `Guards` são usados para proteger rotas, permitindo controlar o acesso dos usuários a determinadas partes da aplicação com base em critérios como autenticação ou autorização. Eles são configurados nas rotas e podem impedir o usuário de acessar uma rota não autorizada.

## Build

Execute `ng build` para construir o projeto. Os artefatos de build serão armazenados no diretório `dist/`.

## Ajuda Adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou confira a [Visão Geral do Angular CLI e Referência de Comandos](https://angular.dev/tools/cli).
