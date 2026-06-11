import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../components/layout/PublicLayout'
import { AdminLayout } from '../components/layout/AdminLayout'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { AdminLoginPage } from '../pages/AdminLoginPage'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { WorkshopsPage } from '../features/workshops/pages/public/WorkshopsPage'
import { WorkshopDetailPage } from '../features/workshops/pages/public/WorkshopDetailPage'
import { AdminWorkshopsPage } from '../features/workshops/pages/admin/AdminWorkshopsPage'
import { WorkshopFormPage } from '../features/workshops/pages/admin/WorkshopFormPage'
import { ArticlesPage } from '../features/articles/pages/public/ArticlesPage'
import { ArticleDetailPage } from '../features/articles/pages/public/ArticleDetailPage'
import { AdminArticlesPage } from '../features/articles/pages/admin/AdminArticlesPage'
import { ArticleFormPage } from '../features/articles/pages/admin/ArticleFormPage'
import { QuickPlayPage } from '../features/quick-play/pages/QuickPlayPage'
import { AiAdvisorPage } from '../features/ai-advisor/pages/AiAdvisorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'workshops', element: <WorkshopsPage /> },
      { path: 'workshops/:slug', element: <WorkshopDetailPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'quick-play', element: <QuickPlayPage /> },
      { path: 'ai-advisor', element: <AiAdvisorPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'workshops', element: <AdminWorkshopsPage /> },
      { path: 'workshops/new', element: <WorkshopFormPage /> },
      { path: 'workshops/:id/edit', element: <WorkshopFormPage /> },
      { path: 'articles', element: <AdminArticlesPage /> },
      { path: 'articles/new', element: <ArticleFormPage /> },
      { path: 'articles/:id/edit', element: <ArticleFormPage /> },
    ],
  },
])
