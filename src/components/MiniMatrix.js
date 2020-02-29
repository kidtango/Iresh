import React from 'react';
import { Component } from "react";
import '../styles/MiniMatrix.css';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import matrixConfig from '../lib/matrixConfig';

class MiniMatrix extends Component {

    matMapColors = matrixConfig.matrix3x3.matMapColors;
    severiyEquivalence = matrixConfig.matrix3x3.severityEquivalence;
    
    constructor(props){
        super(props);
        this.state = {
            severity: props.severity-1,
            likelihood: props.likelihood-1
        };
    }

    populateMatrixMap(){
        let matMap = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        matMap[this.state.severity][this.state.likelihood] = 'selected';
       
        return matMap;
    }

    getCellColor(){
        return this.matMapColors[this.state.severity][this.state.likelihood];
    }

    getSeverityEquivalence(){
        return this.severiyEquivalence[this.state.severity];
    }

    componentDidUpdate(prevProps) {
        if(prevProps.severity !== this.props.severity || prevProps.likelihood !== this.props.likelihood)
            this.setState({severity: this.props.severity - 1, likelihood: this.props.likelihood - 1});
    }

    selectCell(severity, likelihood){
        let newScore = {severity, likelihood};
        this.setState(newScore);
        this.props.changeRiskMatrixScore(newScore);
    }

    render() {
        let matMap = this.populateMatrixMap();
        let confidenceText = parseInt(this.props.confidence * 100) + '%';

        if(this.props.detailed){
            return (<div className="miniMatrix detailed">
                <div className="row">
                    <div onClick={() => this.selectCell(2,0)} className={`cell yellow ${matMap[2][0]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(2,1)} className={`cell red ${matMap[2][1]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(2,2)} className={`cell red ${matMap[2][2]}`}><CheckCircleOutline/></div>
                </div>
                <div className="row">
                    <div onClick={() => this.selectCell(1,0)} className={`cell green ${matMap[1][0]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(1,1)} className={`cell yellow ${matMap[1][1]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(1,2)} className={`cell red ${matMap[1][2]}`}><CheckCircleOutline/></div>
                </div>
                <div className="row">
                    <div onClick={() => this.selectCell(0,0)} className={`cell green ${matMap[0][0]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(0,1)} className={`cell green ${matMap[0][1]}`}><CheckCircleOutline/></div>
                    <div onClick={() => this.selectCell(0,2)} className={`cell yellow ${matMap[0][2]}`}><CheckCircleOutline/></div>
                </div>
                <div className="row">
                    Prediction confidence: {confidenceText}
                </div>
            </div>);
        } else {
            return (
                <div className="miniMatrix simplified">
                    <div className="row">
                        <div className="cell severity">{this.getSeverityEquivalence()}</div>
                        <div className={`cell colored ${this.getCellColor()}`}>{confidenceText}</div>
                    </div>
                    <div className="row">
                        <div className="cell notUsed"></div>
                        <div className="cell probability">{this.props.likelihood}</div>
                    </div>
                </div>
            );
        }
    }
}

export default MiniMatrix;