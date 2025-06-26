import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/auth/login'
import SummaryPage from './pages/summary'
import AdminPage from './pages/admin'
import Layout from './components/layout'
import GuestRoute from './routes/guestRoute'
import ProtectedRoute from './routes/protectedRoute'
import ActivityLogsPage from './pages/activity-logs'
import UserManagementPage from './pages/user-management'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity-logs"
          element={
            <ProtectedRoute>
              <ActivityLogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
    </Routes>
  )
}

export default App
