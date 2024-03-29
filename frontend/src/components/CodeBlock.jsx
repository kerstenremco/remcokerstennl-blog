export default function CodeBlock(props) {
    const lines = props.value.split("\n");
    
    return (

        <div className="mockup-code mt-3 mb-5 static">
            {lines.map((line, index) => {
                const prefix = props.lang == "shell" ? index == 0 ? "$" : "" : undefined;
                return (
                    <pre key={index} data-prefix={prefix}><code className={`language-${props.lang}`}>{line}</code></pre>
                )
            })}
        </div>
    )
}