import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) navigate('/dashboard');
    else setError(result.error);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <GraduationCap size={48} />
          <h1>UniManage</h1>
          <p>University Course Management Portal</p>
        </div>
        <div className="login-stats">
          {[['500+', 'Courses'], ['12K+', 'Students'], ['200+', 'Instructors']].map(([n, l]) => (
            <div key={l} className="login-stat">
              <span className="stat-num">{n}</span>
              <span className="stat-lbl">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to your supervisor account</p>
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label"><Mail size={14}/> Email Address</label>
              <input
                type="email" className="form-control"
                placeholder="admin@example.com"
                value={form.email}
                onChange={e => setForm(f => ({...f, email: e.target.value}))}
                required autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label className="form-label"><Lock size={14}/> Password</label>
              <div className="input-with-icon">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Your password"
                  value={form.password}
                  onChange={e => setForm(f => ({...f, password: e.target.value}))}
                  required autoComplete="current-password"
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <EyeOff size={17}/> : <Eye size={17}/>}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="login-hint">Use: admin@example.com / adminpassword123</p>
        </div>
      </div>
    </div>
  );
}