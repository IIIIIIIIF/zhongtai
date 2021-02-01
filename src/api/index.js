import {getAction} from '../config/axios'

//首页表格 对号错号加载
export const getIndexList = _ => getAction('/static/indexList.json', {});
//前台页面个人中心菜单
export const getIndexFontNav = _ => getAction('/static/indexFontNav.json', {});
//前台资源入驻
export const getSettlementNav = _ => getAction('/static/settlementNav.json', {});
