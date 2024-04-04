export default function Code(props) {
  return (
    <code className="text-secondary break-words">
      {props.children.props.text}
    </code>
  );
}
