import { Eye, PencilLine, Trash2 } from 'lucide-react';
import { formatDate, initialsForCourse } from '../lib/course-helpers';

export default function CourseTable({
  courses,
  activeCourseId,
  onView,
  onEdit,
  onDelete,
}) {
  if (!courses.length) {
    return (
      <section className="empty-panel">
        <h3>No courses match this search</h3>
        <p>Try another search term or add a new course from the dashboard.</p>
      </section>
    );
  }

  return (
    <div className="table-shell">
      <table className="course-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Summary</th>
            <th>Updated</th>
            <th aria-label="Course actions" />
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              className={course.id === activeCourseId ? 'is-active' : undefined}
            >
              <td data-label="Course">
                <div className="course-identity">
                  <span className="course-identity__badge">
                    {initialsForCourse(course.courseName)}
                  </span>
                  <div>
                    <strong>{course.courseName}</strong>
                    <p>{course.id}</p>
                  </div>
                </div>
              </td>
              <td data-label="Summary">
                <p className="course-table__description">{course.description}</p>
              </td>
              <td data-label="Updated">{formatDate(course.updatedAt ?? course.createdAt)}</td>
              <td data-label="Actions">
                <div className="table-actions">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onView(course)}
                    aria-label={`View ${course.courseName}`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onEdit(course)}
                    aria-label={`Edit ${course.courseName}`}
                  >
                    <PencilLine size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-button icon-button--danger"
                    onClick={() => onDelete(course)}
                    aria-label={`Delete ${course.courseName}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
