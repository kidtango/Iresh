import { connect } from 'react-redux'
import * as riskProfileActions from '../actions/riskProfilesList';
import RiskProfileList from '../components/RiskProfilesList';
import _ from 'lodash';
import * as appActions from '../actions/app';

const mapStateToProps = state => {
  return {
    csvFiles: state.riskProfilesList.csvFiles || [],
    riskProfile: state.riskProfilesList.riskProfile ? complementRiskProfileInfo(defineRiskDisciplines(state.riskProfilesList.riskProfile)) : [],
    riskDisciplines: state.riskDisciplines || [],
    loadingRiskProfile: state.riskProfilesList.loadingRiskProfiles
  }
};

const defineRiskDisciplines = riskProfile => {
  let riskDisciplines = _.chain(riskProfile.riskBuckets).map(riskBucket => {
    return _.map(riskBucket.risks, r => {
      return r.discipline.name || r.discipline.name;
    });
  }).flatten().uniq().map(discipline => ({ name: discipline, selected: true })).keyBy('name').value();
  riskProfile.riskDisciplines = _.assign({}, riskDisciplines, riskProfile.riskDisciplines);
  return riskProfile;
};

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: csvFile => dispatch(riskProfileActions.uploadCsvFile(csvFile)),
    toggleRiskDiscipline: rd => dispatch(riskProfileActions.toggleRiskDiscipline(rd)),
    updateRiskProfile: riskProfile => {
      return dispatch(riskProfileActions.riskProfileLoaded(defineRiskDisciplines(riskProfile)));
    },
    filterDisciplines: text => {
      return dispatch(riskProfileActions.filterRiskDisciplines(text));
    },
    setApolloClient: client => {
      return dispatch(appActions.setApolloClient(client));
    },
    uploadRisks: csvFile => {
      return dispatch(riskProfileActions.uploadRisks(csvFile));
    },
  };
};

const complementRiskProfileInfo = riskProfile => {
  if (riskProfile) {
    let matrixKeywordOcurrences = {};
    riskProfile.riskBuckets = _.map(riskProfile.riskBuckets, rb => {
      let rbKeywordOcurrences = {};
      _.map(rb.risks, r => {
        let keywords = [];
        _.map(r.contributors, c => {
          if (c.weight > 0 && c.featureName !== 'id' && (c.featureValue.length > 1) && /\w+/.test(c.featureValue) && !/[^\x20-\x7E]+/g.test(c.featureValue)) {
            keywords.push(c.featureValue);
          }
        });

        r.severity = r.severity || rb.severity;
        r.likelihood = r.likelihood || rb.likelihood;
        r.keywords = _.uniq(keywords);

        _.each(_.uniq(r.keywords), kw => {
          if (!rbKeywordOcurrences[kw])
            rbKeywordOcurrences[kw] = { ocurrences: 0, hide: false };
          rbKeywordOcurrences[kw].ocurrences = (rbKeywordOcurrences[kw].ocurrences || 0) + 1;
          if (!matrixKeywordOcurrences[kw])
            matrixKeywordOcurrences[kw] = { ocurrences: 0, hide: false };
          matrixKeywordOcurrences[kw].ocurrences = (matrixKeywordOcurrences[kw].ocurrences || 0) + 1;
        });
        
        return r;
      });
      rb.keywordOcurrences = rbKeywordOcurrences;
      return rb
    });
    riskProfile.keywordOcurrences = matrixKeywordOcurrences;
  }
  return riskProfile;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiskProfileList);
