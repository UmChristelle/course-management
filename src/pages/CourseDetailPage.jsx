import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import CourseForm from '../components/CourseForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { ArrowLeft, Pencil, Trash2, BookOpen, User, Hash, Clock, Tag, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editCourse, removeCourse, getCourse } = useCourses();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getCourse(id);
        setCourse(data);
      } catch {
        toast.error('Course not found.');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, getCourse]);

  const handleEdit = async (data) => {
    setEditLoading(true);
    await editCourse(id, data);
    setCourse(prev => ({...prev, ...data}));
    setEditOpen(false);
    setEditLoading(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    await removeCourse(id);
    navigate('/courses');
  };

  if (loading) return <Spinner center size="lg"/>;
  if (!course) return null;

  const details = [
    { icon: User, label: 'Instructor', value: course.instructor },
    { icon: Clock, label: 'Credits', value: course.credits },
    { icon: Clock, label: 'Schedule', value: course.schedule },
  ].filter(d => d.value);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left">
          <Link to="/courses" className="back-link"><ArrowLeft size={16}/> Back to Courses</Link>
          <h1 className="page-title">{course.title}</h1>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={() => setEditOpen(true)}><Pencil size={15}/> Edit</button>
          <button className="btn btn-danger" onClick={() => setDeleteOpen(true)}><Trash2 size={15}/> Delete</button>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <div className="card">
            <div className="card-header"><BookOpen size={18}/> Course Overview</div>
            <div className="card-body">
              {course.description
                ? <p className="course-description">{course.description}</p>
                : <p className="muted">No description provided.</p>}
            </div>
          </div>
        </div>
        <div className="detail-side">
          <div className="card">
            <div className="card-header"><FileText size={18}/> Course Details</div>
            <div className="card-body">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="detail-row">
                  <span className="detail-label"><Icon size={14}/> {label}</span>
                  <span className={`detail-value ${label === 'Status' ? `status-badge status-${value}` : ''}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Course" size="lg">
        <CourseForm initial={course} loading={editLoading} onSubmit={handleEdit} onCancel={() => setEditOpen(false)}/>
      </Modal>
      <ConfirmDialog
        open={deleteOpen} onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete} loading={deleteLoading}
        title={`Delete "${course.name}"?`}
        message="This action cannot be undone."
      />
    </div>
  );
}