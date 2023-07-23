import request from '@/utils/request';

export function useCodeGenApi() {
  return {
    list: (params) => {
      return request({
        url: 'api/sys/gen/list',
        method: 'get',
        params: params,
      });
    },
    create: (params) => {
      return request({
        url: 'api/sys/gen/create',
        method: 'post',
        data: params,
      });
    },
  };
}
