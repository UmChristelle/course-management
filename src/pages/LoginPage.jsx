import { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, authLoading } = useAuth();
  const [form, setForm] = useState({
    email: 'admin@example.com',
    password: 'adminpassword123',
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const session = await signIn(form);

      if (session.role !== 'SUPERVISOR') {
        toast.error('This interface is restricted to supervisor accounts.');
        return;
      }

      toast.success('Welcome back. Supervisor access granted.');
      navigate(location.state?.from ?? '/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="login-layout">
      <section className="login-hero">
        <div className="login-hero__badge">
          <ShieldCheck size={16} />
          <span>University Supervisor Workspace</span>
        </div>
        <h1>Manage your course catalog with a polished, audit-friendly dashboard.</h1>
        <p>
          Sign in with the supervisor account to create, review, update, and safely
          remove course records from the live backend.
        </p>

        <div className="hero-grid">
          <article>
            <strong>Authenticated access</strong>
            <p>Supervisor-only actions are protected before any catalog changes happen.</p>
          </article>
          <article>
            <strong>Live CRUD workflow</strong>
            <p>Every create, detail, update, and delete action is connected to the API.</p>
          </article>
        </div>
      </section>

      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="section-heading">
            <div>
              <p className="section-heading__eyebrow">Secure access</p>
              <h2>Supervisor login</h2>
            </div>
          </div>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            className="primary-button primary-button--wide"
            disabled={authLoading}
          >
            <LockKeyhole size={16} />
            <span>{authLoading ? 'Signing in...' : 'Enter dashboard'}</span>
            <ArrowRight size={16} />
          </button>

          <div className="login-card__hint">
            Demo credentials are prefilled for this assignment.
          </div>
        </form>
      </section>
    </main>
  );
}
