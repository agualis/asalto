
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Map.vue') },
      { path: 'map/:coordinates', component: () => import('pages/Map.vue') },
      { path: 'list', component: () => import('pages/List.vue') },
      { path: 'detail/:workId', component: () => import('pages/Detail.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
