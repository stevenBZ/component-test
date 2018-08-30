<template>
  <el-card>
        <el-tree 
            :data="appDetailListData" 
            node-key="appId"
            :props="defaultProps" 
            draggable
            @node-click="handleNodeClick">
        </el-tree>
        <el-tag width="100px" style="margin-right:10px; margin-top:10px;">应用列表</el-tag>
        <el-tag
            style="margin-right:5px;"
            v-for="(tag, index) in remainAppList"
            :key="index"
            type="info"
            @close="handleCloseTag(tag)">
            {{tag.appName}}
        </el-tag>
  </el-card>
</template>
<script>
    import lodash from 'lodash'
    export default {
        name : 'dragableTree',
        props: ['appDetailList', 'remainAppList'],
        data(){
            return {
                appDetailListData:lodash.cloneDeep(this.appDetailList),
                remainAppListData: lodash.cloneDeep(this.remainAppList),
                defaultProps: {
                    children: 'leaf',
                    label: 'appName'
                }
            }
        },
        watch:{
            appDetailList(){
                this.appDetailListData = lodash.cloneDeep(this.appDetailList);
            },
            remainAppList(){
                this.remainAppListData = lodash.cloneDeep(this.remainAppList);
            }
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }
        }
    }
</script>