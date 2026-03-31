import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import Spinner from '../components/Spinner';
import ConfirmDialog from '../components/ConfirmDialog';
import Modal from '../components/Modal';
import CourseForm from '../components/CourseForm';
import { PlusCircle, Search, Eye, Pencil, Trash2, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const { courses, loading, fetchCourses, deleteCourse, updateCourse } = useCourses();
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const filtered = courses.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.code || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.instructor || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    setDeleteLoading(true);
    await deleteCourse(deleteTarget.id);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const handleEdit = async (data) => {
    setEditLoading(true);
    await updateCourse(editTarget.id, data);
    setEditLoading(false);
    setEditTarget(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Courses</h1>
          <p className="page-subtitle">{courses.length} course{courses.length !== 1 ? 's' : ''} in the catalog</p>
        </div>
        <Link to="/courses/new" className="btn btn-primary">
          <PlusCircle size={16}/> Add Course
        </Link>
      </div>

      <div className="search-bar">
        <Search size={17} className="search-icon"/>
        <input
          className="search-input"
          placeholder="Search by name, code, or instructor…"
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? <Spinner center size="lg"/> : filtered.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48}/>
          <p>{search ? 'No courses match your search.' : 'No courses yet.'}</p>
          {!search && <Link to="/courses/new" className="btn btn-primary">Add First Course</Link>}
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => (
                <tr key={course.id}>
                  <td>
                    <div className="table-course-name">{course.name}</div>
                    {course.category && <div className="table-course-meta">{course.category}</div>}
                  </td>
                  <td><span className="code-tag">{course.code}</span></td>
                  <td>{course.instructor || '—'}</td>
                  <td>{course.credits || '—'}</td>
                  <td><span className={`status-badge status-${course.status || 'active'}`}>{course.status || 'active'}</span></td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/courses/${course.id}`} className="icon-btn" title="View"><Eye size={15}/></Link>
                      <button className="icon-btn icon-btn-edit" title="Edit" onClick={() => setEditTarget(course)}><Pencil size={15}/></button>
                      <button className="icon-btn icon-btn-delete" title="Delete" onClick={() => setDeleteTarget(course)}><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This will permanently remove the course from the catalog. This action cannot be undone."
      />

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Course" size="lg">
        {editTarget && (
          <CourseForm
            initial={editTarget}
            loading={editLoading}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
          />
        )}
      </Modal>
    </div>
  );
}