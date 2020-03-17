<!--TODO Recommend Page 推荐-->
<template>
<scroll-view
        scroll-y
        v-if="recommendList.length > 0"
        @scrolltolower="handleToBottom"
        class="recommend_view">
        <!-- 推荐 开始 -->
        <view class="recommend_wrap">
            <navigator
                    class="recommend_item"
                    v-for="item in recommendList"
                    :key="item.id"
                    :url="`/pages/album/index?id=${item.target}`"
            >
                <image mode="widthFix" :src="item.thumb"/>
            </navigator>
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
                    <go-detail :list="monthList.items" :index="index">
                        <image mode="aspectFill"
                               :src="item.thumb+item.rule.replace('$<Height>',360)"
                        />
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 月份结束-->

        <!-- 热门 开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view class="hot_item" v-for="(item,index) in hotList" :key="item.id">
                    <go-detail :list="hotList" :index="index">
                        <image mode="widthFix" :src="item.thumb" />
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门 结束 -->
</scroll-view>
</template>


<script>
    import {
        getRecommend
    } from '@/api/homeAPI';
    import goDetail from '@/components/goDetail';


    import moment from 'moment';

    export default {
        name: "Recommend",
        components: {
            goDetail
        },
        data() {
            return {
                // 请求参数
                params: {
                    limit: 30,
                    skip: 0,
                    order: 'hot'
                },
                // 是否还有数据
                hasMore: true,
                recommendList: [], // 推荐列表
                monthList: {},    // 月份列表
                hotList: []      // 热门列表
            }
        },
        mounted() {
            uni.setNavigationBarTitle({title: '推荐'});
            this.getRecommendData();
        },
        methods: {
            // 获取数据
            getRecommendData() {
                getRecommend(this.params).then(res => {
                    let {res: data} = res;

                    // 判断还没有下一页数据
                    if (data.vertical.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none"
                        });
                    };

                    // 优化， 当推荐模块数据已经请求到，不再重复请求
                    if (this.recommendList.length === 0) {
                        // 推荐模块
                        this.recommendList = data.homepage[1].items;
                        // 月份模块
                        this.monthList = data.homepage[2];
                        // TODO 事件格式化 将时间戳 改成  18号/月  moment.js
                        this.monthList.MM = moment(this.monthList.stime).format("MM");
                        this.monthList.DD = moment(this.monthList.stime).format("DD");
                    }
                    // 热门模块
                    this.hotList = [...this.hotList, ...data.vertical];
                })
            },
            // TODO 滚动到底部，重新拉取数据
            handleToBottom(ev) {
                /**
                 * 1. 修改跳过条数 skip += limit;
                 * 2. 重新发送请求
                 * 3. 请求回来成功， hots 数据增加
                 */
                if (this.hasMore) {
                    this.params.skip += this.params.limit;
                    this.getRecommendData();
                } else {
                    uni.showToast({
                        title: '已经没有啦',
                        icon: "none"
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .recommend_view {
        // height：屏幕的高度 -  头部标题的高度
        height: calc(100vh - 36px);
        box-sizing: border-box;
    }

    .recommend_wrap {
        // flex布局
        display: flex;
        flex-wrap: wrap;

        .recommend_item {
            width: 50%;
            border: 5rpx solid #fff;
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
                border-left: 20rpx solid $color;
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