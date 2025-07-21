import { client } from "../../tina/__generated__/client";
export default async function getBadges() {
  const response = await client.queries.badgesConnection();
  if (!response.data.badgesConnection.edges) {
    return [];
  }

  const badges = response.data.badgesConnection.edges.map((badge) => {
    if (!badge || !badge.node) return;
    return {
      title: badge.node.title,
      image: badge.node.image,
      link: badge.node.link,
      index: badge.node.index,
    };
  });

  badges.sort((a, b) => {
    if (a == undefined || b === undefined) return 0;
    return a.index - b.index;
  });

  return badges;
}
