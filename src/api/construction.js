import Ajax from '@/utils/ajax';

const ajax = Ajax.getInstance();
//////获取视图列表
export function getAllAppView() {
  return ajax.get('/api/v1/appView/getAllAppView');
}
//////，获取单个视图，带未加入视图应用的
export function getAppViewWithRemainApp(appViewId) {
    let url = '/api/v1/appView/getAppViewWithRemainApp' + '/' + appViewId;
    return ajax.get(url);
}
//////，获取单个视图，不带未加入视图应用的
export function getAppViewWithoutRemainApp(appViewId) {
    let url = '/api/v1/appView/getAppViewWithoutRemainApp' + '/' + appViewId;
    return ajax.get(url);
}
///// 保存视图
export function saveAppView(data) {
    return ajax.post('/api/v1/appView/saveAppView', {
      data
    });
  }
