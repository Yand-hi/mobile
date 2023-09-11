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
      data: ['9/5', '9/6', '9/7', '9/8', '9/9', '9/10', '9/11'],
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: [15, 23, 22, 21, 13, 14, 26],
      }
    ],
    grid: {
      top: '28px',
      left: '28px',
      right: '6px',
      bottom: '36px'
    }
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
    color: ['#3aa1ff', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb'],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        // top: '10px',
        // left: '28px',
        // right: '6px',
        // bottom: '36px',
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
    ],
    grid: {
      top: '28px',
    }
  };

  return pieOptions;
}

function getBarOptions(data) {
  const barOptions = {
    xAxis: {
      type: 'category',
      data: ['9/5', '9/6', '9/7', '9/8', '9/9', '9/10', '9/11'],
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: [24, 66, 55, 80, 70, 32, 18],
        barWidth: '24px',
        itemStyle: {
          color: '#3aa1ff'
        },
      }
    ],
    grid: {
      top: '28px',
      left: '28px',
      right: '6px',
      bottom: '36px'
    }
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