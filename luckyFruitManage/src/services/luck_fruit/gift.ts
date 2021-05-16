import http from '../../app/http';
export default {
    getGiftCodeDetail(giftCode: string) {
      return http.get(`/giftCode/${giftCode}`, null);
    },

    dealGiftCode(giftCode: string) {
        return http.put(`/giftCode/${giftCode}`, null);
    },
  };

