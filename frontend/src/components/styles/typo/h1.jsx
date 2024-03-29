export default function Heading1(props) {
    const { extraClasses } = props;
    const classes = "my-7 text-4xl break-words";
    const classNames = extraClasses ? classes + " " + extraClasses : classes;
    return <h1 className={classNames}>{props.children}</h1>;
  }