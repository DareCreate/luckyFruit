import http from '@/app/http';

export default {
  tenantList() {
    return http.get('/api-admin/tenant/tenantList', null);
  },
  deleteTenant(tenantId: number | string) {
    return http.delete(`/api-admin/tenant/tenantDelete/${tenantId}`, null);
  },
  createTenant(params: any) {
    return http.post(`/api-admin/tenant/create`, params);
  },
  createTenantMenu(tenantId: number | string) {
    return http.post(`/api-admin/tenant/createRootMenu/${tenantId}`, null);
  },
  createTenantUser(params: any) {
    return http.post(`/api-admin/tenant/createTenantUser`, params);
  },
  editTenant(params: any) {
    return http.put(`/api-admin/tenant/tenantEdit`, params);
  },
  tenantMenuEdit(params: any) {
    return http.put(`/api-admin/tenant/tenantMenuEdit`, params);
  },
  tenantRoleList(tenantId: number | string) {
    return http.get(`/api-admin/tenant/tenantRoleList/${tenantId}`, null);
  },
  tenantDetail(tenantId: number | string) {
    return http.get(`/api-admin/tenant/${tenantId}`, null);
  },
};
