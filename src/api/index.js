import service from '@/utils/axios'

export const signIpApi = () => service.post('/signip')

export const insertWallApi = data => service.post('/insertWall', data)

export const findWallPageApi = data => service.post('/findwallpage', data)