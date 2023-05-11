<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker compose up -d
```

5. Reconstruir BD con Seed

Hacer petición **GET** a

> http://localhost:3000/api/v2/seed

la petición puede llevar los siguientes parametros

```javascript
{
  "amount": number, //La cantidad de registros que se quieren obtener de la consulta
  "clear": boolean, //Limpiar la BD de datos y/o insertar los nuevos registros
  "drop":boolean //Limpia completamente la BD pero no inserta
}
```

ejemplo:

> http://localhost:3000/api/v2/seed?clear=true&amount=300

sus valores por defecto:

```javascript
{
  "amount": 20,
  "clear": false,
  "drop":false
}
```
