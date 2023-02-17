const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/wall?id=0',
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