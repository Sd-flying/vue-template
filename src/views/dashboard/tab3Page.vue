<template>
    <div class="tab-container">
        <el-row>
            <el-col :span="12">
                <div class="grid-content" style="margin-right: 15px">

                </div>
            </el-col>

            <el-col :span="12">
                <div class="grid-content">

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content" style="margin-right: 15px">

                </div>
            </el-col>

            <el-col :span="12">
                <div class="grid-content">

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content" style="margin-right: 15px">

                </div>
            </el-col>

            <el-col :span="12">
                <div class="grid-content">

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "tab2Page"
    }
</script>

<style scoped lang="scss">
    .tab-container {
        margin-top: 15px;
        height: calc(100vh - 160px);
        border-radius: 5px;

        .el-row {
            height: 35%;
            margin-bottom: 15px;

            .el-col {
                height: 100%;

                .grid-content {
                    height: 100%;
                    padding: 10px;
                    background: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 3px 0 #ccc;
                }
            }
        }
    }
</style>
