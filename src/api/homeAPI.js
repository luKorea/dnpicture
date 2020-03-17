import request from '../utils/request';
import {
    homeAlbum,
    homeCategory,
    homeRecommend,
    albumDetail
} from '../utils/requestURL';

/**
 * @description 专辑 API
 * @method getAbum
 * @param limit    {Number}    获取多少条数据
 * @param order    {String}    关键字 “new”
 * @param skip    {Number}    跳过多少条
 */
let getAlbum = async ({limit = 10, order = 'new', skip = 0} = {}) => {
    return await request({
        url: homeAlbum,
        data: {limit, order, skip}
    });
};

/**
 * @description 专辑详情
 * @param limit    {Number}    获取多少条数据
 * @param order    {String}    关键字 “new”
 * @param skip    {Number}    跳过多少条
 * @param first    {Number}    “1” 表示第一次请求 “0”表示不是第一次请求
 * @param id {Number}
 */

let getAlbumDetail = async ({
                                limit = 30, order = 'new',
                                skip = 0, first = 1, id
                            } = {}) => {
    return await request({
        url: albumDetail(id),
        data: {
            limit, skip, order, first
        }
    })
};

// 分类 API
let getCategory = async _ => await request({url: homeCategory});


/**
 * @description 推荐 API
 * @method getRecommend
 * @param limit    {Number}    获取多少条数据
 * @param order    {String}    关键字 “hot”
 * @param skip    {Number}    跳过多少条
 */

let getRecommend = async ({limit = 30, order = 'hot', skip = 0} = {}) => {
    return await request({
        url: homeRecommend,
        data: {limit, order, skip}
    });
};

export {
    getAlbum,
    getRecommend,
    getCategory,
    getAlbumDetail
}
