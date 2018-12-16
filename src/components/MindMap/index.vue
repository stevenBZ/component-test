<template>
    <div class="mindmap">
        <div class="mindmap-main">
            <div class="function-bar">
                <div class="toolbar">
                    <button class="toolbar-btn btn btn-default btn-sm btn-success node-plus disabled">添加节点</button>
                    <button class="toolbar-btn btn btn-default btn-sm btn-danger node-cancel disabled">删除节点</button>
                </div>
                <div class="tip-box">
                    <div class="tip-wrapper">
                        <div class="tip-triangle"></div>
                        <div class="tip-label"></div>
                    </div>
                </div>
                <div class="label-group">
                    <input type="text" class="form-control">
                    <button class="btn btn-default btn-sm">确定</button>
                </div>
            </div>
            <div id="mindmapCanvas"></div>
        </div>
    </div>
</template>
<script>
import './index.less';
import $ from 'jquery';
import Graph from './libs/Graph';
import Renderer from './libs/Renderer';
export default {
    data() {
        return {

        };
    },
    mounted() {
      let mockData = {
          label: '节点一',
          type: 'root',
          children: [
              {
                  label: '节点二',
                  type: 'leaf',
                  direction: 1,
                  children: [
                      {
                          label: '节点三',
                          type: 'leaf',
                          direction: 1,
                          children: [
                              {
                                label: '节点十',
                                type: 'leaf',
                                direction: 1
                              }
                          ]
                      },
                      {
                          label: '节点四',
                          type: 'leaf',
                          direction: 1
                      },
                      {
                          label: '节点五',
                          type: 'left',
                          direction: 1
                      }
                  ]
              },{
                  label: '节点六',
                  type: 'leaf',
                  direction: -1,
                  children: [
                      {
                          label: '节点七',
                          type: 'leaf',
                          direction: 1,
                          children: [
                              {
                                label: '节点十二',
                                type: 'leaf',
                                direction: 1,
                                children: [
                                    {
                                        label: '节点八十',
                                        type: 'leaf',
                                    },
                                    {
                                        label: '节点八十三',
                                        type: 'leaf',
                                    }
                                ]
                              },
                              {
                                label: '节点十三',
                                type: 'leaf',
                                direction: 1,
                              },
                              {
                                label: '节点十四',
                                type: 'leaf',
                                direction: 1,
                              }
                          ]
                      },
                      {
                          label: '节点八',
                          type: 'leaf',
                          direction: 1
                      },
                      {
                          label: '节点九',
                          type: 'left',
                          direction: -1
                      }
                  ]
              }
          ]
      };
      var graph = new Graph(mockData);
      var renderer = new Renderer({
          canvasId: 'mindmapCanvas',
          canvasClickCb: () => {
              $('.label-group input').val('');
              $('.btn').addClass('disabled');
          },
          nodeClickCb: (label) => {
              $('.label-group input').val(label);
              $('.btn').removeClass('disabled');
          }
      }, {
          setSelected: graph.setSelected.bind(graph),
          getParentAddableNodeSet: graph.getParentAddableNodeSet.bind(graph),
          getSelected: graph.getSelected.bind(graph),
          getNodes: graph.getNodes.bind(graph),
          setParent: graph.setParent.bind(graph)
      });
      graph.init(renderer);
      let graphRoot = graph.root
      let stack = [mockData]
      while(stack.length > 0){
          let item = stack.pop()
          let tempRoot = item.fatherNode || graph.root
          if(item.type !== 'root'){
            //   renderer.setSelectedRender(tempRoot)
              graph.selected = tempRoot
              tempRoot = graph.addSubNode(item)
              console.log('画了一个结点', tempRoot)
          }
          if(item.children && Array.isArray(item.children)){
              stack.push(...item.children)
              item.children.forEach(i => {
                  i.fatherNode = tempRoot
              })
          }
      }
      $('.node-plus').click(() => {
          graph.addNode();
      });

      $('.node-cancel').click(() => {
          graph.removeNode();
      });

      $('.label-group button').click(() => {
          var text = $('.label-group input').val();
          graph.setLabel(text);
      });
    },
};
</script>
<style>
</style>
