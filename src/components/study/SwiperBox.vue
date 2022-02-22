<template>
    <div class="swiperBox">
        <div class="swiper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.swiperBox{
    display: flex;
    align-items:center;
    justify-content:center;
}

.swiper{
    position: relative;
    width: 1290px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform,-webkit-transform;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    margin-left: 50px;
    overflow: hidden;
    list-style: none;
    margin-bottom: 25px;
    padding: 0;
    z-index: 0;
}
</style>