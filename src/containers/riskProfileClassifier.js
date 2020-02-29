import RiskProfileClassifier from '../components/RiskProfileClassifier';
import * as riskProfileActions from '../actions/riskProfilesList';
import {connect} from 'react-redux';
import _ from 'lodash';

const mapStateToProps = state => {
    let mainWidgetsState = {
        risk: {
            riskDisciplines: false,
            riskProfile: false,
            riskKnowledgeKeywords: false,
            riskInsightViewer: false,
            riskStream: false
        },
        technical: {
            knowledgeSources: false,
            topConcept: false,
            concept16b: false,
            concept32: false
        },
        business: {
            NPVStochastic: false,
            NPVConceptSelection: false
        }
    };

    _.each(mainWidgetsState[state.app.knowledgeSource], (value, key) => {
        mainWidgetsState[state.app.knowledgeSource][key] = true;
    });

    return {
        mainWidgetsState,
        riskProfile: state.riskProfilesList.riskProfile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRiskProfile: () => {
            return dispatch(riskProfileActions.getRiskProfile());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RiskProfileClassifier);