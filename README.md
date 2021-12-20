# Recruit Management API 💻

This API provides an usefull management system for a recruitment process. You will be able to create companies, users, hiring stages and notify potential candidates of their current status.

## Authors

- Miguel Atencio: [@atencio947](https://gitlab.com/atencio947)
- Eliseo Hernandez [@ernesto1991diaz](https://gitlab.com/ernesto1991diaz/)

## Description

## Recruit Management has been created with the following resources:

- NodeJs powered with the NestJs Framework 🦁
- MongoDB as database provider 🌱
- Docker to build and deploy the API 🐳
- Heroku as deployment solution enviroment ♓️
- Google auth for registration 🔐

## Installation

To install this project run

```bash
  npm install
```

## Building and Running the App

To build this project with a development enviroments run:

```bash
  npm run dev:build
```

To run this project with a development enviroments run:

```bash
  npm run dev:up
```

## Documentation 📙

[Documentation](https://glacial-coast-05912.herokuapp.com/api/)

## App running on Heroku 🔥

[Recruit Management](https://glacial-coast-05912.herokuapp.com/api/)

## Running Tests ✍️

To run tests, run the following command

```bash
  npm run test
```

## API Reference

#### Google Authentication

```http
  GET https://glacial-coast-05912.herokuapp.com/api/google
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `api_key` | `string` | Redirecton to google auth |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT`

`APP_DOMAIN`

`ENVIRONMENT`

`MONGO_URI`

`JWT_SECRET`

`JWT_EXPIRES`

`GOOGLE_CLIENT_ID`

`GOOGLE_SECRET`

`MAIL_HOST`

`MAIL_PASSWORD`

`MAIL_FROM`

## License

Copyright © Eliseo Hernandez , Miguel Atencio Vargas - 2021 all rights reserved.
