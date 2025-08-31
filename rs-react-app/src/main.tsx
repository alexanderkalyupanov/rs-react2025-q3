import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loading from './components/Loading/Loading.tsx'

const LazyTable = lazy(() => import('./components/Table/Table.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyTable />

    </Suspense>
  </StrictMode>
)
