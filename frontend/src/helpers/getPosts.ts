import { client } from "../../tina/__generated__/client";
export default async function getPosts() {
  const postsQueryResponse = await client.queries.postConnection();
  const posts = postsQueryResponse.data.postConnection.edges?.map((post) => {
    return {
      title: post?.node?.title,
      subtitle: post?.node?.subtitle,
      slug: post?.node?.customslug,
      snippet: post?.node?.snippet,
      image: post?.node?.image,
      special: post?.node?.special,
      written: post?.node?.written,
      lastModified: post?.node?.modified,
      seoKeyWords: post?.node?.seo_keywords,
      tags: post?.node?.tags?.map((t) => ({ title: t?.tag?.title, color: t?.tag?.color })),
      body: post?.node?.body,
    };
  });
  return posts;
}
