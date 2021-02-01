import {getAction, getActionAsync, postAction} from '../config/axios';

//用户登录
// export const managerKFJLongin = params => postAction('/manager/kfj/longin', params);
export const managerKFJLongin = params => postAction('/manager/kfj/login', params);

//用户注册
export const managerKFJRegister = params=>postAction('/manager/kfj/register',params);

//获取所有菜单列表
export const managerKFJGetMenuList=params=>getAction('/manager/kfj/getMenuList',params);

//添加菜单
export const managerKFJAddMenu=params=>postAction('/manager/kfj/addMenu',params);

//删除菜单
export const managerKFJDeleteMenu=params=>getAction('/manager/kfj/deleteMenu',params);

//修改菜单
export const managerKFJUpdateMenu=params=>postAction('/manager/kfj/updateMenu',params);

//获取权限列表
export const managerKFJGetRoleList=params=>getAction('/manager/kfj/getRoleList',params);

//添加权限
export const managerKFJAddRole=params=>postAction('/manager/kfj/addRole',params);

//修改权限
export const managerKFJUpdateRole=params=>postAction('/manager/kfj/updateRole',params);

//删除权限
export const managerKFJDeleteRole=params=>getAction('/manager/kfj/deleteRole',params);

//获取根据角色编号权限
export const managerKFJGetRoleAuthority=params=>getAction('/manager/kfj/getRoleAuthority',params);

//给角色授权
export const managerKFJAddAuthority=params=>postAction('/manager/kfj/addAuthority',params);

//查询用户信息
export const managerKFJGetUser=params=>getAction('/manager/kfj/getUser',params);

//获取所有用户
export const managerKFJGetUserListAll=params=>getAction('/manager/kfj/getUserListAll',params);

//修改用户信息
export const managerKFJChangeUser=params=>postAction('/manager/kfj/changeUser',params);

//删除用户
export const managerKFJDeleteUser=params=>getAction('/manager/kfj/deleteUser',params);

//修改密码
export const managerKFJChangePassword=params=>postAction('/manager/kfj/changePassword',params);

//根据角色ID获取到所有菜单
export const managerKFJGetUserMenus=params=>getAction('/manager/kfj/getUserMenus',params);

//查询用户权限
export const managerKFJGetUserJdiction=params=>getAction('/manager/kfj/getUserJdiction',params);

//用户关联授权
export const managerKFJChangeUserPermission=params=>postAction('/manager/kfj/changeUserPermission',params);

//查询管理员列表
export const managerKFJGetAdUserListAll=params=>getAction('/manager/kfj/getAdUserListAll',params);

//修改管理员
export const managerKFJChangeAdUser=params=>postAction('/manager/kfj/changeAdUser',params);

//数据资源全部查询
export const managerResourceGetIndexInfoAll=params=>getAction('/manager/resource/getIndexinfoAll',params);

//资源来源查询
export const managerResourceGetSource=params=>getActionAsync('/manager/resource/getSource',params);

//资源来源全部查询
export const managerResourceGetSourceAll=params=>getActionAsync('/manager/resource/getSourceAll',params);

//数据资源添加
export const managerResourceAddIndexInfo=params=>postAction('/manager/resource/addIndexInfo',params);

//数据资源修改
export const managerResourceUpdateIndexInfo=params=>postAction('/manager/resource/updateIndexinfo',params);

//数据资源删除
export const managerResourceDeleteIndexInfo=params=>getAction('/manager/resource/deleteIndexinfo',params);

//资源来源添加
export const managerResourceAddSource=params=>postAction('/manager/resource/addSource',params);

//资源来源修改
export const managerResourceUpdateSource=params=>postAction('/manager/resource/updateSource',params);

//资源来源删除
export const managerResourceDeleteSource=params=>getAction('/manager/resource/deleteSource',params);

//动态数据列表
export const managerResourceGetListDataDynam=params=>getAction('/manager/resource/getListDataDynam',params);

//动态数据添加
export const managerResourceAddDataDynam=params=>postAction('/manager/resource/addDataDynam',params);

//动态数据删除
export const managerResourceDeleteDataDynam=params=>getAction('/manager/resource/deleteDataDynam',params);

