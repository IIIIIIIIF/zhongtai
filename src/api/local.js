import {postAction} from '../config/axios'


//生成专家报告
export const generateExpert = params => postAction('/local/stads/expert', params);
//生成机构报告
export const generateOrg = params => postAction('/local/stads/org', params);
//生成技术报告
export const generateSubject = params => postAction('/local/stads/subject', params);
