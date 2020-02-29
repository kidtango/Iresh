import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import * as riskProfileActions from '../actions/riskProfilesList';
import * as appActions from '../actions/app';

const mapStateToProps = state => {
    return {
        knowledgeSource: state.app.knowledgeSource
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetCurrentRiskProfile: () => {
            dispatch(riskProfileActions.resetCurrentRiskProfile());
            // dispatch(riskProfileActions.reloadCurrentRiskProfileDataSet());
        },
        showMainComponentsByKnowledgeSource: knowledgeSource => {
            dispatch(appActions.showMainComponentsByKnowledgeSource(knowledgeSource));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);