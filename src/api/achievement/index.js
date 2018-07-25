/**
 * Created by liulong on 2018/7/23.
 */
import request from '@/utils/request'
/**
 * 获取业绩指标列表
 * @param query
 */
export function getPerformList(query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query
  })
}
/**
 * 获取全部职位
 */
export function getAllPositon() {
  return request({
    url: '/admin/positions/list',
    method: 'get'
  })
}
/**
 * 获取所有部门
 */
export function getAllDeparts() {
  return request({
    url: '/admin/dept/tree',
    method: 'get'
  })
}
/**
 * 获取职级
 */
export function getAllRank() {
  return request({
    url: '/admin/rank',
    method: 'get'
  })
}

/** 
 * 获取平衡计分卡列表
 * @param query
*/
export function getBalancedList(query) {
  return request({
    url: '/admin/balancedScoreCard',
    method: 'get',
    params: query
  })
}

/** 
 * id获取平衡计分卡
*/
export function getBalancedId(id) {
  return request({
    url: `/admin/balancedScoreCard/${id}`,
    method: 'get'
  })
}

/** 
 * 修改平衡计分卡
*/
export function editBalanced(id, obj) {
  return request({
    url: `/admin/balancedScoreCard/${id}`,
    method: 'put',
    data: obj
  })
}

/**
 * 获取试用期业绩列表所有数据
 */
export function getPbtList() {
  return request({
    url: '/admin/probationNorm/list',
    method: 'get'
  })
}
/**
 * 编辑试用期业绩item
 * @param id item.id
 */
export function editPbtItem(id) {
  return request({
    url: `/admin/probationNorm/${id}`,
    method: 'get'
  })
}
/**
 * 编辑试用期业绩item
 * @param id item.id
 */
export function putPbtItem(id) {
  return request({
    url: `/admin/probationNorm/${id}`,
    method: 'put'
  })
}
/**
 * 删除试用期业绩item
 * @param id item.id
 */
export function delPbtItem(id) {
  return request({
    url: `/admin/probationNorm/${id}`,
    method: 'delete'
  })
}
/**
 * 查询产品信息(带分页查询)
 * @param
 */
export function getSalesSupportList(query) {
  return request({
    url: `/performance/salesSupport`,
    method: 'get',
    params: query
  })
}
/**
 * 根据id查询销售支持
 * @param
 */
export function getSalesSupport(id) {
  return request({
    url: `/performance/salesSupport/${id}`,
    method: 'get'
  })
}
/**
 * 修改销售支持
 * @param
 */
export function updateSalesSupport(id) {
  return request({
    url: `/performance/salesSupport/${id}`,
    method: 'put'
  })
}
/**
 * 删除试用期业绩标准
 * @param
 */
export function deleteSalesSupport(id) {
  return request({
    url: `/performance/salesSupport/${id}`,
    method: 'delete'
  })
}
