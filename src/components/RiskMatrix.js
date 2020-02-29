import React from 'react';
import { Component } from "react";
import Grid from '@material-ui/core/Grid';
import '../styles/RiskMatrix.css';
import _ from 'lodash';


class RiskMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rbClasses: this.generateRbClassesTemplate(),
        };
    }

    generateRbClassesTemplate(){
        let newRbClasses = {};
        _.each(this.props.matrixConfig.matMapColors, (row, ridx) => {
            _.each(row, (col, cidx) => newRbClasses[ridx+','+cidx] = '');
        });
        return newRbClasses;
    }

    selectRiskBucket(severityIdx, likelihoodIdx) {
        const isSelectedRb = this.state.rbClasses[severityIdx+','+likelihoodIdx] === 'selected';
        const currentRB = this.props.mappedMatrix[severityIdx+','+likelihoodIdx];
        let newRbClasses = {...this.state.rbClasses};
        _.map(this.state.rbClasses, (rbc, key) => {
            if (severityIdx+','+likelihoodIdx === key)
                newRbClasses[key] = isSelectedRb ?  '' : 'selected';
            else
                newRbClasses[key] = isSelectedRb ? '' : 'faded';
        });

        let risks = currentRB.risks;
        if (isSelectedRb) {
            risks = [];
        }
        this.props.showRisks(risks);
        this.setState({ rbClasses: newRbClasses });
    }

    getFilledBucked(severityIdx, likelihoodIdx) {
        let emptyBucket = {
            risks: [],
            filteredNumberOfLowConfidenceRisks: 0,
            filteredAverageConfidenceLevel: 0,
        };
        let mappedBucketKey = severityIdx+','+likelihoodIdx;
        let bucket = this.props.mappedMatrix[mappedBucketKey] || emptyBucket;
        
        let bucketColor = this.props.mappedMatrix[mappedBucketKey] ? this.props.mappedMatrix[mappedBucketKey].colorClass : this.props.matrixConfig.matMapColors[severityIdx][likelihoodIdx];
        
        return (
            <div key={mappedBucketKey} className={`${this.state.rbClasses[mappedBucketKey] || ''} matrixCell ${bucketColor}`} onClick={(bucket.risks.length) ? () => this.selectRiskBucket(severityIdx, likelihoodIdx) : () => { }}>
                {
                    (bucket) ?
                        (<React.Fragment>
                            {
                                bucket.filteredNumberOfLowConfidenceRisks > 0 &&
                                <div className="lowPresicion">{bucket.filteredNumberOfLowConfidenceRisks}</div>
                            }
                            <div className="ocurrences">{bucket.filteredNumberOfRisks || 0}</div>
                            <div className="certainity">{bucket.filteredAverageConfidenceLevel || '0%'}</div>
                        </React.Fragment>)
                        :
                        (<React.Fragment>
                            <div className="ocurrences">0</div>
                            <div className="certainity">0%</div>
                        </React.Fragment>)
                }
            </div>
        );
    }

    render() {
        
        return (
           
                    <div className="riskMatrix">
                        <div>
                            <div className="compoundRiskIndicator">
                                <div>Compound risk {this.props.filteredCompoundRisk}</div>
                                <div className="triangle" style={{ left: this.props.filteredCompoundRisk }}></div>
                                <div className="bar"></div>
                            </div>
                            <br />
                            <div className="riskMatrixChart">
                                <div className="severityTitle">Severity</div>
                                <Grid item xs={12} className="matrixRow">
                                    <div className="rowTitle">H</div>
                                    {this.getFilledBucked(2, 0)}
                                    {this.getFilledBucked(2, 1)}
                                    {this.getFilledBucked(2, 2)}
                                </Grid>
                                <Grid item xs={12} className="matrixRow">
                                    <div className="rowTitle">M</div>
                                    {this.getFilledBucked(1, 0)}
                                    {this.getFilledBucked(1, 1)}
                                    {this.getFilledBucked(1, 2)}
                                </Grid>
                                <Grid item xs={12} className="matrixRow">
                                    <div className="rowTitle">L</div>
                                    {this.getFilledBucked(0, 0)}
                                    {this.getFilledBucked(0, 1)}
                                    {this.getFilledBucked(0, 2)}
                                </Grid>
                                <Grid item xs={12} className="matrixRow headerRow">
                                    <div className="colTitle">
                                        1
                                            </div>
                                    <div className="colTitle">
                                        2
                                            </div>
                                    <div className="colTitle">
                                        3
                                            </div>
                                </Grid>
                            </div>
                            <div className="probabilityTitle">Probability</div>
                        </div>
                 
            </div>
        );

    }
}

export default RiskMatrix;