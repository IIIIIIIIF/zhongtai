import {getAction,getActionAsync,postAction} from '../config/axios';

export const resourceGetApilistTypeAll = params => getAction('/manager/resource/getApilistTypeAll', params);

export const resourceURL = (url,params) => getAction(`/manager/resource/${url}`, params);

//接口资源查询所有
export const resourceGetApiListInfo=params=>getAction('/manager/resource/getApiListInfo',params);

export const resourceGetApiIndexExamineStatus = params => getActionAsync('/manager/resource/getApiIndexExamineStatus', params);

//列表页左侧导航
export const resourceGetApilistType=params=>getAction(`/manager/resource/getApilistType`,params);

// 错误代码列表
export const resourceGetApiErrCodeAll=params=>getAction(`/manager/resource/getApiErrCodeAll`,params);

export const resourceGetApilist=params=>getAction(`/manager/resource/getApilist`,params);

// 点击立即申请按钮
export const resourceAddApiIndexExamine=params=>postAction(`/manager/resource/addApiIndexExamine`,params);
