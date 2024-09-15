export default function Stepper(props) {
  const headers = props.headers;
  return (
    <div className="hidden xl:block sticky top-0">
      <ul class="steps steps-vertical w-full bg-base-100" id="stepper">
        {headers.map((header) => (
          <li class="step alingleft">{header}</li>
        ))}
      </ul>
    </div>
  );
}
