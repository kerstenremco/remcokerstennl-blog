import React, { useEffect, useState } from "react";
export default function Like({ slug }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(undefined);
  const [likesInLocalStorage, setLikesInLocalStorage] = useState(undefined);

  useEffect(() => {
    setLikesInLocalStorage(localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : []);
  }, []);

  useEffect(() => {
    if (likesInLocalStorage) setLiked(likesInLocalStorage.includes(slug));
  }, [likesInLocalStorage]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likesInLocalStorage));
  }, [likesInLocalStorage]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND}/likes/${encodeURIComponent(slug)}`.toLocaleLowerCase(),
      );
      const likes = (await response.json()).likes;
      setLikes(likes);
    })();
  }, []);

  const handleClick = async () => {
    if (liked) return;
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND}/likes/${encodeURIComponent(slug)}`.toLowerCase(), {
      method: "PATCH",
    });
    const likes = (await res.json()).likes;
    if (!likes) return;
    setLikes(likes);
    setLiked(true);
    // Push current post ID in local storage
    setLikesInLocalStorage((prev) => [...prev, slug]);
  };
  return (
    <button class="btn" onClick={() => handleClick()}>
      {likes === undefined && <span class="loading loading-spinner"></span>}
      {likes !== undefined && (
        <>
          <box-icon name="heart" class="fill-red-500" type={liked ? "solid" : ""}></box-icon>
          {likes} likes
        </>
      )}
    </button>
  );
}
