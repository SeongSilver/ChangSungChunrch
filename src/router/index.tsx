import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import MembersPage from '@/pages/members/MembersPage'
import MemberFormPage from '@/pages/members/MemberFormPage'
import MemberDetailPage from '@/pages/members/MemberDetailPage'
import DonationsPage from '@/pages/donations/DonationsPage'
import DonationFormPage from '@/pages/donations/DonationFormPage'
import NoticesPage from '@/pages/notices/NoticesPage'
import NoticeFormPage from '@/pages/notices/NoticeFormPage'
import NoticeDetailPage from '@/pages/notices/NoticeDetailPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* 교인 관리 */}
          <Route path="members" element={<MembersPage />} />
          <Route path="members/new" element={<MemberFormPage />} />
          <Route path="members/:id" element={<MemberDetailPage />} />
          <Route path="members/:id/edit" element={<MemberFormPage />} />

          {/* 헌금 관리 */}
          <Route path="donations" element={<DonationsPage />} />
          <Route path="donations/new" element={<DonationFormPage />} />
          <Route path="donations/:id/edit" element={<DonationFormPage />} />

          {/* 공지사항 */}
          <Route path="notices" element={<NoticesPage />} />
          <Route path="notices/new" element={<NoticeFormPage />} />
          <Route path="notices/:id" element={<NoticeDetailPage />} />
          <Route path="notices/:id/edit" element={<NoticeFormPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
