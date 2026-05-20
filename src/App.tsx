import { Link, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import SelectUserType from './pages/SelectUserType';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <>
      <header className="site-header">
        <Link className="site-logo" to="/">
          CIC Support Platform
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/select-user-type" element={<SelectUserType />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
        <Route path="/dashboard/advisor" element={<AdvisorDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
