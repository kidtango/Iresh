import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import '../styles/Modal.css';
import '../styles/RiskCard.css';
import Paper from '@material-ui/core/Paper';
import { Component } from "react";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import MiniMatrix from './MiniMatrix';

// function SimpleModal(this.props, context) {

class SimpleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            riskTitle: false,
            riskDescription: false,
            riskConsequence: false,
            riskCause: false,
            editedRisk: null
        };
    }

    toggleExpandRiskDetail = (riskDetailName) => {
        let stateProp = {};
        stateProp[riskDetailName] = !this.state[riskDetailName];
        this.setState(state => stateProp);
    };

    nextRisk() {
        let nextRiskIdx = this.props.selectedRiskIdx + 1;
        if (nextRiskIdx < this.props.risks.length)
            this.props.changeShownRisk(nextRiskIdx);
    }

    prevRisk() {
        let nextRiskIdx = this.props.selectedRiskIdx - 1;
        if (nextRiskIdx >= 0)
            this.props.changeShownRisk(nextRiskIdx);
    }

    changeRiskMatrixScore(scoreObj) {  
        this.setState({editedRisk: {...this.props.risks[this.props.selectedRiskIdx], ...scoreObj}});
    }

    render() {
        let r = this.props.risks[this.props.selectedRiskIdx];
        
        if (r)
            return (
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.showModal}
                    onClose={this.props.closeModal}
                >
                    <div className="modalWindow">

                        {
                            !this.props.hideLowConfidenceElements &&
                            (
                                <Typography variant="h6" id="modal-title">
                                    SME Feedback
                                    <span class="lowConfidenceRiskCounter">
                                        {this.props.selectedRiskIdx + 1} / {this.props.risks.length}
                                    </span>
                                </Typography>
                            )
                        }

                        <Typography variant="subtitle1" id="simple-modal-description">
                            {this.props.selectedRisk}
                        </Typography>
                        <Paper className={r.color + " coloredPaper"}>
                            <div className="description">
                                <div aria-describedby="matrixScores" className="matrixScores">
                                    <MiniMatrix likelihood={r.likelihood} severity={r.severity} confidence={r.confidenceLevel} changeRiskMatrixScore={this.changeRiskMatrixScore.bind(this)} detailed />
                                </div>
                                <div>
                                    <label className="riskWordsMatched title">
                                        <b>Title:</b>
                                        <textarea defaultValue={r.title}/>
                                    </label>
                                    <label className="riskWordsMatched">
                                        <b>Description:</b>
                                        <textarea defaultValue={r.description}/>
                                    </label>
                                    <label className="riskWordsMatched">
                                        <b>Cause:</b>
                                        <textarea defaultValue={r.cause}/>
                                    </label>
                                    <label className="riskWordsMatched">
                                        <b>Consequence:</b>
                                        <textarea defaultValue={r.consequence}/>
                                    </label>
                                </div>
                            </div>
                        </Paper>
                        <div className="buttonsContainer">
                            <Button onClick={()=>this.props.closeModal()} variant="contained" size="small" className="closeButton">
                                X
                            </Button>
                            <Button onClick={()=>this.props.sendSMEFeedback(this.state.editedRisk || this.props.risks[this.props.selectedRiskIdx], this.props.userProfile)} variant="contained" size="small" className="saveButton">
                                <SaveIcon/>
                            </Button>
                        </div>
                    </div>
                </Modal >
            );
        else
            return <div />;
    }

};

export default SimpleModal;