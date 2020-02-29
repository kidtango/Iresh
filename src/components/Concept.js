import React from 'react';
import LoadingMask from './LoadingMask';
import _ from 'lodash';
import '../styles/TopConcept.css';
import medal from '../assets/goldMedal.png';

class Concept extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null
        };
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    };

    getImage(conceptDiagramUrl) {
        let url = conceptDiagramUrl;
        let options = {
            method: 'GET',
            headers: new Headers(this.props.authHeaders),
            mode: 'cors',
            cache: 'default'
        };
        let request = new Request(url);

        fetch(request, options).then((response) => {
            response.arrayBuffer().then((buffer) => {
                this.setState({ imgSrc: 'data:image/jpeg;base64,' + this.arrayBufferToBase64(buffer) });
            });
        });
    }

    componentDidMount() {
        if (this.props.conceptData && this.props.conceptData.concept.conceptDiagramUrl)
            this.getImage(this.props.conceptData.concept.conceptDiagramUrl);
    }

    getHumanReadableText(key) {
        return ({
            oilProduction: 'Oil Production',
            gasProduction: 'Gas Production',
            waterInjection: 'Water Injection',
            gasInjection: 'Gas Injection',
            subsea: 'Subsea Wells',
            dryTree: 'Dry Trees',
            singleWaterInjectionFlowline: 'Single Water Injection Flowline',
            multipleWaterInjectionFlowlines: 'Multiple Water Injection Flowlines',
            singleGasInjectionFlowline: 'Single Gas Injection Flowline',
            multipleGasInjectionFlowlines: 'Multiple Gas Injection Flowlines',
            semisubmersible: 'Semisubmersible',
            submersible: 'Submersible',
            tlp: 'TLP',
            fpso: 'FPSO',
            fpu: 'FPU',
            spar: 'SPAR',
            oilOffloading: 'Oil Offloading',
            oilExportLine: 'Oil Export Line',
            gasExportLine: 'Gas Export Line',
            condensateExportLine: 'Condensate Export Line'
        })[key];
    }

    getFlagsText(entity) {
        let words = [];
        let omitKeys = 'id producer injector __typename offshore onshore';
        _.map(entity, (v, k) => {
            if (omitKeys.indexOf(k) === -1 && v) {
                words.push(this.getHumanReadableText(k));
            }
        });
        return words.join(' ');
    }

    render() {
        let cd = this.props.conceptData;
        let oc = cd.concept.offshoreConcept;

        return (
            <div className="topConcept widget">
                <div className="topConceptContainer">

                    <div className="schema">
                        {
                            this.state.imgSrc ?
                                <div className="numericalIndicators">
                                    <div className="compoundScore">
                                        <span>{cd.compoundScore.toFixed(2)}</span>
                                    </div>
                                    <div className="ranking">
                                        <div className="medalContainer">
                                            <img src={medal} alt="medal" />
                                            <span>{this.props.idx + 1}</span>
                                        </div>
                                    </div>
                                    <img src={this.state.imgSrc} alt={"concept" + (this.props.idx + 1)} />
                                </div>
                                :
                                <LoadingMask show={!this.state.imgSrc} />
                        }
                    </div>
                    <div className="wellTypesList">
                        <div className="wellTypesListTitle">
                            Well Types:
                        </div>
                        {
                            _.map(oc.wellTypes, (wt) => {
                                let text = this.getFlagsText(wt);

                                return text ?
                                    <div>{text}</div> :
                                    null
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className="allBarIndicatorsContainer">
                        <div className=" indicatorBarContainer">
                            <div className="title">Compound Score</div>
                            <div className="standarizationBar indicatorBar">
                                <div className="indicatorTriangle" style={{ left: cd.compoundScore * 100 + '%' }}></div>
                            </div>
                        </div>
                        <div className="operabilityContainer indicatorBarContainer">
                            <div className="title">Operability</div>
                            <div className="operabilityBar indicatorBar">
                                <div className="indicatorTriangle" style={{ left: cd.operabilityScore * 100 + '%' }}></div>
                            </div>
                        </div>
                        <div className="standarizationContainer indicatorBarContainer">
                            <div className="title">Fabrication</div>
                            <div className="standarizationBar indicatorBar">
                                <div className="indicatorTriangle" style={{ left: cd.fabricationScore * 100 + '%' }}></div>
                            </div>
                        </div>
                        <div className="operabilityContainer indicatorBarContainer">
                            <div className="title">Time to Production</div>
                            <div className="operabilityBar indicatorBar">
                                <div className="indicatorTriangle" style={{ left: cd.timeToProductionScore * 100 + '%' }}></div>
                            </div>
                        </div>
                        <div className="operabilityContainer indicatorBarContainer">
                            <div className="title">Reliability</div>
                            <div className="operabilityBar indicatorBar">
                                <div className="indicatorTriangle" style={{ left: cd.reliabilityScore * 100 + '%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="scoresContainer">
                        <div className="technical">
                            <div className="technicalInfo">
                                <div className="technicalInfoContainer">
                                    <div className="technicalDetail">
                                        <div className="subTitle title">
                                            Production Network:
                                    </div>
                                        {oc.productionNetworkType.name}
                                        <br />
                                        <div className="subTitle title">
                                            Water Injection Network:
                                    </div>
                                        {this.getFlagsText(oc.waterInjectionNetworkType)}
                                        <br />
                                        <div className="subTitle title">
                                            Gas Injection Network:
                                    </div>
                                        {this.getFlagsText(oc.gasInjectionNetworkType)}
                                        <br />
                                        <div className="subTitle title">
                                            Facility Type:
                                    </div>
                                        {this.getFlagsText(oc.facilityType.hub)}
                                        <br />
                                        {this.getFlagsText(oc.facilityType.exportType)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Concept;

