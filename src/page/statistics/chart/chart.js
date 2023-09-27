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
  const colorList = ['#3aa1ff', '#f2637b', '#fbd437', '#4ecb73', '#36cbcb'];

  const lineOptions = {
    legend: {
      data: data.map(item => item.name),
      top: '8px',
      left: '48px',
      icon: 'roundRect',
      itemHeight: 4,
      itemGap: 24
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data[0].data.map(i => i.xdata),
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: data.map((item, index) => ({
      type: 'line',
      name: item.name,
      data: item.data.map(i => i.ydata),
      itemStyle: {
        color: colorList[index]
      }
    })),
    grid: {
      top: '40px',
      left: '50px',
      right: '12px',
      bottom: '32px'
    }
  };

  if (data.length === 1) {
    delete lineOptions.legend;
    lineOptions.grid.top = '28px';
    lineOptions.grid.left = '36px';
    lineOptions.grid.bottom = '36px';
  }

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
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          relVal += '<br/>' + params[i].marker + ' ' + params[i].value + '%';
        }
        return relVal;
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(i => i.xdata),
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: data.map(i => i.ydata),
        barWidth: '24px',
        itemStyle: {
          color: '#3aa1ff',
        },
      }
    ],
    grid: {
      top: '28px',
      left: '34px',
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