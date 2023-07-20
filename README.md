# Template -> Serverless Offline AWS NodeJS API CRUD + DynamoDB local + DynamoDB Admin

Note importante: Le seul plugin encore supporté pour dynamoDB local se trouve [ici](https://www.npmjs.com/package/serverless-dynamodb)

## Requirements

[AWS CLI](https://aws.amazon.com/fr/cli/),
[NodeJS](https://nodejs.org/en),
[Docker](https://docs.docker.com/engine/install/)

```bash
npm i -g serverless
npm install -g dynamodb-admin
```

## Installation

```bash
npm i
serverless dynamodb install
```

```bash
#Terminal n°1
serverless offline start --stage local
#Pour la vagrant box:
serverless offline start --host 0.0.0.0 --stage local
```

```bash
#Terminal n°2
# For Windows:
set DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin

# For Mac/Linux:
DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin
```

Dashboard de DynamoDB Admin -> [http://127.0.0.1:8001/](http://127.0.0.1:8001/)

## Troubleshooting

Parfois serverless ne détecte pas les plugins lors d'un premier démarrage.
Si certains services ne démarrent pas utiliser la commande suivante.

```bash
serverless plugin install -n <nom-du-plugin>
```

Liste des plugins:

> _serverless-prune-versions_ </br> _serverless-plugin-typescript_ </br> _serverless-dynamodb_ </br> _serverless-offline_ </br> _serverless-dynamodb-local_
