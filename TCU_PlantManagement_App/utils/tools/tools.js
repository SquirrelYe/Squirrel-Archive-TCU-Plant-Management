module.exports = {
  // toast
  toast: {
    success(msg) {
      return wx.showToast({ title: msg, icon: "success" });
    },
    loading(msg) {
      return wx.showToast({ title: msg, icon: "loading" });
    },
    none(msg) {
      return wx.showToast({ title: msg, icon: "none" });
    },
    hide() {
      return wx.hideToast();
    },
  },

  // loading
  loading: {
    show(msg) {
      return wx.showLoading({ title: msg, mask: true });
    },
    hide() {
      return wx.hideLoading();
    },
  },
};
