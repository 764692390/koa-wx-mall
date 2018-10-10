import Sequelize from 'sequelize';

/**
 * return object 定义返回格式
 * errno
 * errmsg
 * data
 */
const errmsg = {
  1030:{
    errno: 1030, errmsg: false, message: '系统开小差了，未查到当前商品id!'   //  api/v1/shop/Detail/1262  【商品id不存在】
  }
}

const res = data => {
  let info = {
    "errno":"0",
    "errmsg":"success",
  };
  if (data && !data.data.code) {
    info.data = data.data;
  }else {
    info = errmsg[data.data.code];
  }
  return info;
};

const err = error => {
  if (error instanceof Sequelize.ValidationError) {
    return { errno: 1003, errmsg: error.errors[0].message };
  } else {
    return { errno: 1004, errmsg: error.message };
  }
};

export { res, err };
