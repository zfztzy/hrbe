<template>
    <div class="swiperItem">
        <div class="swiperItemPicture">
            <slot name="img"></slot>
        </div>
        <div class="swiperItemText">
            <div class="type">
                <slot name="type" class="type"></slot>
            </div>
            <div class="title">
                <slot name="title" class="title"></slot>
            </div>
            <div class="date">
                <slot name="date" class="date"></slot>
            </div>
            <div class="text">
                <slot name="text" class="text"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'SwiperItem'
}
</script>

<style>
.swiperItem {
    margin-left: 25px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;    
    background: #fff;

}

.swiperItemPicture img{
    width: 381px;;
    height: 255px;
    border: 0;
    vertical-align: middle;
}         

.swiperItem .swiperItemText{
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    width: 316px;;
    margin-bottom: 35px;
    padding: 32px;

}

.swiperItem .type p{
    font-size: 18px;
    font-weight: 400;
    color: #2d5fde;
    line-height: 27px;
    height: 27px;
    margin-bottom: 22px;
    font-weight: 700;
}

.swiperItem .title p{
    font-size: 22px;
    font-weight: 700;
    color: #333;
    line-height: 40px;
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -ms-line-clamp: 2;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
    margin-bottom: 13px;
}



.swiperItem .date p{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}


.swiperItem .text p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 90px;
    line-height: 2;
    line-clamp: 3;
    -ms-line-clamp: 3;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
}
</style>