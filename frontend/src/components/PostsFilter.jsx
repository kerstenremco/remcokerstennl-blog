import CardExtended from "./CardExtended";
import { useEffect, useState } from "react";
import { Tag } from "./styles/";
export default function PostsFilter({ tags, posts }) {
  const [filter, setFilter] = useState([]);
  const [visablePosts, setVisablePosts] = useState(posts);
  useEffect(() => {
    if (filter.length === 0) setVisablePosts(posts);
    else setVisablePosts(posts.filter((post) => post.tags.some((tag) => filter.includes(tag.title))));
  }, [filter]);
  const handleFilter = (tag) => {
    const filterIsActive = filter.includes(tag);
    if (filterIsActive) setFilter((old) => [...old].filter((t) => t !== tag));
    else setFilter((old) => [...old, tag]);
  };
  return (
    <>
      <div className="flex gap-2 ">
        {tags.map((tag) => (
          <Tag
            tag={tag.title}
            color={tag.color}
            active={filter.includes(tag.title)}
            onClick={() => handleFilter(tag.title)}
          />
        ))}
      </div>
      {visablePosts.map((post) => (
        <CardExtended {...post} />
      ))}
    </>
  );
}
