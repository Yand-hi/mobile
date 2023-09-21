import * as echarts from 'echarts';

function getOptions(type, data = []) {
  if (type === 'line') {
    return getLineOptions(data);
  } else if (type === 'pie') {
    return getPieOptions(data);
  } else if (type === 'bar') {
    return getBarOptions(data);
  }
}

function getLineOptions(data) {
  const staticData = [
    { xdata: '9/21', ydata: 15 },
    { xdata: '9/20', ydata: 23 },
    { xdata: '9/19', ydata: 22 },
    { xdata: '9/18', ydata: 21 },
    { xdata: '9/17', ydata: 13 },
    { xdata: '9/16', ydata: 14 },
    { xdata: '9/15', ydata: 14 },
    { xdata: '9/14', ydata: 26 },
  ];
  const chartData = data || staticData;

  const lineOptions = {
    xAxis: {
      type: 'category',
      data: chartData.map(i => i.xdata),
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
        data: chartData.map(i => i.ydata),
      },
    ],
    grid: {
      top: '28px',
      left: '28px',
      right: '10px',
      bottom: '36px'
    }
  };

  return lineOptions;
}

function getPieOptions({ title, data }) {
  const colorList = ['#3aa1ff', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb'];

  const pieOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'middle',
      height: 200,
      itemGap: 20,
      icon: 'circle',
      formatter: function (name, index) {
        let total = 0;
        let target;
        for (let i = 0; i < data.length; i++) {
          total += data[i].value;
          if (data[i].name === name) {
            target = data[i].value;
          }
        }
        const arr = [
          '{a|' + name + '}',
          '{b|' + ((target / total) * 100).toFixed(2) + '%}',
          '{c|' + target + '元}',
        ];
        if (title === '车场分布情况') {
          delete arr[2];
        }
        return arr.join('  ');
      },
      textStyle: {
        color: 'inherit',
        padding: [2, 0, 0],
        rich: {
          a: {
            fontSize: 12,
          },
          b: {
            fontSize: 12,
            padding: [0, 2],
          },
          c: {
            fontSize: 12
          }
        }
      }
    },
    color: colorList,
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['46%', '70%'],
        center: ['27%', '50%'],
        label: {
          show: false,
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
      right: '10px',
      bottom: '36px'
    }
  };

  return barOptions;
}

export default function drawChart(chartDom, chartData, chartType) {
  if (!chartDom) return;

  let myChart = echarts.init(chartDom);
  let options = getOptions(chartType, chartData);

  if (myChart) {
    window.addEventListener('resize', myChart.resize());
    myChart.setOption(options);
  }
}