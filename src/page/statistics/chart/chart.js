import * as echarts from 'echarts';

function getOptions(type, data = []) {
  if (type === 'line') {
    return getLineOptions(data);
  } else if (type === 'pie') {
    return getPieOptions(data);
  } else if (type === 'bar') {
    return getBarOptions(data)
  }
}

function getLineOptions(data) {
  const lineOptions = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: [150, 230, 224, 218, 135, 147, 260],
      }
    ]
  };

  return lineOptions;
}

function getPieOptions(data) {
  const pieOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      selectedMode: false,
      orient: 'vertical',
      right: '5%',
      top: 'middle',
      height: 200,
      formatter: function (name) {
        const value = data.find(item => item.name === name).value
        return name + ' ' + value + '元';
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'left'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  return pieOptions;
}

function getBarOptions(data) {
  const barOptions = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130]
      }
    ]
  };

  return barOptions;
}

export default function drawChart(chartDom, chartData, chartType) {
  if (!chartDom) return;

  let myChart = echarts.init(chartDom);
  let option = getOptions(chartType, chartData);

  if (myChart) {
    window.addEventListener('resize', myChart.resize());
    myChart.setOption(option);
  }
}