import React from 'react'

const App = React.lazy(() => import('./App'))
const routes = [
  { path: '/Evaluation', exact: true, name: 'Home' },
  { path: '/Evaluation/:departmentId', name: 'app', component: App }
]
export default routes