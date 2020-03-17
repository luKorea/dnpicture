import {imgComment, categoryImgDetail} from '../utils/requestURL';
import request from '../utils/request';


export let getComment = async (id) => await request({url: imgComment(id)});
/**
 * @description 分类详情
 * @param limit    {Number}    获取多少条数据
 * @param order    {String}    关键字 “new”
 * @param skip    {Number}    跳过多少条
 * @param id {Number}
 */
export let getCategoryDetail = async (
    {limit = 30, order = 'new', skip = 0, id} = {}) => {
    return await request({
        url: categoryImgDetail(id),
        data: {limit, order, skip}
    });
};