<!-- TODO Category Page 分类-->
<template>
    <view class="home_category">
        <navigator
                class="cate_item"
                v-for="item in category"
                :key="item.id"
                :url="`/pages/imgCategory/index?id=${item.id}`"
        >
            <image mode="aspectFill" :src="item.cover"/>
            <view class="cate_name">{{item.name}}</view>
        </navigator>
    </view>
</template>

<script>
    import {getCategory} from '@/api/homeAPI';
    export default {
        name: "Category",
        data() {
            return {
                category: []
            }
        },
        mounted() {
            uni.setNavigationBarTitle({title: '分类'});
            this.getCategoryData();
        },
        methods: {
            async getCategoryData() {
                let {res: {category}} = await getCategory();
                this.category = category;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home_category {
        display: flex;
        flex-wrap: wrap;
        .cate_item {
            width: 33.33%;
            position: relative;
            border: 5rpx solid #fff;
            image {
                height: 240rpx;
            }

            .cate_name {
                position: absolute;
                width: 100%;
                height: 50rpx;
                left: 0;
                bottom: 0;
                color: #fff;
                // css3 渐变
                background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
                font-size: 40rpx;
                display: flex;
                align-items: center;
                padding-left: 20rpx;
            }
        }
    }
</style>