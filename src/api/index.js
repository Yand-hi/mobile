import { createRestClient } from '@/request/useFetch';

const { postForObject, getForObject } = createRestClient('./api');

// 获取项目数据列表
export const projectList = (data) => {
  return postForObject('/ProjectMonter/Operate/getProjectOperateC.do', data);
};

// 获取项目运营数据
export const revenueData = (data) => {
  return postForObject('/ProjectMonter/Operate/getOperateDataC.do', data);
};

// 获取设备数据
export const deviceData = (data) => {
  return postForObject('/ProjectMonter/Device/getDeviceNumC.do', data)
}

// 获取车场数据
export const parkingLotData = (data) => {
  return postForObject('/ProjectMonter/Space/getParkSpaceDataC.do', data)
}

// 获取车场分布情况数据
export const parkingLotRatio = (data) => {
  return postForObject('/ProjectMonter/Space/getTypeParkSpaceDataC.do', data)
}

// 获取最近半年增量数据
export const incrementStat = (data) => {
  return postForObject('/ProjectMonter/Space/getAddParkSpaceDataC.do', data)
}