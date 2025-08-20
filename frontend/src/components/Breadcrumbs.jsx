export default function Breadcrumbs({ items, onNavigate }) {
  return (
    <div className="text-sm text-gray-600">
      {items.map((b, idx) => (
        <span key={b.id || idx} className="cursor-pointer hover:underline"
          onClick={() => onNavigate(b.id || null)}>
          {b.name}{idx < items.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
}
