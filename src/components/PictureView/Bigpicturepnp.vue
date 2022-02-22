<template>
        <div class="pageWidth">
            <div class="pageMid">
                <Bigpicmid/>
                <Bigpicbot/>
        </div>
    </div>
</template>

<script>
import Bigpicbot from './Bigpicbot.vue'
import Bigpicmid from './Bigpicmid.vue'
export default {
    components: { Bigpicmid,Bigpicbot },
}
</script>

<style>
.pageWidth{
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
}
.pageMid{
  margin-top: 85px;
}
.bigPicture{
  padding-left: -25px;
  padding-right: -25px;
  box-sizing: border-box;
  position: relative;
}
.bigPictureBox{
    padding-left: 25px;
    padding-right: 50px;
    /* width: 560px; */
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.bigPictureBox2{
    float: left;
    height: 729px;
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
}

.bpl{
  background-image: url(../../assets/pbg/pbgl.png);
  color: #fff;
  height: 540px;
  width: 540px;
  background-size: 100%;
  padding-top: 189px;
  padding-left: 70px;
  padding-right: 168px;
  box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
}

.bpl h4{
    font-size: 24px;
    color: #fff;
    font-weight: 700;
    height: 24px;
    line-height: 24px;
    margin-bottom: 22px;
}

.bpl .time{
    text-align: justify;
    line-height: 40px;
    height: 80px;
    margin-bottom: 64px;
    margin-bottom: 15px;
}

.bpl .paragraph{
    font-size: 16px;
    text-align: justify;
    line-height: 32px;
    height: 96px;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.bpl .title{
    text-align: justify;
    font-size: 36px;
    font-weight: 700;
    line-height: 46px;
    margin-bottom: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-line-clamp: 2;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
    border-collapse: collapse;
    border-spacing: 0;
}

.bpr{
    border: 0;
    vertical-align: middle;
    height: 354px;
    width: 366px;
}

.down{
    padding: 65px 30px 0;
    width: 306px;
}
.down .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.down .theme{
    font-size: 22px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0;
    line-height: 40px;
    margin-bottom: 13px;
    height: 80px;
    display: -ms-flexbox;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.down .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}

.down .text{
    font-size: 16px;
    color: #333;
    letter-spacing: 0;
    line-height: 32px;
    height: 96px;
    display: -ms-flexbox;
    -ms-line-clamp: 3;
    line-clamp: 3;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
}

.bot{
    margin-top: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    top: 50px;
    left: 40px;

}

.botLeft{
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    width: 740px;
}

.botPicture{
    
    padding-left: 25px;
    padding-right: 25px;
    width: 778px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}


.botLeftPicture{
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 353px;
    height: 410px;
    position: relative;
    right: 40px;
    /* display: inline-block; */
}


.botLeftText{
    display: inline-block;
    vertical-align: top;
    height: 410px;
    width: 50%;
}

.botLeftText .box{
    padding: 80px 40px 0 0;
}

.botLeftText .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.botLeftText .theme{
    font-size: 22px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0;
    line-height: 40px;
    margin-bottom: 13px;
    height: 80px;
    display: -ms-flexbox;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}


.botLeftText .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}


.botLeftText .text{
    font-size: 16px;
    color: #333;
    letter-spacing: 0;
    line-height: 32px;
    height: 96px;
    display: -ms-flexbox;
    -ms-line-clamp: 3;
    line-clamp: 3;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
}

.botR{
    position: relative;
    left: 35px;
    padding-left: 25px; 
    padding-right: 25px;
    width: 366px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    height: 410px;
}

.botR .box{
    padding: 80px 40px 0 0;
    padding-left: 25px;
    padding-right: 25px;
}


.botR .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.botR .theme{
    font-size: 22px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0;
    line-height: 40px;
    margin-bottom: 13px;
    height: 80px;
    display: -ms-flexbox;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}


.botR .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}


.botR .text{
    font-size: 16px;
    color: #333;
    letter-spacing: 0;
    line-height: 32px;
    height: 96px;
    display: -ms-flexbox;
    -ms-line-clamp: 3;
    line-clamp: 3;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
}
</style>