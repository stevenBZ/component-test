<template>
    <el-dialog title="建站详情" :visible.sync="localDialogVisible" @close="close">
        <el-steps :active="activeStep" finish-status="success" style="margin-bottom:10px;">
            <el-step title="应用视图"></el-step>
            <el-step title="资源视图"></el-step>
            <el-step title="配置视图"></el-step>
            <el-step title="建站"></el-step>
        </el-steps>
        <el-card>
            <el-form :model="form" :rules="rules" ref="appForm" label-position="left" label-width="100px">
                <el-row gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="appViewName" label="视图名 :">
                            <el-input v-model="form.appViewName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="owner" label="责任人 :">
                            <el-input v-model="form.owner"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="shareUser" label="共享责任人:">
                            <el-input v-model="form.shareUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="identify" label="标视图识 :">
                            <el-input v-model="form.identify"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item prop="desc" label="描述 :">
                        <el-input v-model="form.desc"></el-input>
                    </el-form-item>
                </el-row>
                <el-row gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="envName" label="环境名 :">
                            <el-input disabled v-model="form.envName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  prop="unit" label="单元名 :">
                            <el-input v-model="form.unit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="isCenter">
                            <el-checkbox v-model="form.isCenter">是否中心</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item prop="addHost" label="增加主机 :">
                        <input  class="el-input-imitate" v-model="form.addHostInput"  @keyup.13="handleAddHosts"> 
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-tag width="100px" style="margin-right:25px;">机房列表</el-tag>
                    <el-tag
                        style="margin-right:5px;"
                        v-for="(tag, index) in form.idcList"
                        :key="index"
                        closable
                        type="info"
                        @close="handleCloseTag(tag)">
                        {{tag}}
                    </el-tag>
                </el-row>
            </el-form>
        </el-card>
        <dragableTree
            :appDetailList="form.appDetailList"
            :remainAppList="form.remainAppList"
        ></dragableTree>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveForm">保存</el-button>
            <el-button type="primary" @click="saveForm">下一步</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { construction } from "@/api";
    export default {
        name: "constructionDialog",
        props: ['constructionDialogVisable', 'constructionDialogTitle','chooseEnv', 'chooseId','editFlag'],
        components: {
            'dragableTree': () => import('./dragableTree/dragableTree.vue'),
        },
        data(){
            return {
                localDialogVisible: this.constructionDialogVisable, ///弹窗开关状态
                activeStep: 0,                                      ///步骤激活状态
                form: {
                    appViewName: '',  ///视图名
                    owner: '',        ///责任人
                    desc: '',         ///描述
                    envName: this.chooseEnv,      ///环境名
                    unit: '',         ///单元名
                    identify: '',     ///标视图识
                    isCenter: false,  ///是否中心
                    addHostInput: '', 
                    idcList: [],      ///主机列表
                    appDetailList: [], ///应用树型结构
                    remainAppList: [], ///未加入视图应用的应用
                },
                rules:{
                    appViewName: [
                        { required: true, message: '请输入视图名', trigger: 'blur' }
                    ],
                    owner: [
                        { required: true, message: '请输入责任人', trigger: 'blur' }
                    ],
                    shareUser: [
                        { required: true, message: '请输入共享责任人', trigger: 'blur' }
                    ],
                    identify: [
                        { required: true, message: '请输入标视图识', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    envName: [
                        { required: true, message: '请输入环境名', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '请输入单元名', trigger: 'blur' }
                    ]
                }
            }
        },
        watch:{
            constructionDialogVisable(val){
                this.localDialogVisible = val;
            },
            localDialogVisible(val){
                this.$emit('on-status-change', val);
            },
            chooseEnv(val){
                this.form.envName = val;
            },
            editFlag(val){
                console.log(val)
                if(val){
                    let id = this.chooseId;
                    construction.getAppViewWithRemainApp(id).then(res => {
                        if(!res.data || res.data.code !== 200){
                            this.$message({
                                type: 'warning',
                                message: res.data.message || '网络请求失败' 
                            })
                            return false;
                        }else{
                            let temp = res.data.data;
                            this.form = Object.assign(this.form, temp);
                            console.log(temp);
                            console.log(this.form);

                        }
                    })
                }
            }
        },
        methods:{
            close(){
                this.localDialogVisible = false;
                this.$refs.appForm.resetFields();
                this.form.idcList = [];
                this.$emit('on-reset-construction');
            },
            saveForm(){
                let formValid = true;
                let data = {};
                this.$refs.appForm.validate((valid) => {
                    if(valid){
                        if(this.form.idcList.length === 0){
                            this.$message({
                                message: '至少需要一个主机',
                                type: 'warning'
                            })
                            formValid = false;
                        }
                        if(formValid){
                            data = {
                                appViewName: this.form.appViewName,
                                identify: this.form.identify,
                                isCenter: this.form.isCenter,
                                envName: this.form.envName,
                                unit: this.unit,
                                idcList: this.idcList 
                            }
                            construction.saveAppView(data).then(res => {
                                if(!res.data || res.data.code !== 200){
                                    this.$message({
                                        type: 'warning',
                                        message: res.data.message || '网络请求失败' 
                                    })
                                    return false;
                                }else{
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功' 
                                    })
                                }
                            })
                        }
                    }else{
                        return false;
                    }
                })
            },
            handleAddHosts(){
                let temp = this.form.addHostInput.trim();
                let valid = true;
                if(temp){
                    this.form.idcList.forEach(i => {
                        if(i === temp){
                            this.$message({
                                message: '不能有重复项',
                                type: 'warning'
                            })
                            valid = false;
                        }
                    });
                    if(valid){
                        this.form.idcList.push(temp);
                        this.form.addHostInput = '';
                    }
                }
            },
            handleCloseTag(val){
                this.form.idcList.forEach((i, index) => {
                    if(i === val){
                        this.form.idcList.splice(index, 1);
                    }
                });
            }
        }
    }
</script>
<style>
    .el-input-imitate{
        height:40px;
        width:calc(100% - 10px);
        border-radius:5px;
        border:1px solid #dddfe7;
        padding-left:10px;
    }
    .el-input-imitate:focus{
        outline:1px solid #409eff;
    }
</style>
