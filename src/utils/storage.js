
import CryptoJS from "crypto-js";


export const setItem = (name, value) => {
  if (typeof value == 'object') {
    value = JSON.stringify(value);
  }
  const val = CryptoJS.AES.encrypt(value, "secret key 123");
  window.sessionStorage.setItem(name, val);
}

export const getItem = name => {
  const value = window.sessionStorage.getItem(name);
  if (value == null) return ''
  const bytes = CryptoJS.AES.decrypt(
    value,
    "secret key 123"
  ).toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(bytes)
  } catch (err) {
    return bytes;
  }
}

export const removeItem = name => {
  window.sessionStorage.removeItem(name)
}

export const setCookie = (mobile, code, exdays) => {
  // 加密参考资料 https://devnote.pro/posts/10000051981222
  const pwdCode = CryptoJS.AES.encrypt(code, "secret key 123");
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie =
    "mobile=" + mobile + ";path='/';expires=" + d.toGMTString();
  document.cookie =
    "code=" + pwdCode + ";path='/';expires=" + d.toGMTString();
}

export const getCookie = (loginForm) => {
  // 记住密码功能，把用户名+密码保存在cookie，刷新页面时能自动加载进来
  // 尽管没有手动写入用户名+密码，但是在created钩子里，已经帮我们加载进来了
  if (document.cookie.length > 0) {
    var arr = document.cookie.split(";");
    arr.forEach((val) => {
      var arr1 = val.trim().split("=");
      if (arr1[0] == "mobile") {
        loginForm.mobile = arr1[1];
      } else if (arr1[0] == "code") {
        var bytes = CryptoJS.AES.decrypt(
          arr1[1],
          "secret key 123"
        ).toString(CryptoJS.enc.Utf8);
        loginForm.code = bytes;
      }
    });
  }
}


export const removeCookie = () => {
  this.setCookie("", "", -1); // 把过期时间改了就行
}
