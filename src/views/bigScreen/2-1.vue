<template>
  <div class="container-style">
    <div class="card-style">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>大屏展示说明</span>
        </div>
        <div class="text item">
          <div class="block">
            <el-timeline :reverse="reverse">
              <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-card>
    </div>

    <div class="btn-style">
      <el-button type="primary" @click="goBigPing">参观大屏展示</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        reverse: true,
        activities: [{
          content: '安装vue-someware',
          timestamp: 'npm install vue-someware'
        }, {
          content: '安装DataV',
          timestamp: 'npm install @jiaminghi/data-view'
        }, {
          content: '使用',
          timestamp: 'import dataV from \'@jiaminghi/data-view\'\n' +
                  '\n' +
                  'Vue.use(dataV)'
        }]
      }
    },
    methods: {
      goBigPing() {
        this.$router.push('/bigChild')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-style {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 20px;
  }
  .card-style {

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 100%;
    }
  }

  .btn-style {
    margin-top: 20px;
  }

</style>
