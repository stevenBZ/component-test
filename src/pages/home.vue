<template>
  <div class="content">
  <el-breadcrumb style="margin:5px 0 10px 5px" separator="/">
    <el-breadcrumb-item>大盘</el-breadcrumb-item>
    <el-breadcrumb-item>dashboard</el-breadcrumb-item>
  </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
            <div slot="header" class="clearfix">
              <span>当前流量</span>
            </div>
            <div class="pieChartWrap" ref="pie"></div>
        </el-card> 
      </el-col>
      <el-col :span="12">
        <el-card>
            <div slot="header" class="clearfix">
              <span>最近切换</span>
             </div>
              <div class="changeWrap">
                <el-tag type="warning">A</el-tag>
                <span style="margin: 0 10px;">切换至</span>
                <el-tag type="success">B</el-tag>
              </div>
        </el-card> 
      </el-col>
    </el-row>
    <el-row>
      <el-card style="margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>预案健康度</span>
        </div>
            <el-table
              :data="planTableData"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="预案名">
              </el-table-column>
              <el-table-column
                prop="planDesc"
                label="预案描述">
              </el-table-column>
              <el-table-column
                prop="owner"
                label="负责人">
              </el-table-column>
              <el-table-column
                prop="health"
                label="健康度">
                <template slot-scope="scope">
                  <span style="color:red;">{{ scope.row.health }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="checkTime"
                label="检查时间">
              </el-table-column>
            </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<style>

</style>

<script>
import { mapState } from "vuex";
import { demo } from "@/api";
import echarts from "echarts";
// import '../resource/css/rightArrowIconfont.css';
export default {
  // computed: mapState({
  //   info: state => state.demo.info,
  //   systemTime: state => state.demo.systemTime
  // }),
  created() {
    // this.getInfo();
    // this.getEcho();
  },
  mounted(){
    console.log(this.$refs.pie)
    // console.log(echarts.init);
    let pieChart = echarts.init(this.$refs.pie);
    let data = {
      legendData : ['流量一','流量二','流量三'],
      selected : {
        流量一 : true,
        流量二 : true,
        流量三 : true
      },
      seriesData:[
        {name: '流量一', value:200},
        {name: '流量二', value:300},
        {name: '流量三', value:400},
      ]
    }
    // let data = this.genData(5);
    let option = {
        title : {
            text: '',
            subtext: '',
            x:''
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: data.legendData,

            selected: data.selected
        },
        series : [
            {
                name: '姓名',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    pieChart.setOption(option, true);
  },
  data() {
    return {
      planTableData:[
        {
          id:1054325,
          planName: '预案A',
          planDesc: '这是预案A',
          owner: '张洪箫',
          health: '50%',
          checkTime: '2018年4月16日'
        }
      ]
    };
  },
  methods: {
    getInfo() {
      demo.getInfo().then(res => {
        this.$store.dispatch("demo/updateInfo", {
          info: res.data
        });
      });
    },
    getEcho() {
      demo
        .getEcho({
          data: {
            message: "hello"
          },
          count: 3
        })
        .then(res => {
          console.log(res);
          this.$store.dispatch("demo/updateSystemTime", {
            systemTime: res.systemtime
          });
        });
    }
////////方法结束
  }
};
</script>
<style>
  .pieChartWrap{
    height: 300px;
  }
  .changeWrap{
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
