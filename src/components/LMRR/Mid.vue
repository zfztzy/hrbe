<template>
    <div class='mid'>
        <slot>
            <div class="card1 loading">
                <div class="content">
                </div>
            </div>
            <div class="card2 loading">
                <div class="content">
                </div>
            </div>
            <div class="card3 loading">
                <div class="content">
                </div>
            </div>
            <div class="card4 loading">
                <div class="content">
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name:'Mid',
}
</script>

<style>
.mid{
    float: none;
    /* background-color: black; */
    margin-left: 20%;
    margin-right: 17%;
    margin-top: 3%;
    width: 485px;
    min-height: 400px;
    letter-spacing:0.1px;
    line-height: 30px;
}
/* .mid p{
    text-indent: 2em;
} */
.mid a{
    color:  rgb(49, 49, 175);
}
.mid a:hover{
    color: crimson;
}


:root {
  --loading-grey: #ededed;
}

.card1 {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
  width: 200px;
  height: 40px;
  margin-bottom: 60px;
}


.card2 {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
  width: 600px;
  height: 20px;
  margin-bottom: 30px;
}

.card3 {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
  width: 600px;
  height: 20px;
  margin-bottom: 30px;
}

.card4 {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
  width: 600px;
  height: 20px;
  margin-bottom: 30px;
}

.content {
  padding: 2rem 1.8rem;
}

.content{
  background-color: var(--loading-grey);
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, .5) 50%,
    rgba(255, 255, 255, 0) 60%
  ) var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}


</style>