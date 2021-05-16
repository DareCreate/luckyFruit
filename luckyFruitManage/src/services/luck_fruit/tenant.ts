import http from '../../app/http';

export default {
    jackpotAdd(param: {
        jackpot: number,
    }) {
      return http.post(`/tenant/jackpotAdd`, param);
    },

    setTax(param: {
        tax: number,
    }) {
        return http.post(`/tenant/setTax`, param);
    },

    tenantCharge(chargeCode: string) {
        return http.put(`/tenant/tenantCharge/${chargeCode}`, null);
    },

    tenantInfo() {
        return http.get(`/tenant/tenantInfo`, null);
    },
    getTenantQrCode(param: {
        url: string,
        content: string,
    }) {
        return http.get(`/tenant/getTenantQrCode`, param);
    },
  };

