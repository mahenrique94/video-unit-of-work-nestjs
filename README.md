# video-unit-of-work-nestjs

## Getting started

1. Install all dependencies

```bash
npm ci
```

2. Spawn local infrastructure

```bash
npm run infra:up
```

3. Prepare local database

```bash
npm run db:setup
```

4. Create a .env file

```bash
npm run env:setup
```

5. Run local server in dev mode

```bash
npm run start:dev
```

## HTTP Requests

Install HTTPie CLI to run all the following requests.

### Create a new order

```bash
http post http://localhost:8080/api/v1/orders userId=USER_ID
```

### Create a new product

```bash
http post http://localhost:8080/api/v1/products name="Macbook M3 Pro" price:=123.45
```


### Create a new user

```bash
http post http://localhost:8080/api/v1/users name="Matheus Castiglioni" email="me@matheuscastiglioni.com.br"
```

### Add a new item to an order

```bash
http post http://localhost:8080/api/v1/orders/ORDER_ID/items productId=PRODUCT_ID quantity:=1
```