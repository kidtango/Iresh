import React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../styles/NPVComponents.css';

let dataB = [[130, -20], [75, 10], [78.5, 20], [51.5, 30], [-7.1, 40]];
var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

class NPVConceptSelection extends React.Component{

    getOption(){
        let symbolSize = 20; 

        let option = {
            title: {
                // text: 'NPV Concept Selection Analysis'
            },
            tooltip: {
                triggerOn: 'none',
                formatter: function (params) {
                    return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
                }
            },
            grid: {
                
            },
            xAxis: {
                min: -100,
                max: 80,
                type: 'value',
                axisLine: {onZero: false},
                splitLine: {show: false},
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    inside: false,
                }
            },
            yAxis: {
                min: -30,
                max: 60,
                type: 'value',
                axisLine: {onZero: false},
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    filterMode: 'empty'
                }
            ],
            series: [
                {
                    id: 'a',
                    type: 'line',
                    smooth: true,
                    symbolSize: symbolSize,
                    data: data,
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: ['50%', '50%'],
                                formatter: '{b} Wells',
                                textStyle: {
                                    color: '#333',
                                    fontSize: 14
                                }
                            }
                        },
                        data: [
                            {
                                coord: [15, 0]
                            },
                            {
                                coord: [-50, 10]
                            },
                            {
                                coord: [-56.5, 20]
                            },
                            {
                                coord: [-46.5, 30]  
                            },
                            {
                                coord: [-22.1, 40]
                            },
                        ] 
                    }
                },
                {
                    id: 'b',
                    type: 'line',
                    smooth: true,
                    symbolSize: symbolSize,
                    symbol: "arrow",
                    data: dataB
                }
            ]
        };

        return option;
    }

    render(){
        return (
        <div>
            <ReactEcharts
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                style={{height:'400px'}}
                />
                <div>NPV Billion $USD</div>
        </div>
        );
    }

}

export default NPVConceptSelection;