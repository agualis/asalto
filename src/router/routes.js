
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'login-ui', component: () => import('pages/LoginUI.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'signup', component: () => import('pages/Signup.vue') },
      { path: 'map/:coordinates', component: () => import('pages/Map.vue') },
      { path: 'list', component: () => import('pages/List.vue') },
      { path: 'detail/:workId', component: () => import('pages/Detail.vue') },
      { path: 'create-artwork', component: () => import('pages/CreateArtwork.vue') },
      { path: 'reset-firebase', component: () => import('pages/ResetDb.vue') },
      { path: 'modals', component: () => import('pages/PlayModals.vue') },
      { path: '', component: () => import('pages/Map.vue') },
      { path: '/:workId', component: () => import('pages/Map.vue') },
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
