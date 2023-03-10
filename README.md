![workflow](https://github.com/NikosPanourakis/nestjs-warehouse-boilerplate/actions/workflows/main.yml/badge.svg)

My Warehouse

## Description
My-Warehouse is a boilerplate project using nestjs and postgress with the Domain Driven Design(DDD) pattern being applied.
This project includes example e2e test implementation testing the Product and Category endpoints.

### Entity Diagram

![alt text](https://github.com/NikosPanourakis/nestjs-warehouse-boilerplate/blob/main/img/entity-diagram.png?raw=true)

A category can have many sub-categories specified by the parent_id which is the parent category in this case.

### Project architecture

As an example the following diagram shows the transformation stages which the product passes through. With this method the Product is being encapsulated depending on the layer.
![alt text](https://github.com/NikosPanourakis/nestjs-warehouse-boilerplate/blob/main/img/ddd.png?raw=true)

## API Documentaion
### Fetching a product
`GET /product/:id`
### Response
```
{
    "productId": "pid",
    "productName": "test product",
    "categoryId": "c1"
}
```
Returns 404 when no product is found.

### Creating a product
`POST /product`

    // payload
    {
        "productId": "pid",
        "productName": "test product",
        "categoryId": "c1"
    }
Returns 400 when validation fails or product already exists.
Returns 201 and created product.

### Deleting a product
`DELETE /product/:id`

### Response
Returns 200 on success.
Returns 404 when no product is found.

-> Check the swagger documentation url for more info
```localhost:3000/api``` 

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# spinup the docker container 
$ docker-compose up 
```

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```

## Licence

[MIT License](https://github.com/NikosPanourakis/nestjs-warehouse-boilerplate/main/licence.md).
