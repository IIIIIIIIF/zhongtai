<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <span
      v-for="(item,index) in list"
      @click.stop="handleItemClick"
      :data-index="index"
      :class="itemClass({active:item.active})"
    >
      {{item.title}}
      <span
        class="el-icon-close"
        @click.stop="handleRemoveItem"
      ></span>
    </span>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        list: [
          {
            title: "首页",
            active: true,
            path:'/dashboard'
          },
        ]
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        if (this.$route.path.indexOf('/center') === 0) {
          this.list=[{
            title:"个人中心",
            active:true,
            path:'/center'
          }];
        }else{
          this.list=[{
            title: "首页",
            active: true,
            path:'/dashboard'
          }];
        }
      },
      itemClass({active}) {
        let classes=`tags-view-item `;
        if(active){
          classes+=`active `;
        }
        return classes;
      },
      // TODO 点击tab方块则进入点击页面
      handleItemClick($event) {
        if(this.list[$event.target.getAttribute("data-index")].active===false){
          //打开当前选中页面
          this.$router.push({
            path:this.list[$event.target.getAttribute("data-index")].path,
            query:this.list[$event.target.getAttribute("data-index")].query
          });
        }
      },
      // TODO 点击tab上的x则关闭当前页面并且打开前一页面
      handleRemoveItem($event){
        let ele=$event.target;
        if(ele.parentNode.previousSibling&&ele.parentNode.previousSibling.getAttribute("data-index")!==0){
          this.removeList(ele.parentNode.getAttribute("data-index"));
          this.$router.push({
            path:this.list[ele.parentNode.previousSibling.getAttribute('data-index')].path,
            query:this.list[ele.parentNode.previousSibling.getAttribute('data-index')].query
          });
        }else if(ele.parentNode.nextSibling){
          this.removeList(ele.parentNode.getAttribute("data-index"));
          this.$router.push({
            path:this.list[ele.parentNode.nextSibling.getAttribute('data-index')].path,
            query:this.list[ele.parentNode.previousSibling.getAttribute('data-index')].query
          });
        }
      },
      /**
       * 从数组中删除某个元素
       * @param index 需要删除的元素的下标
       */
      removeList(index){
        this.list.splice(this.list.findIndex(item=>this.list[index]===item),1);
      }
    },
    watch:{
      $route(to,form){
        if (form.path.indexOf('/center')!==0&&this.$route.path.indexOf('/center') === 0) {
          this.init();
        }
        let title=to.meta.title;
        let path=to.path;

        // TODO: 取消所有选中状态
        this.list.forEach(item=>{item.active=false;});
        if(this.list.findIndex(item=>item.path===path)===-1){
          // TODO: 给新增的默认选中
          this.list.push({title, active:true, path,query:{...to.query}})
        }else{
          // TODO: 选中当前元素
          this.list[this.list.findIndex(item=>item.path===path)].active=true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background-color: #ffffff;
    padding: 0 8px;
    margin-left: 5px;
    margin-top: 4px;
    user-select: none;


    .el-icon-close{
      display: none;
    }

    &.active {
      background-color: #42b983;
      color: #ffffff;
      border-color: #42b983;

      &:before {
        content: '';
        background-color: #ffffff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }

      .el-icon-close {
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        transition: all .3s;
        transform-origin: 50% 50%;

        &:hover {
          transform: rotate(180deg);
        }
      }
    }
    &:first-of-type {
      margin-left: 15px;
      &.active{
        padding-right: 10px;
        .el-icon-close{
          display: none;
        }
      }
    }
  }
</style>
