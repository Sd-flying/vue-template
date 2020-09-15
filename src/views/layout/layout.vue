<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <my-header></my-header>
      <div class="right-content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import sidebar from "./sidebar/";
import MyHeader from "./header/";
import { mapGetters } from "vuex";

export default {
  components: { sidebar, MyHeader },
  computed: {
    ...mapGetters(["getsidebar"]),
    classObj() {
      return {
        hideSidebar: !this.getsidebar.opened,
        openSidebar: this.getsidebar.opened
      };
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .right-content {
    position: absolute;
    top: 60px;
    width: 98.4%;
    margin: 0.8%;
    height: calc(100vh - 90px);
    overflow: hidden;
    border-radius: 5px;
  }
}
</style>
