import Ajax from '@/utils/ajax';

const ajax = Ajax.getInstance();

export function getPieData() {
  return ajax.get('/api/dashboard/pie');
}