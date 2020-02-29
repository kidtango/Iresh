import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/KnowledgeTreeForms.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SubsurfaceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highNaturalFlowPotential: undefined,
            flowingTemperature: '',
            flowingPresure: '',
            productionProfile: ''
        };
    }

    saveForm() {
        this.props.saveSubsurfaceForm({
            highNaturalFlowPotential: this.state.highNaturalFlowPotential,
            flowingTemperature: this.state.flowingTemperature + ' °C',
            flowingPresure: this.state.flowingPresure + ' bara',
            productionProfile: this.state.productionProfile
        });
    }

    onTextFieldChange(key, value) {
        let stateObj = {};
        stateObj[key] = value;
        this.setState(stateObj);
    }

    onHighNaturalFlowPotential() {
        this.setState({ highNaturalFlowPotential: !this.state.highNaturalFlowPotential });
    }

    onProductionProfileChange() {
        this.setState({ productionProfile: 'loaded' });
    }

    render() {
        return (
            <div className="SubsurfaceForm knowledgeTreeForm">
                <FormControlLabel
                    control={<Checkbox onChange={() => this.onHighNaturalFlowPotential()} value={this.state.highNaturalFlowPotential} />}
                    label="High Natural Flow Potential"
                />
                <br />
                <TextField
                    label="Flowing Temperature (°C):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('flowingTemperature', e.target.value)}
                    value={this.state.flowingTemperature}
                />
                <br />
                <TextField
                    label="Flowing Pressure (bara):"
                    id="simple-start-adornment"
                    className=""
                    onChange={(e) => this.onTextFieldChange('flowingPresure', e.target.value)}
                    value={this.state.flowingPresure}
                />
                <br />
                <div>
                    <label>Production profile</label>
                    <br />
                    <input type="file" onChange={() => this.onProductionProfileChange()}></input>
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

export default SubsurfaceForm;