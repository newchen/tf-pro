// 是否在开发环境下, 开发环境下才开启某些特性
export const isAntDesignDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return false
};

