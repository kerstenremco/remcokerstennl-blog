export default function Link(props) {
  return (
    <a href={props.url} target="_blank" class="link link-primary">
      {props.children}
    </a>
  );
}
