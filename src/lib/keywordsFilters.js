import _ from 'lodash';
import matrixConfig from '../lib/matrixConfig';

const severityEquivalence = (sev) => {
    return matrixConfig.matrix3x3.severityEquivalence[sev-1];
}; 

export const filterByDiscipline = (risks, state) => {
    return _.filter(risks, r => {
        return state.riskProfilesList.riskProfile.riskDisciplines[r.discipline.name].selected
    });
};

export const topBy = (results, qty = 20, by = 'ocurrences') => {
    let count = 0;
    let top = _.chain(results).orderBy([by], ['desc']).filter((kwObj, kw) => {
        if (!kwObj.hide && count < qty) {
            count++;
            return true;
        }
        return false;
    }).value();
    return top;
};

export const isRelatedToSelectedLayers = (kwObj, state) => {
    return (state.keywordsViewer.selectedPPPLayers.plant && !!kwObj.plant)
        || (state.keywordsViewer.selectedPPPLayers.process && !!kwObj.process)
        || (state.keywordsViewer.selectedPPPLayers.people && !!kwObj.people);
};

export const getKeywords = state => {
    let filteredKeywordOcurrences = {};
    let rbKeywordOcurrences = {};
    let risksToEvaluate = [];
    let pppKeywordsMap = {};

    if (state.riskProfilesList.riskProfile) {

        if (state.riskMatrix.selectedRisks && state.riskMatrix.selectedRisks.length) {
            risksToEvaluate = filterByDiscipline(state.riskMatrix.selectedRisks, state);
        } else {
            risksToEvaluate = filterByDiscipline(_.flatMap(state.riskProfilesList.riskProfile.riskBuckets, rb => rb.risks), state);
        }
        _.each(risksToEvaluate, r => {
            let keywords = [];
            let currentRisk = r;
            _.each(r.contributors, c => {
                if (c.weight > 0 && c.featureName !== 'id' && (c.featureValue.length > 1) && /\w+/.test(c.featureValue) && !/[^\x20-\x7E]+/g.test(c.featureValue)) {
                    /** TODO: Consider other attributes of risks in following iterations, attrs like discipline.name */
                    if (currentRisk[c.featureName] && currentRisk[c.featureName].toLowerCase().indexOf(c.featureValue) > -1) {
                        keywords.push(c.featureValue);
                        pppKeywordsMap[c.featureValue] = {
                            plant: currentRisk.hardwareFailures.length,
                            process: currentRisk.processFailures.length,
                            people: currentRisk.peopleFailures.length,
                            bucket: severityEquivalence(currentRisk.severity)+currentRisk.likelihood,
                            matrixPos: {severity: currentRisk.severity - 1, likelihood: currentRisk.likelihood - 1}
                        };
                    }
                }
            });
            _.each(_.uniq(keywords), kw => {
                if (!rbKeywordOcurrences[kw])
                    rbKeywordOcurrences[kw] = { ocurrences: 0, hide: false };

                rbKeywordOcurrences[kw].ocurrences = (rbKeywordOcurrences[kw].ocurrences || 0) + 1;
                rbKeywordOcurrences[kw] = { ...rbKeywordOcurrences[kw], ...pppKeywordsMap[kw] };
            });
        });
        _.each(rbKeywordOcurrences, (kwObj, kw) => {
            if (state.keywordsViewer.filterText && state.keywordsViewer.filterText.length) {
                filteredKeywordOcurrences[kw] = { ...kwObj, hide: !(new RegExp(`^.*${state.keywordsViewer.filterText}.*$`, 'gi')).test(kw) };
            } else {
                filteredKeywordOcurrences[kw] = { ...kwObj, hide: false };
            }
            filteredKeywordOcurrences[kw].hide = !isRelatedToSelectedLayers(kwObj, state) || filteredKeywordOcurrences[kw].hide;
            filteredKeywordOcurrences[kw] = { ...filteredKeywordOcurrences[kw], value: kw };
        });
    }

    return filteredKeywordOcurrences;
};