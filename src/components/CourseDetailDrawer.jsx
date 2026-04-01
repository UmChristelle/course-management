import { CalendarDays, CircleUserRound, FileText, GraduationCap } from 'lucide-react';
import { formatDate, initialsForCourse } from '../lib/course-helpers';
import StatusPill from './StatusPill';

export default function CourseDetailDrawer({ course, onClose, onEdit }) {
  if (!course) {
    return null;
  }

  return (
    <>
      <button type="button" className="overlay" onClick={onClose} aria-label="Close details" />
      <aside className="drawer" aria-label="Course details">
        <div className="drawer__header">
          <div className="drawer__identity">
            <span className="course-identity__badge course-identity__badge--large">
              {initialsForCourse(course.courseName)}
            </span>
            <div>
              <p className="section-heading__eyebrow">Course spotlight</p>
              <h2>{course.courseName}</h2>
            </div>
          </div>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="drawer__stack">
          <div className="detail-card">
            <div className="detail-card__row">
              <StatusPill tone="success">Published</StatusPill>
              <button type="button" className="primary-button" onClick={() => onEdit(course)}>
                Edit course
              </button>
            </div>
            <p className="detail-card__description">{course.description}</p>
          </div>

          <div className="detail-card">
            <h3>Metadata</h3>
            <ul className="detail-list">
              <li>
                <GraduationCap size={16} />
                <span>Course ID</span>
                <strong>{course.id}</strong>
              </li>
              <li>
                <CircleUserRound size={16} />
                <span>Supervisor ID</span>
                <strong>{course.supervisorId ?? 'Not linked yet'}</strong>
              </li>
              <li>
                <CalendarDays size={16} />
                <span>Created</span>
                <strong>{formatDate(course.createdAt)}</strong>
              </li>
              <li>
                <FileText size={16} />
                <span>Last updated</span>
                <strong>{formatDate(course.updatedAt ?? course.createdAt)}</strong>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
