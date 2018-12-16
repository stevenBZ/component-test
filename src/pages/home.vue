<template>
  <div class="content">
    <el-breadcrumb style="margin:5px 0 10px 5px" separator="/">
      <el-breadcrumb-item>页面一</el-breadcrumb-item>
      <el-breadcrumb-item>dashboard</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="mountNode"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import $ from 'jquery'
export default {
    data() {
        return {
        };
    },
    mounted() {
      let data = {
  "name": "Modeling Methods",
  "children": [
    {
      "name": "Classification",
      "children": [
        { "name": "Logistic regression" },
        { "name": "Linear discriminant analysis" },
        { "name": "Rules" },
        { "name": "Decision trees" },
        { "name": "Naive Bayes" },
        { "name": "K nearest neighbor" },
        { "name": "Probabilistic neural network" },
        { "name": "Support vector machine" }
      ]
    },
    {
      "name": "Consensus",
      "children": [
        {
          "name": "Models diversity",
          "children": [
            { "name": "Different initializations" },
            { "name": "Different parameter choices" },
            { "name": "Different architectures" },
            { "name": "Different modeling methods" },
            { "name": "Different training sets" },
            { "name": "Different feature sets" }
          ]
        },
        {
          "name": "Methods",
          "children": [
            { "name": "Classifier selection" },
            { "name": "Classifier fusion" }
          ]
        },
        {
          "name": "Common",
          "children": [
            { "name": "Bagging" },
            { "name": "Boosting" },
            { "name": "AdaBoost" }
          ]
        }
      ]
    },
    {
      "name": "Regression",
      "children": [
        { "name": "Multiple linear regression" },
        { "name": "Partial least squares" },
        { "name": "Multi-layer feedforward neural network" },
        { "name": "General regression neural network" },
        { "name": "Support vector regression" }
      ]
    }
  ]
}
      G6.registerEdge('mindEdge', {
        getPath(item) {
          const points = item.getPoints();
          const start = points[0];
          const end = points[points.length - 1];
          const hgap = Math.abs(end.x - start.x);
          if (end.x > start.x) {
            return [
              [ 'M', start.x, start.y ],
              [ 'C', start.x + hgap / 4, start.y, end.x - hgap / 2, end.y, end.x, end.y ]
            ];
          }
          return [
            [ 'M', start.x, start.y ],
            [ 'C', start.x - hgap / 4, start.y, end.x + hgap / 2, end.y, end.x, end.y ]
          ];
        }
      });
          console.log('数据是', data)
          var layout = new G6.Layouts.Mindmap({
            direction: 'H', // 方向（LR/RL/H/TB/BT/V）
            getHGap: function getHGap() /* d */ {
              // 横向间距
              return 100;
            },
            getVGap: function getVGap() /* d */ {
              // 竖向间距
              return 10;
            }
          });
          var tree = new G6.Tree({
            id: 'mountNode', // 容器ID
            height: window.innerHeight, // 画布高
            fitView: 'autoZoom', // 自动缩放
            layout,
          });
          tree.node({
            label(model) {
              return {
                text: model.name,
                stroke: '#fff',
                lineWidth: 3
              };
            },
            size: 8,
            shape: 'mindNode'
          });
          tree.edge({
            shape: 'mindEdge'
          });
          tree.on('afterchange', ()=>{
            tree.getNodes().forEach(node=>{
              const model = node.getModel();
              const label = node.getLabel();
              const keyShape = node.getKeyShape();
              const parent = node.getParent();
              const box = keyShape.getBBox();
              const labelBox = label.getBBox();
              let dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2+ 8;
              let dy = (box.maxY - box.minY) / 2 + 8;
              if(parent){
                const parentModel = parent.getModel();
                if(parentModel.x > model.x){
                  dx = -dx;
                }
                dy = 0;
              } else {
                dx = 0;
              }
              label.translate(dx, dy);
            });
            tree.draw();
          });
          tree.read({ roots: [data] });
    },
};
</script>
<style>
</style>
