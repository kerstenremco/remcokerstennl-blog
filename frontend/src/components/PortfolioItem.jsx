import { Header3 } from "./styles/typo";
import { Tag } from "./styles/";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function PortfolioExtended({
  title,
  image,
  tags,
  github,
  demo,
  body,
}) {
  console.log(body);
  return (
    <div className="card md:card-side bg-base-100 shadow-xl relative ">
      <figure className="md:w-1/4 max-md:max-h-52 flex-none">
        <div className="flex items-center">
          <img src={image} />
        </div>
      </figure>
      <div className="card-body">
        <Header3 extraClasses="card-title">{title}</Header3>
        <TinaMarkdown content={body} components={{}} />
        {github && (
          <div className="flex items-center gap-2">
            <box-icon
              name="github"
              type="logo"
              class="fill-base-content"
            ></box-icon>
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}
        {demo && (
          <div className="flex items-center gap-2">
            <box-icon
              name="link"
              type="regular"
              class="fill-base-content"
            ></box-icon>
            <a href={demo} target="_blank" rel="noopener noreferrer">
              Live Demo: {demo.replace("https://", "")}
            </a>
          </div>
        )}
        <div className="mt-3 flex gap-2">
          {tags.map((tag) => (
            <Tag tag={tag.title} color={tag.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
