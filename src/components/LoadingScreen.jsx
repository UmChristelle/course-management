export default function LoadingScreen({ label = 'Loading workspace...' }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__orb" />
      <p>{label}</p>
    </div>
  );
}
