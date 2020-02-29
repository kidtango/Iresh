import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/KnowledgeTreeForms.css';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Polygons from './Polygons';
import _ from 'lodash';

class GeneralitiesForm extends React.Component {

    constructor(props) {
        super(props);
        this.mapContainerRef = React.createRef();
        this.state = {
            center: [props.center.latitude, props.center.longitude],
            marker: null,
            zoom: 6,
            provider: 'wikimedia',
            metaWheelZoom: false,
            twoFingerDrag: false,
            animate: true,
            animating: false,
            zoomSnap: true,
            mouseEvents: true,
            touchEvents: true,
            minZoom: 1,
            maxZoom: 18,
            dragAnchor: [48.8565, 2.3475],
            mapWidth: 0,
            onshoreOffshore: 'onshore',
            upstreamDownstream: 'upstream',
            oilGas: 'oil',
            capitalProject: '',
            coords: []
        };
        this.geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        this.timerMapResizer = null;
        // one second after every window resize event to recalculate map width
        this.RESIZER_OFFSET = 500;
    }

    handleClick = ({ event, latLng, pixel }) => {
        this.setState({ marker: latLng, coords: [...this.state.coords, latLng] });
    }

    resizeMapCanvas() {
        let element = this.mapContainerRef.current;

        if (element) {
            this.setState({ mapWidth: element.offsetWidth });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.sourceFormsVisible && this.props.sourceFormsVisible) {
            this.resizeMapCanvas();
        }
    }

    componentDidMount() {
        this.props.getOffshoreTrends();
        window.addEventListener('resize', () => {
            this.timerMapResizer = setTimeout(() => () => {
                clearTimeout(this.timerMapResizer);
                this.resizeMapCanvas();
            }, this.RESIZER_OFFSET);
        });
    }

    saveForm() {
        this.props.saveGeneralitiesForm({
            latLng: this.state.marker,
            onshoreOffshore: this.state.onshoreOffshore,
            upstreamDownstream: this.state.upstreamDownstream,
            oilGas: this.state.oilGas,
            capitalProject: this.state.capitalProject
        });
    }

    changeRadioBtnState(prop, value) {
        let propObj = {};
        propObj[prop] = value;
        this.setState(propObj);
    }

    onCapitalProjectTextChange(e) {
        this.setState({ capitalProject: e.target.value });
    }

    getPolygonShapes(){
        let shapes = {};
        
        _.each(this.props.offshoreTrends, (trend) => {
            let coords = _.map(trend.boundary, b => [b.latitude, b.longitude]);
            
            shapes[trend.name] = {
                id: trend.id,
                coords,
                /*
                color: 'rgb(0,0,255)',
                */
                strokeColor: 'rgb(0,0,0)',
                strokeWidth: '2px',
                strokeDasharray: '8,8',
                /*
                label: {
                    color: 'rgb(255,255,255)',
                    fontSize: '12px'
                }
                */
            };
            
        });
        
        return shapes;
    }

    /*
    {
                            'Miocene Trend': {
                                coords: [
                                    [28.1768, -93.4788],
                                    [28.4089, -92.8635],
                                    [28.2348, -92.2483],
                                    [28.5055, -90.8201],
                                    [28.7562, -89.7874],
                                    [28.9295, -88.6667],
                                    [28.1574, -88.4910],
                                    [27.8081, -89.7214],
                                    [27.8470, -91.1936],
                                    [27.7372, -91.7479],
                                    [27.8237, -92.0555],
                                    [27.5902, -92.5169],
                                    [27.5513, -93.3958]
                                ],
                                color: 'rgb(255,0,0)',
                                strokeColor: 'rgb(0,0,0)',
                                strokeWidth: '2px',
                                strokeDasharray: '8,8',
                                label: {
                                    coords: [28.0469, -91.5673],
                                    color: 'rgb(255,255,255)',
                                    fontSize: '12px'
                                }
                            },
                            'Lower Tertiary Trend': {
                                coords: [
                                    [27.8081, -89.7214],
                                    [27.8470, -91.1936],
                                    [27.7372, -91.7479],
                                    [27.8237, -92.0555],
                                    [27.5902, -92.5169],
                                    [27.5513, -93.3958],
                                    [27.3621, -93.7707],
                                    [27.1081, -94.4519],
                                    [27.1081, -94.9133],
                                    [26.9124, -95.2649],
                                    [26.8340, -95.7922],
                                    [26.3821, -96.0559],
                                    [25.9285, -95.8581],
                                    [25.8296, -95.3528],
                                    [25.9878, -94.5178],
                                    [26.3230, -94.0344],
                                    [26.5395, -93.3533],
                                    [26.4412, -92.6721],
                                    [26.3624, -92.1887],
                                    [26.4608, -91.3318],
                                    [26.6181, -90.5408],
                                    [27.2449, -89.9695],
                                    [27.8683, -89.6838]
                                ],
                                color: 'rgb(100,0,255)',
                                strokeColor: 'rgb(0,0,0)',
                                strokeWidth: '2px',
                                strokeDasharray: '8,8',
                                label: {
                                    coords: [26.9124,  -92.7778],
                                    color: 'rgb(255,255,255)',
                                    fontSize: '12px'
                                }
                            },
                        }
        */

