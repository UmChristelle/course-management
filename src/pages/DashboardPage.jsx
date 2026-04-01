import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, LogOut, Plus, RefreshCcw, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import CourseDetailDrawer from '../components/CourseDetailDrawer';
import CourseFormModal from '../components/CourseFormModal';
import CourseInsights from '../components/CourseInsights';
import CourseTable from '../components/CourseTable';
import LoadingScreen from '../components/LoadingScreen';
import MetricCard from '../components/MetricCard';
import StatusPill from '../components/StatusPill';
import { useAuth } from '../hooks/useAuth';
import {
  createCourse,
  deleteCourse,
  fetchCourseById,
  fetchCourses,
  updateCourse,
} from '../lib/api';
import { buildCoursePayload, summarizeCourses } from '../lib/course-helpers';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editingCourse, setEditingCourse] = useState(null);
  const [coursePendingDelete, setCoursePendingDelete] = useState(null);

  async function loadCourses() {
    setLoading(true);

    try {
      const nextCourses = await fetchCourses();
      setCourses(nextCourses);

      setActiveCourse((current) => {
        if (!current) {
          return nextCourses[0] ?? null;
        }

        return nextCourses.find((course) => course.id === current.id) ?? nextCourses[0] ?? null;
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    if (!query) {
      return courses;
    }

    return courses.filter((course) =>
      [course.courseName, course.description, course.id]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [courses, deferredSearch]);

  const summary = useMemo(() => summarizeCourses(courses), [courses]);

  function openCreateModal() {
    setFormMode('create');
    setEditingCourse(null);
    setIsFormOpen(true);
  }

  function openEditModal(course) {
    setFormMode('edit');
    setEditingCourse(course);
    setIsFormOpen(true);
  }

  async function handleView(course) {
    try {
      const detailedCourse = await fetchCourseById(course.id);
      setActiveCourse(detailedCourse);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSubmit(values) {
    setSaving(true);

    try {
      const payload = buildCoursePayload(values);

      if (formMode === 'create') {
        const created = await createCourse(payload);
        setCourses((current) => [created, ...current]);
        setActiveCourse(created);
        toast.success('Course created successfully.');
      } else if (editingCourse) {
        const updated = await updateCourse(editingCourse.id, payload);
        setCourses((current) =>
          current.map((course) => (course.id === editingCourse.id ? updated : course)),
        );
        setActiveCourse(updated);
        toast.success('Course updated successfully.');
      }

      setIsFormOpen(false);
      setEditingCourse(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete(course) {
    setDeleting(true);

    try {
      await deleteCourse(course.id);
      const nextCourses = courses.filter((item) => item.id !== course.id);
      setCourses(nextCourses);
      setActiveCourse((current) => {
        if (!current || current.id !== course.id) {
          return current;
        }

        return nextCourses[0] ?? null;
      });
      setCoursePendingDelete(null);
      toast.success('Course deleted successfully.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  }

  function handleSearchChange(event) {
    const value = event.target.value;
    startTransition(() => setSearch(value));
  }

  function handleLogout() {
    signOut();
    navigate('/login', { replace: true });
  }

  if (loading) {
    return <LoadingScreen label="Preparing the university course workspace..." />;
  }

  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand-mark">
          <span>UC</span>
          <div>
            <strong>University Catalog</strong>
            <p>Supervisor console</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button type="button" className="sidebar-link sidebar-link--active">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
        </nav>

        <div className="sidebar-profile">
          <p>Signed in as</p>
          <strong>{session?.email}</strong>
          <StatusPill tone="info">{session?.role ?? 'SUPERVISOR'}</StatusPill>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="hero-panel">
          <div>
            <p className="section-heading__eyebrow">Course management interface</p>
            <h1>Supervisor dashboard</h1>
            <p className="hero-panel__copy">
              Review the live course catalog, inspect details, and maintain high-quality
              curriculum records from one focused workspace.
            </p>
          </div>

          <div className="hero-panel__actions">
            <button type="button" className="ghost-button" onClick={loadCourses}>
              <RefreshCcw size={16} />
              Refresh data
            </button>
            <button
              type="button"
              className="danger-button danger-button--soft"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <section className="metrics-grid">
          <MetricCard
            eyebrow="Catalog size"
            value={summary.total}
            description="Total courses currently visible from the backend service."
          />
          <MetricCard
            eyebrow="Recent activity"
            value={summary.recentlyUpdated}
            description="Records updated recently, useful for monitoring active catalog work."
          />
          <MetricCard
            eyebrow="Supervisor ownership"
            value={summary.ownedBySupervisor}
            description="Courses already associated with a supervisor identifier."
          />
        </section>

        <CourseInsights summary={summary} />

        <section className="workspace-card">
          <div className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Catalog records</p>
              <h2>All courses</h2>
            </div>
            <button type="button" className="primary-button" onClick={openCreateModal}>
              <Plus size={16} />
              Add course
            </button>
          </div>

          <div className="search-shell">
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by course name, description, or ID"
            />
          </div>

          <CourseTable
            courses={filteredCourses}
            activeCourseId={activeCourse?.id}
            onView={handleView}
            onEdit={openEditModal}
            onDelete={setCoursePendingDelete}
          />
        </section>
      </section>

      <CourseDetailDrawer
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
        onEdit={openEditModal}
      />

      {isFormOpen ? (
        <CourseFormModal
          key={`${formMode}-${editingCourse?.id ?? 'new'}`}
          open={isFormOpen}
          mode={formMode}
          initialValues={editingCourse}
          saving={saving}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCourse(null);
          }}
          onSubmit={handleSubmit}
        />
      ) : null}

      <ConfirmDialog
        course={coursePendingDelete}
        busy={deleting}
        onCancel={() => setCoursePendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
