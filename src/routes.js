import React from 'react'

const App = React.lazy(() => import('./App'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/app/:departmentId', name: 'app', component: App }
]
export default routes