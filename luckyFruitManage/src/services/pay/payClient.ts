import http from '../../app/http';

export default {
  payClientList(tenantld: number | string) {
    return http.get(`/api-shiropay/adminPayClient/payClientList/${tenantld}`, null);
  },
  deletePayClient(payClientId: number | string) {
    return http.delete(`/api-shiropay/adminPayClient/${payClientId}`, null);
  },
  createPayClient(params: any) {
    return http.post(`/api-shiropay/adminPayClient/payClientCreate`, params);
  },
  getPayClientDetail(payClientId: number | string) {
    return http.get(`/api-shiropay/adminPayClient/payClientDetail/${payClientId}`, null);
  },
  // client phone
  payClientPhoneList(payClientId: number | string) {
    return http.get(`/api-shiropay/adminPayClientPhone/payClientPhoneList/${payClientId}`, null);
  },
  deletePayClientPhone(payClientPhoneId: number | string) {
    return http.delete(`/api-shiropay/adminPayClientPhone/payClientPhoneDeleted/${payClientPhoneId}`, null);
  },
  createPayClientPhone(params: any) {
    return http.post(`/api-shiropay/adminPayClientPhone/payClientPhoneCreate`, params);
  },
  getPayClientPhoneDetail(payClientPhoneId: number | string) {
    return http.get(`/api-shiropay/adminPayClientPhone/payClientPhoneDetail/${payClientPhoneId}`, null);
  },
  editPayClientPhone(payClientPhoneId: number | string, phoneName: string) {
    return http.put(`/api-shiropay/adminPayClientPhone/payClientPhoneEdit/${payClientPhoneId}/${phoneName}`, null);
  },
  // phome amount
  payClientPhoneAmountList(payClientPhoneId: string | number) {
    return http.get(`/api-shiropay/adminPayClientPhoneAmount/payClientPhoneAmountList/${payClientPhoneId}`, null);
  },
  deletePayClientPhoneAmount(payClientPhoneAmountId: string | number) {
    return http.delete(`/api-shiropay/adminPayClientPhoneAmount/deleted/${payClientPhoneAmountId}`, null);
  },
  createPayClientPhoneAmount(params: any) {
    return http.post(`/api-shiropay/adminPayClientPhoneAmount/payClientPhoneAmountCreate`, params);
  },
  // qrcode
  payClientPhoneQrCodeList(payClientPhoneAmountId: number | string) {
    return http.get(`/api-shiropay/adminPayClientPhoneQrCode/payClientPhoneQrCodeList/
    ${payClientPhoneAmountId}`, null);
  },
  createPayClientPhoneQrCode(params: any) {
    return http.post(`/api-shiropay/adminPayClientPhoneQrCode/payClientPhoneQrCodeCreate`, params);
  },
  editPayClientPhoneQrCode(params: any) {
    return http.put(`/api-shiropay/adminPayClientPhoneQrCode/payClientPhoneQrCodeEdit`, params);
  },
  getPayClientPhoneQrCodeDetail(phoneQrCodeId: number | string) {
    return http.get(`/api-shiropay/adminPayClientPhoneQrCode/payClientPhoneQrCodeDetail/${phoneQrCodeId}`, null);
  },
  deletePayClientPhoneQrCode(phoneQrCodeId: number | string) {
    return http.delete(`/api-shiropay/adminPayClientPhoneQrCode/deleted/${phoneQrCodeId}`, null);
  },
  getQrcodeTaskList(payClientPhoneId: number | string) {
    return http.get(`/api-shiropay/adminPayClientBuildQrCodeTask/getList/${payClientPhoneId}`, null);
  },
  deletePayClientPhoneQrCodeTask(qrCodeTaskId: number | string) {
    return http.delete(`/api-shiropay/adminPayClientBuildQrCodeTask/deleted/${qrCodeTaskId}`, null);
  },
  createPayClientPhoneQrCodeTask(params: any) {
    return http.post(`/api-shiropay/adminPayClientBuildQrCodeTask/payClientBuildQrCodeTaskCreate`, params);
  },
};
