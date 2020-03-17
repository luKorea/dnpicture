<template>
    <view>
        <!-- 用户信息 开始 -->
        <view class="user_info">
            <view class="user_icon">
                <image :src="imgDetail.user.avatar" mode="widthFix"/>
            </view>
            <view class="user_desc">
                <view class="user_name">{{imgDetail.user.name}}</view>
                <view class="user_time">{{imgDetail.cnTime}}</view>
            </view>
        </view>
        <!-- 用户信息 结束 -->

        <!-- 高清大图 开始 -->
        <view class="high_img">
            <swiper-action @swiperAction="handleSwiperAction">
                <image mode="widthFix" :src="imgDetail.thumb"/>
            </swiper-action>
        </view>
        <!-- 高清大图 结束 -->

        <!-- 点赞 开始 -->
        <view class="user_rank">
            <view class="rank">
                <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
            </view>
            <view class="user_collect">
                <text class="iconfont iconshoucang">收藏</text>
            </view>
        </view>
        <!-- 点赞 结束 -->

        <!-- 专辑 开始 -->
        <view class="album_wrap" v-if="album.length">
            <!-- 标题 -->
            <view class="album_title">相关</view>
            <!-- 内容 -->
            <view class="album_list">
                <view class="album_item" v-for="item in album" :key="item.id">
                    <view class="album_cover">
                        <image :src="item.cover" mode="aspectFill"/>
                    </view>
                    <!-- 右边 -->
                    <view class="album_info">
                        <view class="album_info_text">专辑</view>
                        <view class="album_name">{{item.name}}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 专辑 结束 -->

        <!-- 最热评论 comment hot -->
        <view class="comment hot" v-if="hot.length">
            <view class="comment_title">
                <text class="iconfont iconhot1"></text>
                <text class="comment_text">最热评论</text>
            </view>
            <view class="comment_list">
                <view class="comment_item" v-for="item in hot" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon">
                            <image mode="widthFix" :src="item.user.avatar"/>
                        </view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{item.user.name}}</view>
                            <view class="user_time">{{item.cnTime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image v-for=" item2 in  item.user.title" :key="item2.icon" :src="item2.icon"/>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{item.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 最新评论 comment new -->
        <view class="comment new" v-if="comment.length">
            <view class="comment_title">
                <text class="iconfont iconpinglun"></text>
                <text class="comment_text">最新评论</text>
            </view>
            <view class="comment_list">
                <view class="comment_item" v-for="item in comment" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon">
                            <image mode="widthFix" :src="item.user.avatar"/>
                        </view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{item.user.name}}</view>
                            <view class="user_time">{{item.cnTime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image v-for=" item2 in  item.user.title" :key="item2.icon" :src="item2.icon"/>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{item.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 下载 开始 -->
        <view class="download">
            <view
                    class="download_btn"
                    @click="handleDownload"
            >下载图片</view>
        </view>
        <!-- 下载 结束 -->

    </view>
</template>

<script>
    import {getComment} from '@/api/imgAPI';
    import swiperAction from "@/components/swiperAction";
    import moment from "moment";
    // 设置语言为中文
    moment.locale("zh-cn");
    export default {
        name: "ImgDetail",
        components: {
          swiperAction
        },
        data() {
            return {
                imgDetail: {},
                // 专辑
                album: [],
                // 评论
                comment: [],
                // 热门评论
                hot: [],
                // 图片索引
                imgIndex: 0
            }
        },
        onLoad() {
            const {imgIndex} = getApp().globalData;
            this.imgIndex = imgIndex;
            this.getData();
        },
        methods: {
            getData() {
                const {imgList} = getApp().globalData;
                this.imgDetail = imgList[this.imgIndex];
                this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
                this.getCommentData(this.imgDetail.id);
            },
            async getCommentData(id) {
                let {res: {comment, hot, album}} = await getComment(id);
                this.comment = comment;
                comment.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow());
                this.hot = hot;
                hot.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow());
                this.album = album;
            },
            // TODO 用户滑动屏幕处理
            handleSwiperAction(ev) {
                const {imgList} = getApp().globalData;
                let {direction} = ev;
                /**
                 * 1. 用户左滑 imgIndex++
                 * 2. 用户右滑 imgIndex--
                 * 3. 判断数组是否越界
                 * 4. 左滑: ev.direction === 'left' && this.imgIndex.length<imgList.length - 1
                 * 5. 右滑: ev.direction === 'right' && this.imgIndex > 0
                 */
                if (direction === 'left' && this.imgIndex < imgList.length - 1) {
                    // 加载下一页
                    this.imgIndex++;
                    this.getData();
                } else if(direction === 'right' && this.imgIndex > 0) {
                    // 加载上一页
                    this.imgIndex--;
                    this.getData();
                } else {
                    uni.showToast({
                        title: '没有更多数据了',
                        icon: 'none'
                    })
                }
            },
            // TODO 图片下载
            async handleDownload() {
                await uni.showLoading({title: '下载中'});
                // 1. 将远程图片下载到小程序中
                let result = await uni.downloadFile({url: this.imgDetail.img}),
                    {tempFilePath} = result[1];
                // 2. 将小程序内存中的图片保存到本地中
                let res = await  uni.saveImageToPhotosAlbum({filePath: tempFilePath});
                // console.log(res);
                uni.hideLoading();
                uni.showToast({title: '图片下载成功'});
            }
        },
    }
</script>

<style lang="scss" scoped>
    .user_info {
        display: flex;
        padding: 20rpx;
        .user_icon {
            padding: 0 20rpx;
            image {
                width: 88rpx;
                border-radius: 50%;
            }
        }

        .user_desc {
            .user_name {
                color: #000;
                font-weight: 600;
            }

            .user_time {
                color: #ccc;
                font-size: 24rpx;
                padding: 10rpx 0;
            }
        }
    }
    .user_rank {
        display: flex;
        height: 80rpx;
        border-bottom: 5rpx solid #eee;
        .rank {
            display: flex;
            justify-content: center;
            align-items: center;

            flex: 1;
            .iconfont {
            }
        }

        .user_collect {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont {
            }
        }
    }

    .high_img {
        image {
            border-bottom: 1rpx solid #eee;
        }
    }

    // 专辑
    .album_wrap {
        padding: 20rpx;
        .album_title {
            padding: 10rpx 0;
        }

        .album_list {
            .album_item {
                display: flex;
                padding: 10rpx 0;
                border-bottom: 10rpx solid #eee;
                .album_cover {
                    flex: 1;
                    image {
                        width: 180rpx;
                        height: 180rpx;
                    }
                }

                .album_info {
                    flex: 3;
                    padding-left: 20rpx;
                    position: relative;
                    .album_info_text {
                        width: 100rpx;
                        height: 50rpx;
                        background-color: $color;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .album_name {
                        padding: 10rpx 0;
                        color: #888;
                    }
                    .iconfont {
                        font-size: 40rpx;
                        position: absolute;
                        top: 50%;
                        // css3 变换 转换
                        transform: translateY(-50%);
                        right: 10%;
                        color: #000;
                    }
                }
            }
        }
    }

    // 最热评论
    .comment {
        .comment_title {
            padding: 15rpx;
            .iconfont {
                color: red;
                font-size: 40rpx;
            }

            .comment_text {
                font-weight: 600;
                font-size: 28rpx;
                color: #666;
                margin-left: 10rpx;
            }
        }

        .comment_list {
            .comment_item {
                border-bottom: 15rpx solid #eee;
                // 用户信息
                .comment_user {
                    display: flex;
                    padding: 20rpx 0;
                    .user_icon {
                        width: 15%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        image {
                            width: 90%;
                        }
                    }

                    .user_name {
                        flex: 1;
                        .user_nickname {
                            color: #777;
                        }

                        .user_time {
                            color: #ccc;
                            font-size: 24rpx;
                            padding: 5rpx;
                        }
                    }

                    .user_badge {
                        image {
                            width: 40rpx;
                            height: 40rpx;
                            display: inline-block;
                        }
                    }
                }
                // 评论数据
                .comment_desc {
                    display: flex;
                    padding: 30rpx 0;
                    .comment_content {
                        flex: 1;
                        padding-left: 15%;
                        color: #000;
                    }

                    .comment_like {
                        text-align: right;
                        .icondianzan {
                        }
                    }
                }
            }
        }
    }

    // 最新评论
    .new {
        .iconpinglun {
            color: aqua !important;
        }
    }

    // 下载
    .download {
        height: 120rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .download_btn {
            width: 90%;
            height: 80%;
            background-color: $color;
            color: #fff;
            font-size: 40rpx;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>