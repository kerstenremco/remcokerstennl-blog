export default function Stepper(props) {
    const headers = props.headers;
    return (
        <ul class="steps xl:steps-vertical w-full xl:sticky xl:top-0 bg-base-100" id="stepper">
            {headers.map((header) => <li class="step">{header}</li>)}
            </ul>
    )
}