//动态数据更新
export const managerResourceUpdateDataDynam=params=>postAction('/manager/resource/updateDataDynam',params);

//数据集列表
export const managerResourceGetDataSetAll=params=>getAction('/manager/resource/getDataSetAll',params);

//接口类型查询
export const managerResourceGetApitListType=params=>getAction('/manager/resource/getApilistType',params);

//接口类型列表
export const managerResourceGetApiListTypeAll=params=>getActionAsync('/manager/resource/getApilistTypeAll',params);

//接口类型列表
export const managerResourceGetApiListTypeKeAll=params=>getAction('/manager/resource/getApilistTypeKeAll',params);

//数据集添加
export const managerResourceAddDataSet=params=>postAction('/manager/resource/addDataSet',params);

//数据集删除
export const managerResourceDeleteDataSet=params=>getAction('/manager/resource/deleteDataSet',params);

//数据集修改
export const managerResourceUpdateDataSet=params=>postAction('/manager/resource/updateDataSet',params);

//接口资源查询所有
export const managerResourceGetApiListAll=params=>getAction('/manager/resource/getApilistAll',params);

//外部接口列表
export const managerResourceGetListExtApiList=params=>getAction('/manager/resource/getListExtApilist',params);

//接口类型添加
export const managerResourceAddApiListType=params=>postAction('/manager/resource/addApilistType',params);

//接口类型修改
export const managerResourceUpdateApiListType=params=>postAction('/manager/resource/updateApilistType',params);

//接口类型删除
export const managerResourceDeleteApiListType=params=>getAction('/manager/resource/deleteApilistType',params);

//接口索引审批列表
export const managerResourceGetApiIndexExamineAll=params=>getAction('/manager/resource/getApiIndexExamineAll',params);

//接口索引审批功能
export const managerResourceUdpApiIndexExamine=params=>postAction('/manager/resource/udpApiIndexExamine',params);

//任务管理
export const managerResourceGetListTask=params=>getAction('/manager/resource/getListTask',params);

//执行脚本
export const managerResourceExecRemote=params=>getAction('/manager/resource/execRemote',params);

//外部接口删除
export const managerResourceDeleteExtApiList=params=>getAction('/manager/resource/deleteExtApilist',params);

//接口资源添加
export const managerResourceAddApiList=params=>postAction('/manager/resource/addApilist',params);

//接口资源删除
export const managerResourceDeleteApiList=params=>getAction('/manager/resource/deleteApilist',params);

//接口资源修改
export const managerResourceUpdateApiList=params=>postAction('/manager/resource/updateApilist',params);

//删除任务
export const managerResourceDeleteTask=params=>getAction('/manager/resource/deleteTask',params);

//查询索引标签
export const managerResourceGetIndexLabelList=params=>getAction('/manager/resource/getIndexLabelList',params);

//添加索引标签
export const managerResourceAddIndexLabel=params=>postAction('/manager/resource/addIndexLabel',params);

//修改索引标签
export const managerResourceUpdateIndexLabel=params=>postAction('/manager/resource/updateIndexLabel',params);

//删除索引标签
export const managerResourceDeleteIndexLabel=params=>postAction('/manager/resource/deleteIndexLabel',params);

//基本检索-测试工具
export const managerApiSearchPreciseSearch=params=>getAction('/manager/api/search/preciseSearch',params);

//获取私有数据资源
export const managerResourceGetIndexInfo=params=>getAction('/manager/resource/getIndexinfo',params);

//资源来源根据父id查找子资源
export const managerResourceGetSourceByPid=params=>getAction('/manager/resource/getSourceByPid',params);

//导入日志查询
export const managerResourceGetFileJoinList=params=>getAction('/manager/resource/getFileJoinList',params);

//相似文本检索
export const apiSearchMoreLikeSearch=params=>postAction('/apiKe/api/search/moreLikeSearch',params);

//向量检索
export const apiSearchVectorSearch=params=>postAction('/manager/api/search/vectorSearch',params);

//接口资源查询
export const managerResourceGetApiList=params=>getAction('/manager/resource/getApilist',params);

