import { connect } from 'react-redux';
import RiskMatrix from '../components/RiskMatrix';
import * as riskMatrixActions from '../actions/riskMatrix';
import _ from 'lodash';
import matrixConfig from '../lib/matrixConfig';

const configureRiskBuckets = state => {
  let matrix3x3 = new Array(6);

  // let matrix6x6 = new Array(12);

  if (!state.riskProfilesList.riskProfile) {
    return;
  }

  _.each(state.riskProfilesList.riskProfile.riskBuckets, (rb, idx) => {
    let hiddenRisks = 0,
      hiddenLowConfidenceRisks = 0,
      substractedConfidenceLevel = 0,
      totalConfidenceLevel = 0,
      totalCompoundRisk = 0;

    rb.risks = _.map(rb.risks, r => {
      totalConfidenceLevel += r.confidenceLevel;
      if (
        !state.riskProfilesList.riskProfile.riskDisciplines[r.discipline.name]
          .selected
      ) {
        r.hide = true;
        substractedConfidenceLevel += r.confidenceLevel;
        if (r.lowConfidence) {
          hiddenLowConfidenceRisks++;
        }
        hiddenRisks++;
      } else {
        r.hide = false;
        totalCompoundRisk += r.score;
      }
      return r;
    });

    rb.filteredNumberOfRisks = rb.numberOfRisks - hiddenRisks;
    rb.filteredNumberOfLowConfidenceRisks =
      rb.numberOfLowConfidenceRisks - hiddenLowConfidenceRisks;
    let confidenceLevelDiff =
      (totalConfidenceLevel - substractedConfidenceLevel) * 100;
    if (confidenceLevelDiff > 0) {
      rb.filteredAverageConfidenceLevel =
        Math.floor(confidenceLevelDiff / rb.filteredNumberOfRisks) + '%';
    } else {
      rb.filteredAverageConfidenceLevel = '0%';
    }
    rb.filteredScore = (totalCompoundRisk * 100) / rb.risks.length;
    matrix3x3[idx] = rb;
  });
  return matrix3x3;
};

const getFilteredCompoundRisk = state => {
  if (
    state.riskProfilesList.riskProfile &&
    state.riskProfilesList.riskProfile.riskBuckets[0].filteredScore
  ) {
    let allFilteredScores = 0;
    _.each(state.riskProfilesList.riskProfile.riskBuckets, rb => {
      allFilteredScores += rb.filteredScore;
    });
    return (
      Math.floor(
        allFilteredScores /
          state.riskProfilesList.riskProfile.riskBuckets.length
      ) + '%'
    );
  }
  return 0;
};

const mapMatrix = (riskBuckets, colorsMap) => {
  let mappedMatrix = {};
  if (riskBuckets && riskBuckets.length) {
    _.each(riskBuckets, rb => {
      if (rb) {
        let severityIdx = rb.severity - 1;
        let likelihoodIdx = rb.likelihood - 1;
        mappedMatrix[severityIdx + ',' + likelihoodIdx] = {
          ...rb,
          colorClass: colorsMap[severityIdx][likelihoodIdx]
        };
      }
    });
  }
  return mappedMatrix;
};

const mapStateToProps = state => {
  let calculatedRiskBuckets = configureRiskBuckets(state);
  return {
    filteredCompoundRisk: getFilteredCompoundRisk(state),
    mappedMatrix: mapMatrix(
      calculatedRiskBuckets,
      matrixConfig.matrix3x3.matMapColors
    ),
    matrixConfig: matrixConfig.matrix3x3
  };
};

const mapDispatchToProps = dispatch => ({
  showRisks: risks => dispatch(riskMatrixActions.showRisks(risks))
});

export default connect(mapStateToProps, mapDispatchToProps)(RiskMatrix);
