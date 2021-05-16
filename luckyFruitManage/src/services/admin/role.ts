import http from '@/app/http';
import { IRoleListData } from '@/services/apiDataType';

export default {
    findList(params: { pageSize: number,  pageNum: number, name: string } | null): Promise<IRoleListData> {
        return http.post('/api-admin/role/list', params);
    },
    findById: (id: number) => {
        return http.get('/api-admin/role/userId/' + id);
    },

    add(params: any) {
        return http.post(`/api-admin/role`, params);
    },
    update(params: any) {
        return http.put('/api-admin/role', params);
    },

    // 单个删除role
    remove: (id: number) => {
        return http.delete(`/api-admin/role/${id}`);
    },

    // 批量删除，传ids数组
    removeBatch: (ids: string[]) => {
        return http.delete(`/api-admin/role/batch/${ids}`);
    },
};