    render() {
        const { center, zoom, animate, metaWheelZoom, twoFingerDrag, zoomSnap, mouseEvents, touchEvents, minZoom, maxZoom } = this.state;
        
        
        return (
            <div className="GeneralitiesForm knowledgeTreeForm">
                <TextField
                    label="Capital Project:"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onCapitalProjectTextChange(e)}
                    value={this.state.capitalProject}
                />
                <br />
                <label>Topology:</label>
                <br />
                <ButtonGroup variant="contained" size="small" aria-label="Small contained button group" className="ProjectProps">
                    <Button className={this.state.onshoreOffshore === 'onshore' && 'selected'} onClick={() => this.changeRadioBtnState('onshoreOffshore', 'onshore')}>Onshore</Button>
                    <Button className={this.state.onshoreOffshore === 'offshore' && 'selected'} onClick={() => this.changeRadioBtnState('onshoreOffshore', 'offshore')}>Offshore</Button>
                    <Button className={this.state.upstreamDownstream === 'upstream' && 'selected'} onClick={() => this.changeRadioBtnState('upstreamDownstream', 'upstream')}>Upstream</Button>
                    <Button className={this.state.upstreamDownstream === 'downstream' && 'selected'} onClick={() => this.changeRadioBtnState('upstreamDownstream', 'downstream')}>Downstream</Button>
                    <Button className={this.state.oilGas === 'oil' && 'selected'} onClick={() => this.changeRadioBtnState('oilGas', 'oil')}>Oil</Button>
                    <Button className={this.state.oilGas === 'gas' && 'selected'} onClick={() => this.changeRadioBtnState('oilGas', 'gas')}>Gas</Button>
                </ButtonGroup>
                <br />
                <div>
                    <div>lat: {this.state.marker && this.state.marker[0].toFixed(4)}</div>
                    <div>long: {this.state.marker && this.state.marker[1].toFixed(4)}</div>
                </div>
                <br />
                <div className="mapContainer" ref={this.mapContainerRef}>
                    <Map
                        className="pigeonMap"
                        limitBounds='edge'
                        center={center}
                        zoom={zoom}
                        dprs={[1, 2]}
                        onBoundsChanged={this.handleBoundsChange}
                        onClick={this.handleClick}
                        onAnimationStart={this.handleAnimationStart}
                        onAnimationStop={this.handleAnimationStop}
                        animate={animate}
                        metaWheelZoom={metaWheelZoom}
                        twoFingerDrag={twoFingerDrag}
                        zoomSnap={zoomSnap}
                        mouseEvents={mouseEvents}
                        touchEvents={touchEvents}
                        minZoom={minZoom}
                        maxZoom={maxZoom}
                        width={this.state.mapWidth || 0} height={400}>
                        {
                            this.state.marker && <Marker anchor={[this.state.marker[0], this.state.marker[1]]} payload={1} onClick={({ event, anchor, payload }) => { }} />
                        }
                        <Polygons shapes={this.getPolygonShapes()} />
                    </Map>
                </div>
                <br />
                <br />
                <Button variant="contained" size="small" onClick={() => this.saveForm()}>Save</Button>
                <br />
                <br />
            </div>
        );
    }
}

export default GeneralitiesForm;