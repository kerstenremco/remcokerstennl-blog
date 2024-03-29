import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.databaseName;
export const index = async (event) => {
  if (event.httpMethod == "GET") {
    const response = {
      statusCode: 200,

      body: { likes: 0 },
    };
    const id = `likes-${event.pathParameters.slug}`;
    const params = {
      TableName: tableName,
      Key: { id: id },
    };

    try {
      const data = await ddbDocClient.send(new GetCommand(params));
      response.body.likes = data.Item?.likes || 0;
    } catch (err) {
      console.log("Error", err);
      response.body.likes = 0;
    }

    const r = {
      statusCode: response.statusCode,
      headers: {
        "Access-Control-Allow-Headers": "X-Forwarded-For, Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(response.body),
    };
    // console.log(r);
    return r;
  } else if (event.httpMethod == "PATCH") {
    const response = { statusCode: 200, body: { likes: 0 } };
    const id = `likes-${event.pathParameters.slug}`;
    const params = {
      TableName: tableName,
      Key: { id: id },
      ExpressionAttributeValues: { ":inc": 1 },
      UpdateExpression: "ADD likes :inc",
      ReturnValues: "ALL_NEW",
    };

    try {
      const result = await ddbDocClient.send(new UpdateCommand(params));
      response.body.likes = result.Attributes.likes;
    } catch (err) {
      console.log("Error", err);
      response.body.likes = 0;
    }

    const r = {
      statusCode: response.statusCode,
      headers: {
        "Access-Control-Allow-Headers": "X-Forwarded-For, Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH",
      },
      body: JSON.stringify(response.body),
    };
    // console.log(r);
    return r;
  }
};

// getById({ pathParameters: { slug: "3" } });
