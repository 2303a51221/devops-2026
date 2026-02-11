import WelcomeMessage from './components/WelcomeMessage';
import CourseDetails from './components/CourseDetails';
import UserGuidance from './components/UserGuidance';
import './App.css';

function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="logo">📖 LearnHub</h1>
      </header>

      <main className="dashboard-main">
        <WelcomeMessage />
        <CourseDetails />
        <UserGuidance />
      </main>

      <footer className="dashboard-footer">
        <p>© 2026 LearnHub - Assignment 8 React Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
