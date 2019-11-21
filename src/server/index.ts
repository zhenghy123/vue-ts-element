const servers = '/manapi';
const serApi = '/api/statistic';
import axios from '@/utils/http';
import qs from 'qs';

// ------------------------------登录--------------------------------
// 用户登录获取token
export function post_login(params: object) {
  return axios.post(servers + '/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}
// 用户登出接口
export function post_logout(params: object) {
  return axios.post(servers + '/logout', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}
// 是否登陆校验
export function post_validToken(params: object) {
  return axios.post(servers + '/validToken', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}
//------------------日志查询----------------------------

// 业务日志信息分页查询
export function post_attachmentLogList(params: object) {
  let headers = { post: { 'Content-Type': 'application/json;charset=UTF-8' } };
  return axios.post('/manapi/statistic/operate/attachmentLog/list', params, {
    headers
  });
}
// 业务日志相关枚举值信息获取
export function get_findEnumInfo(params: object) {
  return axios.get('/manapi/statistic/operate/findEnumInfo', { params });
}
// 批量删除记录日志
export function get_attachmentLogDelete(params: object) {
  return axios.get('/manapi/statistic/operate/attachmentLog/delete', {
    params
  });
}
// 分发平台列表查询接口
export function get_platformList(params: object) {
  return axios.get('/manapi/distribution/platform/list', {
    params
  });
}

//------------------生产查询----------------------------

// 生产查询列表-详情
export function get_attachmentContentsDetail(params: object) {
  return axios.get(
    '/manapi/material-product/attachment/getAttachmentContentsDetail',
    {
      params
    }
  );
}
// 查询素材对应的分发详情列表
export function get_distTasksOfMaterial(params: object) {
  return axios.get('/manapi/distribution/distTasksOfMaterial', {
    params
  });
}

// 工作组查询接口(全量)
export function post_workgroup(params: object) {
  return axios.post(
    '/manapi/outer-data/mixed-edit/workgroup-complete',
    params,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
}
// 查询工作组任务接口(groupId)(全量)
export function get_groupTask(params: object) {
  return axios.get('/manapi/outer-data/mixed-edit/task-complete', {
    params
  });
}
//-----------------生产统计--------------------------------

// 查询素材总量接口
export function get_materialTotal(params: object) {
  return axios.get('/manapi/statistic/material/total', {
    params
  });
}
// 生产率统计接口
export function get_successRate(params: object) {
  return axios.get('/manapi/statistic/success/rate', {
    params
  });
}
// 生产总量统计接口
export function get_totalCount(params: object) {
  return axios.get('/manapi/statistic/product/total/count', {
    params
  });
}
// 按周期查询素材统计接口
export function get_materialDateRangeTotal(params: object) {
  return axios.get('/manapi/statistic/material/date-range/total', {
    params
  });
}
// 查询作品总量接口
export function get_productTotal(params: object) {
  return axios.get('/manapi/statistic/product/total', {
    params
  });
}
// 按周期查询作品统计接口
export function get_productDateRangeTotal(params: object) {
  return axios.get('/manapi/statistic/product/date-range/total', {
    params
  });
}
// 查询分发作品总量接口
export function get_distributionTotal(params: object) {
  return axios.get('/manapi/statistic/product/distribution/total', {
    params
  });
}
// 按周期查询分发作品统计接口
export function get_distributionDateRangeTotal(params: object) {
  return axios.get('/statistic/distribution/date-range/total', {
    params
  });
}
