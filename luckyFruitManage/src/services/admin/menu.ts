import http from '@/app/http';
import { IMenuListData, IRoleMenuBody } from '@/services/apiDataType';

export default {
    getMenus(projectType: string): Promise<IMenuListData> {
        return http.get(`/api-admin/menu/tree/${projectType}`, null);
    },
    /** 更新菜单 */
    editMenu(params: IRoleMenuBody) {
        return http.put('/api-admin/menu', params);
    },
    menuIdsByRoleId(roleId: number) {
        return http.get('/api-admin/menu/roleId', { roleId });
    },
    /** 添加角色菜单 */
    addRoleMenu(params: IRoleMenuBody) {
        return http.post('/api-admin/menu', params);
    },
    remove(id: number) {
        return http.delete(`/api-admin/menu/${id}`);
    },
    /**
     * 清空当前用户权限缓存
     * GET /menu/clearCache
     */
    // clearRoleCache() {}
    /**
     * 获取用户当前的权限(菜单)
     * GET /menu/currentUserMenus
     */
    userMenus(): Promise<IMenuListData> {
        return http.get('/api-admin/menu/userMenus');
    },
};
