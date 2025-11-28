import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import UserRecoveries from "./pages/UserRecoveries";
import UserPosts from "./pages/UserPosts";
import UserFinancial from "./pages/UserFinancial";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Breathing from "./pages/Breathing";
import Walking from "./pages/Walking";
import Academy from "./pages/Academy";
import Leaderboard from "./pages/Leaderboard";
import UserAchievements from "./pages/UserAchievements";
import UserActivities from "./pages/UserActivities";
import { UsersProvider } from "./context/UsersContext";

export default function App() {
  return (
    <UsersProvider>
      <Router>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/:id/recoveries" element={<UserRecoveries />} />
            <Route path="/users/:id/financial" element={<UserFinancial />} />
            <Route path="/users/:id/posts" element={<UserPosts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/users/:id/breathing" element={<Breathing />} />
            <Route path="/users/:id/walking" element={<Walking />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/users/:id/achievements"
              element={<UserAchievements />}
            />
            <Route path="/users/:id/activities" element={<UserActivities />} />
          </Routes>
        </AdminLayout>
      </Router>
    </UsersProvider>
  );
}
