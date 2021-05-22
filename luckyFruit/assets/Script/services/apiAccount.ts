import http from './http';
export default {
  userLogin(params: {
    loginId: string,
    password: string,
    tenantId: string | number,
  }) {
    return http.get(`/user/userLogin`, params);
  },
  userAdd(params: {
    loginId: string,
    password: string,
    tenantId: string | number,
  }) {
    return http.post(`/user/userAdd`, params);
  },
  userInfo() {
    return http.get(`/user/userInfo`, null);
  },
};
