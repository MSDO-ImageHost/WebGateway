# Gateway
![Build Docker images](https://github.com/MSDO-ImageHost/WebGateway/workflows/Build%20Docker%20images/badge.svg) ![Publish Docker images](https://github.com/MSDO-ImageHost/WebGateway/workflows/Publish%20Docker%20images/badge.svg)


Necessary .env for running Express server (./package.json)

`GATEWAY_QUEUE="gateway-queue"`

`AMQP_URI="amqp://guest:guest@localhost:5672"`

Necessary .env for the docker compose setup
```
RABBIT_USER=guest
RABBIT_PASS=guest
MYSQ_PASSWORD=mysecretpassword
```