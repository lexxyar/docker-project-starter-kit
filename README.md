# Starter kit with laravel 12 and docker

![Project](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Fshield.json)
![Laravel](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Flaravel%2Fcomposer.json&query=%24.require.laravel%2Fframework&label=Laravel&color=%23ef3b2d)
![Tailwind CSS](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Ffrontend%2Fpackage.json&query=%24.dependencies.tailwindcss&label=Tailwind%20CSS&color=%2300BCFF)
![VueJS](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Ffrontend%2Fpackage.json&query=%24.dependencies.vue&label=VueJS&color=%2342D392)
![MySQL](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yaml&query=%24.services.db.image&label=Databse&color=%237BB8C5)
![NGINX](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Flexxyar%2Fdocker-project-starter-kit%2Frefs%2Fheads%2Fmain%2Fdocker-compose.yaml&query=%24.services.nginx.image&label=Web%20Server&color=%232CA460)


## Services

Starter kit include services

* `NGINX`: web server
* `Laravel` project: API for backend.
* `VueJS` project: frontent application
* `Mailpit`: local mail trap (mail server)
* `MySQL`: database for backend
* `Supervisor`: service for laravel queue worker
* `s3`: local MinIO S3 server

## Features

| Feature                            | Description                                                                                                                                                                                                                                                                                            |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authorizing via socials            | Laravel use Socialite package (*package*: `laravel/socialite`) for authorizing via *Google*. Socialite extends with *Yandex* social provider (*package*: `socialiteproviders/yandex`) for authorizing via *Yandex*                                                                                     |
| API routes                         | Sanctum (*package*: `laravel/sanctum`) provide `api` routes and protection for Laravel                                                                                                                                                                                                                 |
| Log viewer                         | Laravel include log viewer (*package*: `opcodesio/log-viewer`) for comfortable debugging                                                                                                                                                                                                               |
| Authorizing                        | Frontend and backend has Login and register forms out of the box. *Login* and *Register* forms are identical. It makes registration process shorter for user and require only `email` and `password`. *Name* field will be taken from email address.<br />*__Registration via socials is exception!__* |
| Profile and security               | Starter kit has `profile page`, where user can change *name* and *email* or delete account. `Security page` allow user to change *password*                                                                                                                                                            |
| UUID                               | By default all starter kit tables has `UUID` field instead of defaulted numeric `id` with autoincrement.                                                                                                                                                                                               |
| created_by, updated_by, deleted_by | Laravel include traits with `created_by`, `updated_by` and `deleted_by` fields to save user id, who change record. <br />**IMPORTANT!** `deleted_by` works only if `SoftDeletes` trait is used                                                                                                         |
| UI included                        | Frontend project include `tailwindcss`, `vee-validate`, `lucide-vue-next` and `shadcn-vue` libraries for beautyfull UI                                                                                                                                                                                 |
| HTTP requests                      | Starter kin not using `cookies` to secure requests. Instead of authorized users use `Bearer access token` in HTTP request header (*Authorization: Bearer_long_token_string*)                                                                                                                           |

# Docker commands

Start docker containers

```shell
docker-compose up -d
# or with build
docker-compose up -d --build
```

Stop docler conatiners

```shell
docker-compose down
```

# Useful links

> [http://localhost/](http://localhost/) - Laravel API

> [http://localhost:9001/](http://localhost:9001/login) - S3 administrate

> [http://localhost:8025/](http://localhost:8025/) - Mailpit inbox

> [http://localhost:5173/](http://localhost:5173/) - Frontend application