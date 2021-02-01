// TODO 资源入驻
import {getAction,postAction} from "../config/axios";

//接口资源申请
export const resourceSubmitDataJoinApply= params=>postAction('/manager/resource/submitDataJoinApply',params);

//我的入驻列表
export const resourceGetDataJoinApplyList=params=>getAction('/manager/resource/getDataJoinApplyList',params);

//索引类型查询
export const resourceGetIndexTypeList=params=>getAction('/manager/resource/getIndexTypeList',params);

//入驻审批
export const resourceJoinApproal=params=>getAction('/manager/resource/joinApproal',params);

//我的数据-数据资源
export const resourceGetIndexInfoList=params=>getAction('/manager/resource/getIndexInfoList',params);

//个人中心-我的监控-索引信息-文档数量
export const resourceIndexDocCount=params=>getAction('/manager/resource/indexdoccount',params);
