// TODO wx.request promise
export default (params) => {
    uni.showLoading({title: '数据正在请求中'});
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success(res) {
                resolve(res.data);
            },
            fail(error) {
                reject(error);
            },
            complete() {
                uni.hideLoading();
            }
        })
    });
}