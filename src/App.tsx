import * as React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './store/useStore'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import SearchTrainPage from './components/SearchTrainPage'
import IDSSPage from './components/IDSSPage'
import LiveMapPage from './components/LiveMapPage'
import AlertsPage from './components/AlertsPage'
import SettingsPage from './components/SettingsPage'
import StationDetails from './components/StationDetails'
import AddCoaches from './components/AddCoaches' // Import AddCoaches component
import RulesPage from './components/RulesPage'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user)
  return user ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Layout><SearchTrainPage /></Layout></ProtectedRoute>} />
          <Route path="/idss" element={<ProtectedRoute><Layout><IDSSPage /></Layout></ProtectedRoute>} />
          <Route path="/live-map" element={<ProtectedRoute><Layout><LiveMapPage /></Layout></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Layout><AlertsPage /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
          <Route path="/rules" element={<ProtectedRoute><Layout><RulesPage /></Layout></ProtectedRoute>} />
          <Route path="/stations/:id" element={<ProtectedRoute><Layout><StationDetails /></Layout></ProtectedRoute>} />
          <Route path="/stations/:id/add-coaches" element={<ProtectedRoute><Layout><AddCoaches /></Layout></ProtectedRoute>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
