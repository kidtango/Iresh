import { connect } from 'react-redux';
import RiskStreamList from '../components/RiskStreamList';
import * as RiskStreamListActions from '../actions/riskStreamList';
import * as modalActions from '../actions/modal';
import _ from 'lodash';
import matrixConfig from '../lib/matrixConfig';

const setRisksColors = (risks) => _.map(risks, r => {
    r.color = matrixConfig.matrix3x3.matMapColors[r.severity-1][r.likelihood-1];
    return r;
});

const getFilteredRisks = (state) => {
    let filteredRisks = [];
    if (state.riskProfilesList.riskProfile) {
        if (state.riskMatrix.selectedRisks && state.riskMatrix.selectedRisks.length){
            _.each(state.riskMatrix.selectedRisks, r => {
                if (
                    (_.intersection(state.keywordsViewer.selectedKeywords, r.keywords)).length &&
                    state.riskProfilesList.riskProfile.riskDisciplines[r.discipline.name].selected
                ) {
                    filteredRisks.push(r);
                }
            });
        } else {
            _.each(state.riskProfilesList.riskProfile.riskBuckets, rb => {
                _.each(rb.risks, r => {
                    if (
                        (_.intersection(state.keywordsViewer.selectedKeywords, r.keywords)).length &&
                        state.riskProfilesList.riskProfile.riskDisciplines[r.discipline.name].selected
                    ) {
                        filteredRisks.push(r);
                    }
                });
            });
        }
    }

    // filteredRisks = _.orderBy(filteredRisks, 'confidenceLevel', 'asc');
    filteredRisks = _.orderBy(filteredRisks, state.riskStreamList.attr || 'confidenceLevel', state.riskStreamList.order || 'asc');
    return setRisksColors(filteredRisks);
};

const mapDispatchToProps = dispatch => ({
    editRisk: r => dispatch(modalActions.showEditRiskModal(r)),
    orderRiskStreamItems: (attr, order) => dispatch(RiskStreamListActions.orderRiskStreamItems(attr, order))
});

const mapStateToProps = state => {
    return {
        order: state.riskStreamList.order,
        attr: state.riskStreamList.attr,
        risks: getFilteredRisks(state),
        contributors: state.riskMatrix.bucketContributors
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RiskStreamList);