import {getAction,postAction} from '../config/axios'

//资源入驻-资源上传-接口上传
export const openApiBulkIndex=params=>postAction('/manager/open/api/bulkIndex',params);
