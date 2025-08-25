import { client } from "../../tina/__generated__/client";
export default async function getPortfolio() {
  const portfolioQueryResponse =
    await client.queries.portfolioitemsConnection();
  const items = portfolioQueryResponse.data.portfolioitemsConnection.edges?.map(
    (item) => {
      return {
        title: item?.node?.title,
        image: item?.node?.image,
        tags: item?.node?.tags?.map((t) => ({
          title: t?.tag?.title,
          color: t?.tag?.color,
        })),
        github: item?.node?.github,
        demo: item?.node?.demo,
        body: item?.node?.body,
        order: item?.node?.order,
      };
    }
  );
  items?.sort((a, b) => (new Date(b.order!) > new Date(a.order!) ? 1 : -1));
  return items;
}
