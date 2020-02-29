import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/KnowledgeTreeForms.css';
import _ from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class EnvironmentalConditionsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metoceanConditions: null,
            seabedBathymetry: null,
            geoTechnicalConditions: [],
            waterDepth: '',
            seafloorDevelopmentExtension: ''
        };
        this.mapContainerRef = React.createRef();
    }
    
    onWaterDepthChange(e) {
        this.setState({ waterDepth: e.target.value });
    }

    onSeafloorDevelopmentExtensionChange(e) {
        this.setState({ seafloorDevelopmentExtension: e.target.value });
    }

    handleGeoEthicalConditins(valueToToggle){
        if( (this.state.geoTechnicalConditions || []).indexOf(valueToToggle) >= 0){
            _.pull(this.state.geoTechnicalConditions, valueToToggle);
        } else {
            this.setState({geoTechnicalConditions: _.uniq(_.concat(this.state.geoTechnicalConditions || [], valueToToggle))});
        }
    }

    saveForm(){
        this.props.saveEnvironmentalConditionsForm({
            metoceanConditions: this.state.metoceanConditions,
            seabedBathymetry: this.state.seabedBathymetry,
            geoTechnicalConditions: this.state.geoTechnicalConditions,
            waterDepth: this.state.waterDepth + ' m',
            seafloorDevelopmentExtension: this.state.seafloorDevelopmentExtension + ' acre'
        });
    }

    onMetoceanConditionsChange(){
        this.setState({'metoceanConditions': 'loaded'});
    }

    onSeabedBathymetryChange(){
        this.setState({'seabedBathymetry': 'loaded'});
    }

    render() {
        return (
            <div className="EnvironmentalConditionsForm knowledgeTreeForm">
                <TextField
                    label="Water Depth (m):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onWaterDepthChange(e)}
                    value={this.state.waterDepth}
                />
                <br />
                <TextField
                    label="Seafloor Development Extension (acre):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onSeafloorDevelopmentExtensionChange(e)}
                    value={this.state.seafloorDevelopmentExtension}
                />
                <br />
                <label>Geotechnical Conditions:</label>
                <br/>
                <FormControlLabel
                    control={<Checkbox onChange={() => this.handleGeoEthicalConditins("Canyons")} value="Canyons" />}
                    label="Canyons"
                />
                <br/>
                <FormControlLabel
                    control={<Checkbox onChange={() => this.handleGeoEthicalConditins("Escarpments")} value="Escarpments" />}
                    label="Escarpments"
                />
                <br/>
                <FormControlLabel
                    control={<Checkbox onChange={() => this.handleGeoEthicalConditins("Seismic Activity")} value="Seismic Activity" />}
                    label="Seismic Activity"
                />
                <br/>
                <FormControlLabel
                    control={<Checkbox onChange={() => this.handleGeoEthicalConditins("Geo Hazards")} value="Geo Hazards" />}
                    label="Geo Hazards"
                />
                <br />
                <div>
                    <label>Metocean Conditions</label>
                    <br />
                    <input type="file" onChange={() => this.onMetoceanConditionsChange()}></input>
                    <br />
                    <br />
                    <label>Seabed Bathymetry</label>
                    <br />
                    <input type="file" onChange={() => this.onSeabedBathymetryChange()}></input>
                    <br />
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

export default EnvironmentalConditionsForm;