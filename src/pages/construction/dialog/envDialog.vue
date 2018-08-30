<template>
    <el-dialog title="环境" :visible.sync="localDialogVisible" @close="close">
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item prop="envName" label="选择环境" label-width="80px">
                <el-select style="width:100%" v-model="form.envName" filterable placeholder="请选择环境">
                    <el-option
                        v-for="(item, index) in filterEnv"
                        :key="index"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="showConstructionDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: "envDialog",
        props: ['envDialogVisable', 'filterEnv'],
        data(){
            return {
                localDialogVisible: this.envDialogVisable,
                form: {
                    envName: ''
                },
                rules: {
                    envName: [
                        { required: true, message: '请选择环境', trigger: 'change' }
                    ],
                }
            }
        },
        watch:{
            envDialogVisable(val){
                this.localDialogVisible = val;
            },
            localDialogVisible(val){
                this.$emit('on-status-change', val);
            },

        },
        methods:{
            showConstructionDialog(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        let data = this.form.envName;
                        this.$emit('on-show-construction-dialog', data);
                        this.close();
                    }else{
                        return false;
                    }
                })
            },
            close(){
                this.$refs.ruleForm.resetFields();
                this.localDialogVisible = false;
            }
        }
    }
</script>