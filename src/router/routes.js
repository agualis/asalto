
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'login-ui', component: () => import('pages/LoginUI.vue') },
      { path: 'superlogin', component: () => import('pages/superadmin/Superlogin.vue') },
      { path: 'signup', component: () => import('pages/superadmin/Signup.vue') },
      { path: 'create-artwork', component: () => import('pages/superadmin/CreateWork.vue') },
      { path: 'reset-db', component: () => import('pages/superadmin/ResetDb.vue') },
      { path: 'reset-db-hook', component: () => import('pages/superadmin/ResetDbHook.vue') },
      { path: 'list', component: () => import('pages/lists/List.vue') },
      { path: 'detail/:workId', component: () => import('pages/lists/Detail.vue') },
      { path: 'coordinates/:coordinates', component: () => import('pages/map/Map.vue') },
      { path: 'map/:workId', component: () => import('pages/map/Map.vue') },
      { path: '', component: () => import('pages/map/Map.vue') },
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
