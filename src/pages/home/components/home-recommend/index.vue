<!--TODO Recommend Page 推荐-->
<template>
    <view>
        <!-- 推荐 开始 -->
        <view class="recommend_wrap">
            <view class="recommend_item" v-for="item in recommendList" :key="item.id">
                <image mode="widthFix" :src="item.thumb"/>
            </view>
        </view>
        <!-- 推荐 结束 -->

        <!-- 月份开始-->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text> {{monthList.DD}}/</text>
                        {{monthList.MM}} 月
                    </view>
                    <view class="months_text"> {{monthList.title}}</view>
                </view>
                <view class="months_title_more">更多 ></view>
            </view>
            <view class="months_content">
                <view class="months_item" v-for="(item,index) in monthList.items" :key="item.id">
                    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)" />
                </view>
            </view>
        </view>
        <!-- 月份结束-->
    </view>
</template>


<script>
    import {
        getRecommend
    } from '@/api/homeAPI';

    import moment from 'moment';

    export default {
        name: "Recommend",
        data() {
            return {
                // 请求参数
                params: {
                    limit: 30,
                    skip: 0,
                    order: 'hot'
                },
                recommendList: [], // 推荐列表
                monthList: {},    // 月份列表
                hotList: []      // 热门列表
            }
        },
        mounted() {
            getRecommend().then(res => {
                let {res: data} = res;
                this.recommendList = data.homepage[1].items;
                this.monthList = data.homepage[2];
                // 将时间戳 改成  18号/月  moment.js
                this.monthList.MM = moment(this.monthList.stime).format("MM");
                this.monthList.DD = moment(this.monthList.stime).format("DD");
                this.hotList = data.vertical;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .recommend_view {
        // height：屏幕的高度 -  头部标题的高度
        height: calc(100vh - 36px);
    }

    .recommend_wrap {
        // flex布局
        display: flex;
        flex-wrap: wrap;
        .recommend_item {
            width: 50%;
            border: 5 rpx solid #fff;
        }
    }
     .months_wrap {
         .months_title {
             display: flex;
             justify-content: space-between;
             padding: 20rpx;

             .months_title_info {
                 color: $color;
                 font-size: 30rpx;
                 font-weight: 600;
                 display: flex;

                 .months_info {
                     text {
                         font-size: 36rpx;
                     }
                 }

                 .months_text {
                     font-size: 34rpx;
                     color: #666;
                     margin-left: 30rpx;
                 }
             }

             .months_title_more {
                 font-size: 24rpx;
                 color: $color;
             }
         }

         .months_content {
             display: flex;
             flex-wrap: wrap;

             .months_item {
                 width: 33.33%;
                 border: 5rpx solid #fff;
             }
         }
     }
     .hots_wrap {
         .hots_title {
             padding: 20rpx;

             text {
                 border-left: 20 rpx solid $color;
                 padding-left: 20rpx;
                 font-size: 34rpx;
                 font-weight: 600;
             }
         }

         .hots_content {
             display: flex;
             flex-wrap: wrap;

             .hot_item {
                 width: 33.33%;
                 border: 5rpx solid #fff;
             }
         }
     }
</style>