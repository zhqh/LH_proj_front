import request from '/@/utils/request';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
  return {
    signIn: (params) => {
      return request({
        url: 'api/token/login',
        method: 'post',
        params: params,
      });
    },
    signOut: () => {
      return request({
        url: 'api/token/logout',
        method: 'post',
      });
    },
    sendEmailCaptcha: (email) => {
      return request({
        url: `api/sys/email-captcha/${email}`,
        method: 'get',
      });
    },
  };
}
