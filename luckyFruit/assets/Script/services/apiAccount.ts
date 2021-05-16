import http from './http';
export default {
  userLogin(params: {
    phoneNum: string,
    password: string,
  }) {
    return http.get(`/appUser/userLogin`, params);
  },
  userRegister(params: any) {
    return http.post(`/appUser/userRegister`, params);
  },
  userInfo() {
    return http.get(`/luckyFruit/userGameInfo`, null);
  },
};
