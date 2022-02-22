<template>
    <div :class='{row:true}'>
        <div :class="{main:true}">
            <slot name="main"></slot>
        </div>
        <slot name="content"></slot>
    </div>
</template>
    
<script>

export default {
    name:'Row',
}
</script>

<style>
.main{
    flex: 70%;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 2px #c9c8c8;
}
</style>