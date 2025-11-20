import Sidebar from '../Components/Sidebar';

const DashboardHome = () => {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>Track students, manage courses, view analytics.</p>
      </div>
    </div>
  );
};

export default DashboardHome;
