# Template -> Serverless Offline AWS NodeJS API CRUD + DynamoDB local + DynamoDB Admin
Note importante: Le seul plugin encore supporté pour dynamoDB local se trouve [ici](https://www.npmjs.com/package/serverless-dynamodb)
## Requirements

[AWS CLI](https://aws.amazon.com/fr/cli/),
[NodeJS](https://nodejs.org/en)

```bash
npm i -g serverless
npm i
#serverless plugin install -n serverless-dynamodb-local
serverless dynamodb install
npm install -g dynamodb-admin
serverless plugin install -n serverless-plugin-typescript
```

```bash
#Terminal n°1
serverless offline start --stage local-dev
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
