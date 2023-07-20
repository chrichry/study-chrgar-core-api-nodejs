"use strict";

import { APIGatewayEvent, DynamoDBRecord } from "aws-lambda";

const IS_OFFLINE = process.env.IS_OFFLINE;
import { DynamoDBClient, PutItemCommand, GetItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
let config = {};
if (IS_OFFLINE === "true") {
  config = {
    region: "us-east-1",
    endpoint: "http://127.0.0.1:8000",
  };
} else {
  config = {};
}
const client = new DynamoDBClient(config);
const tableName = process.env.STUDY_TABLE;

module.exports.create = async (event: APIGatewayEvent) => {
  let responseBody = "fonction appelée";
  let statusCode = 0;

  if (!event.body) {
    // handle gracefully when no body provided
    // fixme: use zod/joi to check for all the parameters (in the body)
    return {
      responseBody: "Missing body",
      statusCode: 400,
    };
  }

  const parameters: Record<string, any> = JSON.parse(event.body);
  Object.keys(parameters).map((x) => {
    console.log(x);
  });
  const input: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      pk: { S: parameters?.pk },
      sk: { S: parameters?.sk },
      toto: { S: "La NASA c'est des tocards" },
    },
  };

  const command = new PutItemCommand(input);

  try {
    const responseDynamo = await client.send(command);
    console.log(responseDynamo);

    responseBody = "Item created !!!";
    statusCode = 200;
  } catch (error) {
    console.log(error);
    responseBody = `Unable to create item !!!`;
    statusCode = error.statusCode;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody,
  };

  return response;
};

module.exports.read = async (event: APIGatewayEvent) => {
  let responseBody = "fonction appelée";
  let statusCode = 0;

  if (!event.body) {
    // handle gracefully when no body provided
    // fixme: use zod/joi to check for all the parameters (in the body)
    return {
      responseBody: "Missing body",
      statusCode: 400,
    };
  }

  const parameters = JSON.parse(event.body);

  const input = {
    TableName: tableName,
    Key: {
      pk: { S: parameters?.pk },
      sk: { S: parameters?.sk },
    },
  };

  const command = new GetItemCommand(input);

  try {
    const responseDynamo = await client.send(command);
    console.log(responseDynamo);

    responseBody = "Item retrieved !!! ----> " + JSON.stringify(responseDynamo);
    statusCode = 200;
  } catch (error) {
    console.log(error);
    responseBody = `Unable to retrieve item !!!`;
    statusCode = error.statusCode;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody,
  };

  return response;
};
