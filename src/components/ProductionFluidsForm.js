import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/KnowledgeTreeForms.css';

class ProductionFluidsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            waxAppareanceTemperature: '',
            hydrateFormationPresure: '',
            fluidCharacterization: null,
            oilSpecificGravity: '',
            referenceTemperature: ''

        };
    }

    saveForm(){
        this.props.saveProductionFluidsForm({
            waxAppareanceTemperature: this.state.waxAppareanceTemperature + ' °C',
            hydrateFormationPresure: this.state.hydrateFormationPresure + ' bara',
            fluidCharacterization: this.state.fluidCharacterization,
            oilSpecificGravity: this.state.oilSpecificGravity,
            referenceTemperature: this.state.referenceTemperature + ' °C'
        });
    }

    onTextFieldChange(key, value) {
        let stateObj = {};
        stateObj[key] = value;
        this.setState(stateObj);
    }

    onFluidCharacterizationChange(){
        this.setState({fluidCharacterization: 'loaded'});
    }

    render() {
        return (
            <div className="ProductionFluidsForm knowledgeTreeForm">
                <TextField
                    label="Wax Appearance Temperature (°C):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('waxAppareanceTemperature', e.target.value)}
                    value={this.state.waxAppareanceTemperature}
                />
                <br />
                <TextField
                    label="Hydrate Formation Pressure (bara):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('hydrateFormationPresure', e.target.value)}
                    value={this.state.hydrateFormationPresure}
                />
                <br/>
                <TextField
                    label="Oil Specific Gravity (-) Optional:"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('oilSpecificGravity', e.target.value)}
                    value={this.state.oilSpecificGravity}
                />
                <br/>
                <TextField
                    label="Reference Temperature (°C) Optional:"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('referenceTemperature', e.target.value)}
                    value={this.state.referenceTemperature}
                />
                <br/>
                <div>
                    <label>Fluid characterization</label>
                    <br />
                    <input type="file" onChange={() => this.onFluidCharacterizationChange()}></input>
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

export default ProductionFluidsForm;