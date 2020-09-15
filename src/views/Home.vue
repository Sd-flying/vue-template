<!--巡视查询统计-->
<template>
  <div class="statistics">
    <div class="tabs_selfs">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="布局一" name="tab1Page"></el-tab-pane>
        <el-tab-pane label="布局二" name="tab2Page"></el-tab-pane>
        <el-tab-pane label="布局三" name="tab3Page"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="danger_panel" v-if="activeName==='tab1Page'">
      <tab1Page ref="tab1Page"></tab1Page>
    </div>
    <div class="danger_panel" v-if="activeName==='tab2Page'">
      <tab2Page ref="tab2Page"></tab2Page>
    </div>
    <div class="danger_panel" v-if="activeName==='tab3Page'">
      <tab3Page ref="tab3Page"></tab3Page>
    </div>
  </div>
</template>

<script>
  import tab1Page from './dashboard/tab1Page'
  import tab2Page from './dashboard/tab2Page'
  import tab3Page from './dashboard/tab3Page'

  export default {
    name: "home",
    components: {tab1Page, tab2Page,tab3Page},
    data() {
      return {
        activeName: "tab1Page"
      };
    },
    methods: {
      //选项卡切换点击事件
      handleClick(tab, event) {
        this.activeName = tab.name;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/el-tabs.scss";

  .statistics {
    width: 100%;
    height: 100%;
    /*background-color: #ffffff;*/
    /*padding: 10px 10px;*/
    border-radius: 5px;
    box-sizing: border-box;
    overflow: auto;
  }
  .tabs_selfs {
    background: #fff;
    height: 54px;
    border-radius: 5px;
    display: flex;

    /deep/ .el-tabs__header {
      background-color: #fff;
      margin-left: 20px;
    }
    .el-tabs {
      width: 100%;
    }

  }

</style>
