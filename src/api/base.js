import Ajax from '@/utils/ajax';

const ajax = Ajax.getInstance();
//////获取所有环境
export function getAllEnv() {
  return ajax.get('/api/v1/base/getAllEnv');
}