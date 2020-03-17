const baseURL = 'http://157.122.54.189:9088',
    // 专辑模块
    homeAlbum = `${baseURL}/image/v1/wallpaper/album`,
    // 分类模块
    homeCategory = `${baseURL}/image/v1/vertical/category`,
    // 推荐模块
    homeRecommend = `${baseURL}/image/v3/homepage/vertical`;

// 专辑详情模块
let albumDetail = (id) => `${baseURL}/image/v1/wallpaper/album/${id}/wallpaper`,
    // 评论模块
    imgComment = id => `${baseURL}/image/v2/wallpaper/wallpaper/${id}/comment`,
    categoryImgDetail = id => `${baseURL}/image/v1/vertical/category/${id}/vertical`;

export {
    homeAlbum,
    homeCategory,
    homeRecommend,
    albumDetail,
    imgComment,
    categoryImgDetail
}
