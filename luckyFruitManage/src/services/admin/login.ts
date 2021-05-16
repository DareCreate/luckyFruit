import http from '@/app/http';

export default {
  login: (params: { loginId: string, password: string }) => {
    return http.get('/tenant/tenantLogin', params);
  },

  tenantAdd: (params: { username: string, password: string }) => {
    return http.post('/tenant/tenantAdd', params);
  },
};
