const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

module.exports.handler = async (event) => {
  let responseBody = "fonction appelée";
  let statusCode = 0;

  const input = {
    TableName: tableName,
    Item: {
      pk: { S: "Hello" },
      sk: { S: "world" },
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
