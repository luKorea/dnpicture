<!-- TODO Album Page  专辑页面-->
<template>
    <scroll-view
            class="album_scroll_view"
            scroll-y
            @scrolltolower="handleToBottom"
    >
        <!-- 轮播图 开始 -->
        <view class="album_swiper">
            <swiper autoplay indicator-dots circular>
                <swiper-item v-for="item in banner" :key="item.id">
                    <image :src="item.thumb" />
                </swiper-item>
            </swiper>
        </view>
        <!-- 轮播图 结束 -->

        <!-- 列表 开始 -->
        <view class="album_list">
            <navigator
                    class="album_item"
                    v-for="item in album"
                    :key="item.id"
                    :url="`/pages/album/index?id=${item.id}`"
            >
                <view class="album_img">
                    <image mode="aspectFill" :src="item.cover" />
                </view>
                <view class="album_info">
                    <view class="album_name">{{item.name}}</view>
                    <view class="album_desc">{{item.desc}}</view>
                    <view class="album_btn">
                        <view class="album_attention">关注</view>
                    </view>
                </view>
            </navigator>
        </view>
        <!-- 列表 结束 -->
    </scroll-view>
</template>


<script>

    import {getAlbum} from '@/api/homeAPI';

    export default {
        name: "Album",
        data() {
          return {
              album: [], // 专辑
              banner: [], // 轮播图
              params: {
                  limit: 30,
                  skip: 0,
                  order: 'new'
              },
              hasMore: true
          }
        },
        mounted() {
            uni.setNavigationBarTitle({title: '专辑'});
            this.getAlbumData();
        },
        methods: {
            getAlbumData() {
                getAlbum(this.params).then(res => {
                    let {res: data} = res;

                    if (this.banner.length === 0) {
                        this.banner = data.banner;
                    }

                    if (data.album.length === 0) {
                        this.hasMore = false;
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none"
                        });
                        return;
                    }

                    this.album = [...this.album, ...data.album];
                    // console.log(this.album);
                })
            },
            handleToBottom() {
                if (this.hasMore) {
                    this.params.skip += this.params.limit;
                    this.getAlbumData();
                } else {
                    uni.showToast({
                        title: '没有更多数据啦',
                        icon: 'none'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .album_scroll_view {
        height: calc(100vh - 36px);
    }
    .album_swiper {
        swiper {
            // 750rpx 326.0869565217392
            // height: calc(750rpx / 2.3 );
            height: 326.1rpx;
            image {
                height: 100%;
            }
        }
    }
    .album_list {
        padding: 10rpx;
        .album_item {
            padding: 10rpx 0;
            display: flex;
            border-bottom: 1rpx solid #ccc;
            .album_img {
                flex: 1;
                padding: 10rpx;
                image {
                    width: 200rpx;
                    height: 200rpx;
                }
            }

            .album_info {
                flex: 2;
                padding: 0 10rpx;
                overflow: hidden;
                .album_name {
                    font-size: 30rpx;
                    color: #000;
                    padding: 10rpx 0;
                }

                .album_desc {
                    padding: 10rpx 0;
                    font-size: 24rpx;

                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .album_btn {
                    padding: 10rpx;
                    display: flex;
                    justify-content: flex-end;
                    .album_attention {
                        color: $color;
                        border: 1rpx solid $color;
                        padding: 10rpx;
                    }
                }
            }
        }
    }
</style>