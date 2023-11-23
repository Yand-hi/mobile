import { createRestClient } from '@/request/useFetch';

const { postForObject, getForObject } = createRestClient('');

// 获取项目数据列表
export const projectList = (data) => {
  return postForObject('/ProjectMonter/Operate/getProjectOperateC.do', data);
};

// 获取不同时间类别项目运营数据
export const revenueData = (data) => {
  return postForObject('/ProjectMonter/Operate/getOperateDataC.do', data);
};

// 获取设备数据
export const deviceData = (data) => {
  return postForObject('/ProjectMonter/Device/getDeviceNumC.do', data);
};

// 获取车场数据
export const parkingLotData = (data) => {
  return postForObject('/ProjectMonter/Space/getParkSpaceDataC.do', data);
};

// 获取车场分布情况数据
export const parkingLotRatio = (data) => {
  return postForObject('/ProjectMonter/Space/getTypeParkSpaceDataC.do', data);
};

// 获取最近半年增量数据
export const incrementStat = (data) => {
  return postForObject('/ProjectMonter/Space/getAddParkSpaceDataC.do', data);
};

// 获取最近七日营收趋势数据
export const recentRevenueTrendData = (data) => {
  return postForObject('/ProjectMonter/dateOperate/getSevenProjectDataC.do', data);
};

// 获取最近七日收入占比数据
export const incomeRankData = (data) => {
  return postForObject('/ProjectMonter/Operate/getOperateDateC.do', data);
};

// 获取最近半年设备增长数据
export const deviceIncreaseData = (data) => {
  return postForObject('/ProjectMonter/Device/getDeviceDateNumC.do', data);
};

// 获取至今的运营数据
export const sofarRevenueData = (data) => {
  return postForObject('/ProjectMonter/Operate/getOperateToNowDataC.do', data);
};