<template>
  <div class="content">
    <el-card style="margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>应用视图</span>
          <el-button @click="showDialogByAdd()" style="float: right; padding: 3px 0;" type="text">生成视图</el-button>
        </div>
            <el-table
                :data="viewTableData">
                <el-table-column
                    prop="appViewId"
                    label="ID">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="showDialogByEdit(scope.row)">{{scope.row.appViewId}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="envName"
                    label="环境">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单元">
                </el-table-column>
                <el-table-column
                    prop="owner"
                    label="负责人">
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="视图描述">
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="copyView(scope.row)">拷贝视图</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="destroyView(scope.row)">删除</el-button>
                </template>
                </el-table-column>  
            </el-table>
            <construction-dialog
                :constructionDialogVisable = "constructionDialogVisable"
                :constructionDialogTitle = "constructionDialogTitle"
                :chooseEnv = "chooseEnv"
                :chooseId = "chooseId"
                :editFlag = "editFlag"
                @on-reset-construction = "handleResetConstruction"
                @on-status-change = "handleConstructionDialogStatusChange"
            ></construction-dialog>
            <env-dialog
                :envDialogVisable = "envDialogVisable"
                :filterEnv = "filterEnv"
                @on-show-construction-dialog = "handleShowConstructionDialog"
                @on-status-change = "handleEnvDialogStatusChange"
            ></env-dialog>
      </el-card>
  </div>
</template>

<style>

</style>

<script>
import { mapState } from "vuex";
import { base, construction } from "@/api";
export default {
    name: "construction",
    components:{
        'constructionDialog': () => import('./dialog/constructionDialog.vue'),
        'envDialog': () => import('./dialog/envDialog.vue'),
    },
    data(){
        return {
                viewTableData:[],     //应用视图列表数据
                //{identify: '',   //标视图识
                //isCenter: '',  //是否中心
                //appViewId: '',    //视图ID
                //appViewName: '',  //视图名
                //owner: '',      //责任人
                //shareUser: '',  //共享责任人
                //desc: '',      //视图描述
                //envName: '',    //环境名
                //unit: '',}       //单元名
                constructionDialogVisable: false, //建站弹窗可见控制标志
                envDialogVisable: false,      //选择环境弹窗可见控制标志
                constructionDialogTitle:'',   //建站弹窗名
                allEnv:[],                    //所有的环境名
                filterEnv: [],                //所有的环境名减去现有的环境名所得的环境
                chooseEnv: '',                //选择的环境
                editFlag: false,              ///标识本次打开弹窗是编辑还是新建
                chooseId: '',
        }
    },
    created(){
        // this.getAllAppView();
        // this.getAllEnv();
        this.init();
    },
    methods:{
            init(){
                Promise.all([
                    construction.getAllAppView(),
                    base.getAllEnv()
                ]).then(values => {
                    values.forEach(res => {
                        if(!res.data || res.data.code !== 200){
                            this.$message({
                                type: 'warning',
                                message: res.data.message || '网络请求失败' 
                            })
                            return false;
                        }
                    })
                    this.viewTableData = values[0].data.data;
                    this.allEnv = values[1].data.data;
                    /////筛选环境操作
                    let filterEnv = [];
                    this.allEnv.forEach(i => {
                        if(!this.viewTableData.find(item => item.envName === i)){
                            filterEnv.push(i);
                        }
                    });
                    this.filterEnv = filterEnv;
                })
            },
            getAllAppView(){
                construction.getAllAppView().then(res => {
                    if(!res.data || res.data.code !== 200){
                        this.$message({
                            type: 'warning',
                            message: res.data.message || '网络请求失败' 
                        })
                        return false;
                    }else{
                        this.viewTableData = res.data.data;
                    }
                });
            },
            getAllEnv(){
                base.getAllEnv().then(res => {
                    if(!res.data || res.data.code !== 200){
                        this.$message({
                            type: 'warning',
                            message: res.data.message || '网络请求失败' 
                        })
                        return false;
                    }else{
                        this.allEnv = res.data.data;
                    }
                });
            },
            showDialogByAdd(){
                // console.log(this.envDialogVisable);
                this.envDialogVisable = true;
                // console.log(this.envDialogVisable);
                // this.constructionDialogTitle = '详情';
            },
            handleShowConstructionDialog(val){
                this.constructionDialogVisable = true;
                this.chooseEnv = val;
            },
            showDialogByEdit(obj){
                this.chooseId = obj.appViewId;
                this.editFlag = true;
                this.constructionDialogVisable = true;
            },
            copyView(val){
                console.log(val)
            },
            destroyView(val){
                console.log(val)
            },
            handleResetConstruction(){
                this.editFlag = false;
                this.chooseId = "";
            },
            handleConstructionDialogStatusChange(val){
                this.constructionDialogVisable = val;
            },
            handleEnvDialogStatusChange(val){
                this.envDialogVisable = val;
            }
    }
};
</script>