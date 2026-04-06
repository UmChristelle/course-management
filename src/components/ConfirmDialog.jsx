export default function ConfirmDialog({
  course,
  busy,
  onCancel,
  onConfirm,
}) {
  if (!course) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="overlay overlay--dark"
        onClick={onCancel}
        aria-label="Close delete confirmation"
      />
      <section className="confirm-dialog" aria-label="Delete course confirmation">
        <p className="section-heading__eyebrow">Delete course</p>
        <h2>Delete {course.courseName}?</h2>
        <p>
          This will remove the course from the catalog. Please confirm before continuing.
        </p>
        <div className="modal__actions">
          <button type="button" className="ghost-button" onClick={onCancel}>
            Keep course
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onConfirm(course)}
            disabled={busy}
          >
            {busy ? 'Deleting...' : 'Delete course'}
          </button>
        </div>
      </section>
    </>
  );
}
