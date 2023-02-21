import service from '@/utils/axios'

export const signIpApi = () => service.post('/signip')

export const insertWallApi = data => service.post('/insertWall', data)

export const findWallPageApi = data => service.post('/findwallpage', data)

export const insertFeedbackApi = data => service.post('/insertfeedback', data)

export const insertCommentApi = data => service.post('/insertcomment', data)

export const findCommentPageApi = data => service.post('/findcommentpage', data)