import { connect } from 'react-redux';
import InsightViewer from '../components/InsightViewer';
import { getKeywords, topBy } from '../lib/keywordsFilters';
import _ from 'lodash';
import matrixConfig from '../lib/matrixConfig';

const graphColors = {
    green: '#52ed82',
    red: '#F87C7C',
    yellow: '#fcc984'
};

const generateMainNodes = [
        {
            "id": "PLANT",
            "name": "PLANT",
            "itemStyle": {
                "normal": {
                    "color": "#18171f"
                }
            },
            "symbolSize": 30,
            "x": 0,
            "y": 0,
            "attributes": {
                "modularity_class": "PLANT"
            }
        },
        {
            "id": "PROCESS",
            "name": "PROCESS",
            "itemStyle": {
                "normal": {
                    "color": "#49465c"
                }
            },
            "symbolSize": 30,
            "x": 200,
            "y": 0,
            "attributes": {
                "modularity_class": "PROCESS"
            }
        },
        {
            "id": "PEOPLE",
            "name": "PEOPLE",
            "itemStyle": {
                "normal": {
                    "color": "#a0a0a0"
                }
            },
            "symbolSize": 30,
            "x": -200,
            "y": 0,
            "attributes": {
                "modularity_class": "PEOPLE"
            }
        },
    ];

const separateByLayer = (keywords) => {
    const layers = {PLANT: [], PROCESS: [], PEOPLE: []};

    _.each(keywords, (kwObj, key) => {
        if(kwObj.plant){
            layers.PLANT.push(kwObj);
        }
        else if(kwObj.process){
            layers.PROCESS.push(kwObj);
        }
        else if(kwObj.people){
            layers.PEOPLE.push(kwObj);
        }
    });

    return layers;
};

const getBucketColor = (kwObj) => {
    return graphColors[matrixConfig.matrix3x3.matMapColors[kwObj.matrixPos.severity][kwObj.matrixPos.likelihood]];
};

const generateGraph = (allKeywords) => {
    const layers = separateByLayer(allKeywords);
    const nodeWidth = 8;
    // const nodeGap = 20;
    let nodes = [];
    let links = [];
    let i = 0;

    

    _.each(layers, (keywords, layerName) => {
        
        // let numNodes = keywords.length; 
        /*
        radius = (nodeWidth + nodeGap) * numNodes,
        width = (radius * 2) + 50,
        height = (radius * 2) + 50,
        angle,
        x,
        y;
        */

        _.each(keywords, (kwObj, key) => {
            /*
            angle = (i / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                                    // For a semicircle, we would use (i / numNodes) * Math.PI.
            x = (radius * Math.cos(angle)) + ( (width + MAIN_NODES_POSITION[layerName].x) /2); // Calculate the x position of the element.
            y = (radius * Math.sin(angle)) + ( (width + MAIN_NODES_POSITION[layerName].y) /2); // Calculate the y position of the element.
            */
            nodes.push(
                {
                    "id": kwObj.value,
                    "name": kwObj.value,
                    "itemStyle": {
                        "normal": {
                            // "color": "#fcc984"
                            "color": getBucketColor(kwObj)
                        }
                    },
                    "symbolSize": kwObj.ocurrences + nodeWidth,
                    // "x": x, // + MAIN_NODES_POSITION[layerName].x,
                    // "y": y, // + MAIN_NODES_POSITION[layerName].y,
                    "attributes": {
                        "modularity_class": kwObj.bucket
                    }
                }
            );
            links.push(
                {
                    // "id": `${layerName}>${key}`,
                    "id": i++,
                    "name": null,
                    "source": layerName,
                    "target": kwObj.value,
                    "lineStyle": {
                        "normal": {}
                    }
                }
            );
        });
    });

    let graphStructure = { nodes: _.concat(nodes, generateMainNodes), links };
    
    return graphStructure;

    // nodes = _.concat(nodes, newNodes);

}

const mapStateToProps = state => {
    let allKeywords = getKeywords(state);

    return {
        allKeywords: generateGraph(allKeywords) || [],
        top20Keywords: generateGraph(topBy(allKeywords)) || [],
        top50Keywords: generateGraph(topBy(allKeywords, 50)) || []
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsightViewer);

