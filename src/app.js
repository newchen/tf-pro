
import dynamicNS from '@/utils/dynamicNS'

export const dva = {
  config: {
    onError(e) {
      console.error('onError', e.message);
    },

    onAction: dynamicNS() // 中间件
  },
};
