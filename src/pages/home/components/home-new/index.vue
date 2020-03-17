<!-- TODO New Page 最新-->
<template>
    <view>
        <text>最新</text>
    </view>
</template>


<script>
    export default {
        name: "New",
        mounted() {
            uni.setNavigationBarTitle({title: '最新'})
        }
    }
</script>

<style scoped>

</style>