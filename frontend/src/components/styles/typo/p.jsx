export default function P(props) {
  const { extraClasses } = props;
  const classes = "mb-3";
  const classNames = extraClasses ? classes + " " + extraClasses : classes;
  return <p className={classNames}>{props.children}</p>;
}
