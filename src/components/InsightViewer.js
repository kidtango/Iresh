import React from 'react';
import ReactEcharts from 'echarts-for-react';
// then import echarts modules those you have used manually.
import echarts from 'echarts';
import '../styles/InsightViewer.css';
import * as yellowPin from '../assets/yellow.gif';
import * as redPin from '../assets/red.gif';
import * as greenPin from '../assets/green.gif';
import * as plantPin from '../assets/plant.gif';    
import * as processPin from '../assets/process.gif';        
import * as peoplePin from '../assets/people.gif';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class InsightViewer extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            filter: 'top50Keywords'
        };
        this.nodeWidth = 8;
    }

    showTop50(){
        this.setState({filter: 'top50Keywords'});
    }

    showTop20(){
        this.setState({filter: 'top20Keywords'});
    }

    showAll(){
        this.setState({filter: 'allKeywords'});
    }

    getOption() {

        // let graph = dataTool.gexf.parse(gexfData);
        let categories = [{
            name: "L1",
            icon: greenPin
        }, {
            name: "L2",
            icon: greenPin
        }, {
            name: "L3",
            icon: yellowPin
        }, {
            name: "M1",
            icon: greenPin
        }, {
            name: "M2",
            icon: yellowPin
        }, {
            name: "M3",
            icon: redPin
        }, {
            name: "H1",
            icon: yellowPin
        }, {
            name: "H2",
            icon: redPin
        }, {
            name: "H3",
            icon: redPin
        }, {
            name: "PLANT",
            icon: plantPin
        }, {
            name: "PROCESS",
            icon: processPin
        }, {
            name: "PEOPLE",
            icon: peoplePin
        }];
        
        this.props[this.state.filter].nodes.forEach(function (e) {
            e.value = e.symbolSize;
            // e.symbolSize /= 1.5;
            e.label = {
                normal: {
                    show: e.symbolSize > 0
                }
            };
            e.category = e.attributes.modularity_class;
        });
        let option = {
            title: {
                text: 'Preventive Layer Model',
                fontSize: '12px',
                subtext: 'Circular layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {
                formatter: node => {
                    if(node.data.source)
                        return node.data.source + ' > ' + node.data.target;
                    if(node.data.name === node.data.category)
                        return node.data.name
                    else
                        return node.data.category + ' - ' + node.data.name + ': '+ (node.data.value - this.nodeWidth);
                }
            },
            legend: [{
                // selectedMode: 'single',
                
                data: categories.map(e => ({
                        name: e.name,
                        icon: "image://" + e.icon
                    })
                )
                
                // data: categories
            }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'Insight Viewer',
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: this.props[this.state.filter].nodes,
                    links: this.props[this.state.filter].links,
                    categories: categories,
                    roam: true,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };

        return option;
    }

    render() {
       
        return (
            <div className="InsightViewer">
                <div className="graphFilters">
                    <ButtonGroup variant="contained" size="small" aria-label="Small contained button group" className="layerFilter">
                        <Button className={this.state.filter === 'top20Keywords' && 'selectedFilter'} onClick={e => this.showTop20()}>Top 20</Button>
                        <Button className={this.state.filter === 'top50Keywords' && 'selectedFilter'} onClick={e => this.showTop50()}>Top 50</Button>
                        <Button className={this.state.filter === 'allKeywords' && 'selectedFilter'} onClick={e => this.showAll()}>All</Button>
                    </ButtonGroup>
                </div>
                <ReactEcharts
                    style={{ width: '100%', height: '400px' }}
                    echarts={echarts}
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                />
            </div>
        );
    }
}

export default InsightViewer;