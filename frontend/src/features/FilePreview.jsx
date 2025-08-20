export default function FilePreview({ file, onClose }) {
  if (!file) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="card p-4 w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{file.name}</h3>
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4">
          <a className="btn" href={file.url} target="_blank" rel="noreferrer">Open / Download</a>
        </div>
      </div>
    </div>
  );
}
