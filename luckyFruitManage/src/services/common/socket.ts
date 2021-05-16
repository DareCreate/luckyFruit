import http from '../../app/http';

export default {
  getAllOnlineCount() {
    return http.get('/api-socket/socket/getAllOnlineCount', null);
  },
};
