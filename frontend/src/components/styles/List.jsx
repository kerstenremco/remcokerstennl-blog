export default function List(props) {
    if(props.type == "ol") return <ol class="list-inside my-4 list-decimal">{props.children}</ol>
    else return <ul class="list-inside my-4 list-image-[url(/emoji/point.png)]">{props.children}</ul>
}