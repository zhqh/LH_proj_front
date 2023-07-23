import request from '@/utils/request';

export function useRoleApi() {
  return {
    list: (params) => {
      return request({
        url: 'api/sys/role/list',
        method: 'get',
        params,
      });
    },
    add: (params) => {
      return request({
        url: 'api/sys/role/save',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/sys/role/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/sys/role/delete',
        method: 'post',
        data: params,
      });
    },
    select: () => {
      return request({
        url: 'api/sys/role/select',
        method: 'get',
      });
    },
  };
}
