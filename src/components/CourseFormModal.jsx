import { useState } from 'react';
const emptyValues = { courseName: '', description: '' };

export default function CourseFormModal({
  open,
  mode,
  initialValues,
  saving,
  onClose,
  onSubmit,
}) {
  const [values, setValues] = useState(() =>
    initialValues
      ? {
          courseName: initialValues.courseName ?? '',
          description: initialValues.description ?? '',
        }
      : emptyValues,
  );

  if (!open) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <>
      <button type="button" className="overlay" onClick={onClose} aria-label="Close form" />
      <section className="modal" aria-label={mode === 'create' ? 'Create course' : 'Edit course'}>
        <div className="section-heading">
          <div>
            <p className="section-heading__eyebrow">
              {mode === 'create' ? 'New record' : 'Update record'}
            </p>
            <h2>{mode === 'create' ? 'Create a course' : 'Edit course'}</h2>
          </div>
        </div>

        <form className="course-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Course name</span>
            <input
              type="text"
              name="courseName"
              value={values.courseName}
              onChange={handleChange}
              placeholder="Advanced Database Systems"
              required
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              name="description"
              rows="6"
              value={values.description}
              onChange={handleChange}
              placeholder="Write a professional summary of what this course covers."
              required
            />
          </label>

          <div className="modal__actions">
            <button type="button" className="ghost-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving
                ? 'Saving...'
                : mode === 'create'
                  ? 'Create course'
                  : 'Save changes'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
