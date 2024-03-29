import { client } from "../../tina/__generated__/client";
export default async function getTags() {
  const tagsQueryResponse = await client.queries.tagsConnection();
  const tags = tagsQueryResponse.data.tagsConnection.edges?.map((tag) => ({
    title: tag?.node?.title,
    color: tag?.node?.color,
  }));
  return tags;
}
