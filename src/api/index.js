import { createRestClient } from '@/request/useFetch';

const { postForObject, getForObject } = createRestClient('./api');

// 获取项目列表
export const projectList = () => {
  return postForObject('/ProjectMonter/Projectmessage/getList.do', { currentPage: 1, pageSize: 12 });
};