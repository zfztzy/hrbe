<template>
    <div class="right">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'Right',
    data(){
        return{

        }
    },
}
</script>

<style>
.right{
    z-index: 2;
    width: 100px;
    float: right;
    position: sticky;
    top:170px;
    margin-top: 4%;
    margin-right: 3%;
}
</style>