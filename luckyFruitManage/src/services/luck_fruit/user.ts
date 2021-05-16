import http from '../../app/http';


export default {
    getUserList(param: {
        id: number,
        pageNum: number,
        pageSize: number,
    }) {
      return http.get(`/tenant/getUserList`, param);
    },

    addUserBalance(param: {
        userId: number,
        balance: number,
    }) {
        return http.put(`/tenant/addUserBalance`, param);
    },
  };
