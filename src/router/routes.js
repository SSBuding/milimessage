const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/wall',
        component: () => import('@/views/MiLiIndex.vue'),
        children: [
            {
                path: 'wall',
                name: 'wall',
                component: () => import('@/views/WallMessage.vue')
            }
        ]
    }
]

export default routes