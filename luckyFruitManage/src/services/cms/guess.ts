import http from '@/app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  guessList(params: { pageNum: number, pageSize: number }) {
    const body = {
      ...params,
      systemType: SYSTEM_TYPE,
    };
    return http.post('/api-cms/adminGuessGame/getGuessGames', body);
  },
  deleteGuess(guessId: number | string) {
    return http.delete(`/api-cms/adminGuessGame/deletedGuessGame/${guessId}`, null);
  },
  startGuessGame(guessId: number | string) {
    return http.put(`/api-cms/adminGuessGame/startGuessGame/${guessId}`, null);
  },
  stopGuessGame(guessId: number | string) {
    return http.put(`/api-cms/adminGuessGame/stopGuessGame/${guessId}`, null);
  },
  getGuessDetail(guessId: number | string) {
    return http.get(`/api-cms/adminGuessGame/getGuessGameDetail/${guessId}`, null);
  },
  createGuessGame(params: any) {
    return http.post(`/api-cms/adminGuessGame/guessGameCreate`, {
      ...params,
      systemType: SYSTEM_TYPE,
    });
  },
  editGuessGame(params: any) {
    return http.put(`/api-cms/adminGuessGame/guessGameEdit`, params);
  },
};
