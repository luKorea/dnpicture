import request from '../utils/request';
import {
    homeAlbum,
    homeCategory,
    homeRecommend
} from '../utils/requestURL';

// 专辑 API
let getAlbum = async _ => await request({url: homeAlbum});

// 分类 API
let getCategory = async _ => await request({url: homeCategory});

// 推荐 API

/**
 * @method getRecommend
 * @param limit	{Number}	获取多少条数据
 * @param order	{String}	关键字 “hot”
 * @param skip	{Number}	跳过多少条
 */
let getRecommend = async ({limit= 30, order= 'hot', skip= 0} = {}) => {
    return await request({
        url: homeRecommend,
        data: {
            limit,
            order,
            skip
        }
    });
};


export {
    getAlbum,
    getRecommend,
    getCategory
}