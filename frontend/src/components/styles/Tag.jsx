export default function Tag({ tag, color, onClick, active }) {
  return (
    <div
      key={tag}
      onClick={onClick}
      className={`badge badge-xl badge-${color} ${active ? "" : "badge-outline"} ${active || !onClick ? "cursor-default" : "cursor-copy"} select-none`}
    >
      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-4 h-4 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      )}
      {tag}
    </div>
  );
}
