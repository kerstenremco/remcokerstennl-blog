export default function Link(props) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener"
      class="link link-primary"
    >
      {props.children}
    </a>
  );
}
