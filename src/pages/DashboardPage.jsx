import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { BookOpen, TrendingUp, Users, Clock, PlusCircle, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { courses, loading, fetchCourses } = useCourses();

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const active = courses.filter(c => c.status === 'active').length;
  const draft  = courses.filter(c => c.status === 'draft').length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user?.name || user?.email?.split('@')[0] || 'Supervisor'}</p>
        </div>
        <Link to="/courses/new" className="btn btn-primary">
          <PlusCircle size={16}/> New Course
        </Link>
      </div>

      {loading ? <Spinner center size="lg"/> : (
        <>
          <div className="stats-grid">
            {[
              { icon: BookOpen, label: 'Total Courses', value: courses.length, color: 'blue' },
              { icon: TrendingUp, label: 'Active Courses', value: active, color: 'green' },
              { icon: Clock, label: 'Draft Courses', value: draft, color: 'amber' },
              { icon: Users, label: 'Instructors', value: [...new Set(courses.map(c => c.instructor).filter(Boolean))].length, color: 'purple' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className={`stat-card stat-${color}`}>
                <div className="stat-icon"><Icon size={22}/></div>
                <div className="stat-info">
                  <p className="stat-value">{value}</p>
                  <p className="stat-label">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Courses</h2>
              <Link to="/courses" className="view-all-link">View all <ArrowRight size={14}/></Link>
            </div>
            {courses.length === 0 ? (
              <div className="empty-state">
                <BookOpen size={40}/>
                <p>No courses yet. <Link to="/courses/new">Create your first course →</Link></p>
              </div>
            ) : (
              <div className="course-grid">
                {courses.slice(0, 6).map(course => (
                  <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                    <div className="course-card-accent"/>
                    <div className="course-card-body">
                      <span className={`status-badge status-${course.status || 'active'}`}>
                        {course.status || 'active'}
                      </span>
                      <h3>{course.name}</h3>
                      <p className="course-code">{course.code}</p>
                      {course.instructor && <p className="course-meta">👤 {course.instructor}</p>}
                      {course.credits && <p className="course-meta">🎓 {course.credits} credits</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}