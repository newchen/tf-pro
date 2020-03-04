function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  // 支持值为 Object 和 Array
  'POST /api/currentUser': {
    code: 0,
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    }
  },

};
