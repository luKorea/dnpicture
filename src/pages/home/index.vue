<!-- TODO Home Page -->
<template>
    <view class="home-page">
        <view class="home-tab">
            <view class="home-tab-title">
                <view class="title-inner">
                    <uni-segmented-control
                            :current="current"
                            :values="segmentItem.map(v => v.title)"
                            @clickItem="onClickItem"
                            style-type="text"
                            active-color="#ffa3c7"/>
                </view>
                <view class="iconfont iconsearch"/>
            </view>
            <view class="home-tab-content">
                <view v-if="current === 0">
                    <home-recommend/>
                </view>
                <view v-if="current === 1">
                    <home-new/>
                </view>
                <view v-if="current === 2">
                    <home-album/>
                </view>
                <view v-if="current === 3">
                    <home-category/>
                </view>
            </view>
        </view>
    </view>
</template>


<script>
    import homeRecommend from './components/home-recommend';
    import homeCategory from './components/home-category';
    import homeNew from './components/home-new';
    import homeAlbum from './components/home-album';

    // TODO 分段器
    import {uniSegmentedControl} from '@dcloudio/uni-ui';

    export default {
        name: "Home",
        data() {
            return {
                segmentItem: [
                    {title: '推荐'},
                    {title: '最新'},
                    {title: '专辑'},
                    {title: '分类'}
                ],
                current: 0
            }
        },
        components: {
            homeRecommend, homeAlbum, homeCategory, homeNew, uniSegmentedControl
        },
        methods: {
            onClickItem(e) {
                this.current !== e.currentIndex ? this.current = e.currentIndex : null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-page {
        .home-tab {
            .home-tab-title {
                position: relative;

                .title-inner {
                    width: 60%;
                    margin: 0 auto;
                }

                .iconsearch {
                    position: absolute;
                    top: 50%;
                    right: 5%;
                    transform: translateY(-50%);
                }
            }

            .home-tab-content {
            }
        }
    }
</style>