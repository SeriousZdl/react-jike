// 柱状图组件
import { useEffect } from 'react';
import * as echarts from 'echarts';
import { useRef } from 'react';

// 1. 把功能代码都放到这个组件中
// 2. 把可变的部分抽象成 props参数

const BarChart = ({ title }) => {
  const charRef = useRef(null);
  useEffect(() => {
    // 必须保证 使用 useEffect 保证dom可用 才进行图表的渲染

    // 1. 获取渲染图表的 DOM节点
    // const chartDom = document.getElementById('main');

    const chartDom = charRef.current;

    // 2. 图标初始化生成图标实例对象 
    const myChart = echarts.init(chartDom);

    // 3. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar'
        }
      ]
    };

    // 4. 如果参数存在 那么就 使用参数 渲染图表
    option && myChart.setOption(option);

  }, [title])


  return (
    <div ref={charRef} style={{ width: '500px', height: '400px' }}>

      {/* 必须要声明dom显示节点   且 要有宽和高才能显示chart图表 */}
      {/* <div id="main" style={{width: '500px', height: '400px'}}> */}

    </div>
  )

}
export default BarChart;