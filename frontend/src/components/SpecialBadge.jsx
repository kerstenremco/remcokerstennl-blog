export default function SpecialBadge(props) {
  return (
    <span className="w-max bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-r-badge py-2 px-4 xl:absolute xl:top-10 xl:left-0">
      {props.children}
    </span>
  );
}
