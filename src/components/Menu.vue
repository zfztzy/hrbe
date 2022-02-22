<template>
    <div class="menu">
        <label>
            <table class="fgtable">
                <thead>
                    <th class="fgth" @click='hrManageTable'>这里</th>
                    <th class="fgth" @click='diary'>是一</th>
                    <th class="fgth" @click='study'>个自</th>
                    <th class="fgth" @click='clockIn'>定义</th>
                    <th class="fgth" @click='qa'>头部</th>
                    <th class="fgth" @click='difficulty'>菜单</th>
                </thead>
            </table>
        </label>
    </div>
</template>

<script>
export default {
    name:'Menu',
    methods:{
        hrManageTable(){this.$router.push('/hrManageTable')},
        diary(){this.$router.push('/diary')},
        study(){this.$router.push('/study')},
        clockIn(){this.$router.push('/clockIn')},
        qa(){this.$router.push('/qa')},
        difficulty(){this.$router.push('/difficulty')},
    }
}
</script>

<style>
.menu {
    height: 40px;
    width: 24%;
    position: absolute;
    /* float: left; */
    z-index: 1  !important; 
    justify-content: center;
    align-items: center;
    color: #fff;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    line-height: 32px;
    white-space: nowrap;
    margin-right: 50%;
    margin-top: 10px;
    /* display: flex; */
}

.menu ul {
    list-style:none;
    display:inline
}

.fgtable {
    margin-left: 15px;
    border-collapse: collapse;
    border-spacing: 0;
}

.fgth:hover{   
    padding: 8px 10px;
    text-align: center;
    transform: scale(1.5);
}

.fgth {
    font-weight: 600;
    min-width: 50px;
}   
</style>