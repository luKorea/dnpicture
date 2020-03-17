<template>
    <view>
        <!-- 专辑背景 开始 -->
        <view class="album_bg">
            <image mode="widthFix" :src="album.cover"/>
            <view class="album_info">
                <view class="album_name">{{album.name}}</view>
                <view class="album_btn">关注专辑</view>
            </view>
        </view>
        <!-- 专辑背景 结束 -->

        <!-- 专辑作者 开始 -->
        <view class="album_author">
            <view class="album_author_info">
                <image mode="widthFix" :src="album.user.avatar"/>
                <view class="author_name">{{album.user.name}}</view>
            </view>
            <view class="album_author_desc">
                <!-- text 使用 b站  -->
                <text>{{album.desc}}</text>
            </view>
        </view>
        <!-- 专辑作者 结束 -->

        <!-- 列表 开始 -->
        <view class="album_list">
            <view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
                <go-detail :list='wallpaper' :index="index">
                    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"/>
                </go-detail>
            </view>
        </view>
        <!-- 列表 结束 -->
    </view>
</template>

<script>
    import {getAlbumDetail} from '@/api/homeAPI';
    import goDetail from "@/components/goDetail";
    export default {
        name: "Album",
        components: {
          goDetail
        },
        data() {
            return {
                params: {
                    limit: 30,
                    order: 'new',
                    skip: 0,
                    first: 1
                },
                id: -1,
                wallpaper: [],
                album: {},
                hasMore: true
            }
        },
        onLoad({id}) {
            this.id = id;
            this.getAlbumData(this.id);
        },
        // 页面触底 上拉加载下一页事件
        onReachBottom() {
            // console.log("我也是有底线的");
            if (this.hasMore) {
                this.params.first = 0;
                this.params.skip += this.params.limit;
                this.getAlbumData(this.id);
            } else {
                uni.showToast({
                    title: "没有更多数据了",
                    icon: "none"
                });
            }
        },
        methods: {
            getAlbumData(id) {
                getAlbumDetail({...this.params, id}).then(res => {
                    console.log(res);
                    let {res: data} = res;
                    // TODO
                    if (Object.keys(this.album).length === 0) {
                        this.album = data.album;
                        uni.setNavigationBarTitle({title: this.album.name});
                    }
                    if (data.wallpaper.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none"
                        });
                        return;
                    }
                    this.wallpaper = [...this.wallpaper, ...data.wallpaper];
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .album_bg {
        position: relative;
        .album_info {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            height: 80rpx;
            align-items: center;
            color: #fff;
            padding: 0 15rpx;
            .album_name {
                font-size: 40rpx;
            }

            .album_btn {
                background-color: $color;
                width: 152rpx;
                height: 60rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10rpx;
            }
        }
    }
    .album_author {
        padding: 10rpx;
        .album_author_info {
            padding: 10rpx 0;
            display: flex;
            image {
                width: 50rpx;
            }

            .author_name {
                color: #000;
                text-indent: 2em !important;
                margin-left: 15rpx;
            }
        }
    }
    .album_list {
        display: flex;
        flex-wrap: wrap;
        .album_item {
            width: 33.33%;
            border: 3rpx solid #fff;
            image {
                height: 160rpx;
            }
        }
    }
</style>