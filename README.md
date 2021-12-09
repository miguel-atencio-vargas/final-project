# Title

## Description

This RestAPI is building on
[Nest](https://github.com/nestjs/nest) framework of TypeScript. Using Express plattform.

## Authors

- [@atencio947](https://twitter.com/atencio947)
- [@eliseo](https://www.pleasecompletehere)

## Tech Stack

**Platform:** Express v

**Database:**

**Documentation:** Swagger/OpenAPI

**Authentication:**

## Demo

Insert gif or link to demo

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Documentation

[Documentation](https://linktodocumentation/api)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Enable Git hooks

```bash
  npx husky install
```

Start the server

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## License

Copyright © Eliseo, Miguel Atencio Vargas - 2021 all rights reserved.
