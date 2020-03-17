import request from '../utils/request';
export let getVideo = async ({url, data}) => {
    console.log(url, data);
    return await request({
        url,
        data
    })
};