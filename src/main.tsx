import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import App from './App'

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const CaseStudyMdxPage = lazy(() => import('./pages/CaseStudyMdxPage'))
const CaseStudiesIndexPage = lazy(() => import('./pages/CaseStudiesIndexPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/case-studies"
          element={
            <Suspense fallback={null}>
              <CaseStudiesIndexPage />
            </Suspense>
          }
        />
        <Route
          path="/case-study/nomadcrew"
          element={
            <Suspense fallback={null}>
              <CaseStudyPage />
            </Suspense>
          }
        />
        <Route
          path="/case-study/:slug"
          element={
            <Suspense fallback={null}>
              <CaseStudyMdxPage />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={null}>
              <BlogIndexPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={null}>
              <BlogPostPage />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={null}>
              <ProductsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
