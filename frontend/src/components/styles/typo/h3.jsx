export default function Heading3(props) {
    const { extraClasses } = props;
    const classes = "my-3 text-2xl";
    const classNames = extraClasses ? classes + " " + extraClasses : classes;
    return <h3 className={classNames}>{props.children}</h3>;
  }