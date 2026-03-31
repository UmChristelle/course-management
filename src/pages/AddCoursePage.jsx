import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import CourseForm from '../components/CourseForm';
import { ArrowLeft } from 'lucide-react';

export default function AddCoursePage() {
  const { addCourse } = useCourses();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    await addCourse(data);
    setLoading(false);
    navigate('/courses');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <Link to="/courses" className="back-link"><ArrowLeft size={16}/> Back to Courses</Link>
          <h1 className="page-title">Create New Course</h1>
        </div>
      </div>
      <div className="form-card">
        <CourseForm loading={loading} onSubmit={handleSubmit} onCancel={() => navigate('/courses')}/>
      </div>
    </div>
  );
}