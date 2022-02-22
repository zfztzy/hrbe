<template>
    <div class='left'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'Left',
    data(){
        return{
        }
    },
}
</script>

<style>
.left{
    width: 170px;
    float: left;
    margin-left: 3%;
    position: sticky;
    top:55px;
}
</style>