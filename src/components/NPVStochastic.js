import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../styles/NPVComponents.css';

class NPVStochastic extends React.Component{

    getOption(){
        let option = {
            title: {
                // text: 'NPV Stochastic Analysis'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                }
            },
            legend: {
                data: ['2.8', '2.9','3','3.1','3.2']
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data: ['2.5','2.6','2.7','2.8','2.9','3','3.1','3.2','3.3','3.4','3.5','3.6','3.7','3.8','3.9','4','4.1','4.2','4.4','4.4','4.5','4.6','4.7'],
                boundaryGap: [0, 0],
                barCategoryGap: '0%',
            },
            yAxis: [
                {
                    type: 'value',
                    offset: -2
                },
                {
                    type: 'value',
                    scale: true,
                    name: 'other y',
                    max: 100,
                    min: 0,
                    boundaryGap: [0, 0],
                    offset: -2
                }
            ],
            series: [
                {
                    barCategoryGap: '0%',
                    barGap: '0%',
                    name: 'serie name 1',
                    type: 'bar',
                    stack: 'stack name',
                    color: '#00f',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320, 550, 600, 640, 750, 802, 933, 1000, 1200, 800, 735, 644, 555, 410, 320, 220, 320]
                },
                {
                    // barCategoryGap: '0%',
                    barGap: '0%',
                    name: 'serie name 2',
                    type: 'bar',
                    stack: 'stack name',
                    color: '#f00',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [520, 802, 901, 934, 390, 330, 320, 550, 600, 640, 750, 802, 933, 1000, 1600, 800, 735, 644, 555, 410, 320, 220, 320]
                },
                {
                    barGap: '0%',
                    name: 'serie name 3',
                    type: 'bar',
                    stack: 'stack name',
                    color: '#c5f3c5',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320, 550, 600, 640, 750, 802, 933, 1000, 1200, 800, 735, 644, 555, 410, 320, 220, 320]
                },
                {
                    data: [0, 820, 932, 901, 934, 1290, 1330, 3000, 3200, 3300, 3500, 3400, 3600, 3700, 3800, 3300, 3000, 3100, 3250, 3800, 4000],
                    type: 'line',
                    smooth: true
                },
                {
                    data: [0, 220, 632, 701, 1034, 1290, 1300, 1800, 2000, 1700, 1500, 1200, 1100, 1000, 900, 888, 1000, 1100, 1500, 2200, 2800, 4000],
                    type: 'line',
                    smooth: true
                }
            ]
        };

        return option;
    }

    render(){
        return (<ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            style={{height:'400px'}}
            />);
    }

}

export default NPVStochastic;