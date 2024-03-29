import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ses = new SESClient({ region: "eu-central-1" });
const ssm = new SSMClient({ region: "eu-central-1" });

export const index = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const name = body.name;
    const email = body.email;
    const message = body.message;
    const toMailQuery = await ssm.send(
      new GetParameterCommand({ Name: "/remcokerstennl/tomail" })
    );
    const toMail = toMailQuery.Parameter["Value"];
    const fromMailQuery = await ssm.send(
      new GetParameterCommand({ Name: "/remcokerstennl/frommail" })
    );
    const fromMail = fromMailQuery.Parameter["Value"];
    if (!name || !email || !message) throw new Error("");
    await ses.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [toMail],
        },
        ReplyToAddresses: [email],
        Message: {
          Body: {
            Text: { Data: message },
          },

          Subject: { Data: `Nieuw bericht van ${name} via remcokersten.nl` },
        },
        Source: fromMail,
      })
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "X-Forwarded-For, Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    };
  } catch (err) {
    console.log("Error", err);
    return { statusCode: 500 };
  }
};

// getById({ pathParameters: { slug: "3" } });
