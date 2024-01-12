
# Soccer training

Api with 2 endpoints that allow the storage and consultation of data from a soccer team. 


## Demo and documentation

Click [here](https://soccer-training.onrender.com/api-docs) to view demo


## Installation

1. Install docker

2. Create build docker

```bash
docker build -t [my-name-image] .
```

3. Run image

```bash
docker run --name [name-container] -p 3000:3000 -d [my-name-image]
```

4. Click [here](http://localhost:3000/)


Note: remember to add the environment variables and configure the postgress database appropriately (DDL tables [here](./storage/ddl.sql))

## Running Tests

To run tests, run the following command

```bash
  npm test
```

## Authors

- [@cpatinore](https://github.com/cpatinore)

