export default function DeleteConfirmModal({ open, onClose, onConfirm, label="Are you sure?" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
      <div className="card p-4 w-full max-w-sm">
        <h3 className="text-base font-semibold">{label}</h3>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
