import request from '/@/utils/request';

export function useUserApi() {
  return {
    list: (params) => {
      return request({
        url: 'api/sys/user/list',
        method: 'get',
        params,
      });
    },
    add: (params) => {
      return request({
        url: 'api/sys/user/save',
        method: 'post',
        data: params,
      });
    },
    register: (params) => {
      return request({
        url: 'api/sys/user/register',
        method: 'post',
        data: params,
      });
    },
    resetPassword: (params) => {
      return request({
        url: 'api/sys/user/resetPassword',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/sys/user/update',
        method: 'post',
        data: params,
      });
    },
    updateBaseInfo: (params) => {
      return request({
        url: 'api/sys/user/updateBaseInfo',
        method: 'post',
        data: params,
      });
    },
    password: (params) => {
      return request({
        url: 'api/sys/user/password',
        method: 'post',
        data: params,
      });
    },
    updateEmail: (params) => {
      return request({
        url: 'api/sys/user/email/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/sys/user/delete',
        method: 'post',
        data: params,
      });
    },
    changeLanguage: (params) => {
      return request({
        url: 'api/sys/user/language/change',
        method: 'get',
        params,
      });
    }
  };
}
