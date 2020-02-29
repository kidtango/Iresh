import _ from 'lodash';

// Adapted to work with IRIS MVP3.1
export const getRiskProfileAdapter = (responseData) => {
    if(responseData && responseData.riskBuckets) {
        _.each(responseData.riskBuckets, (riskBucket, idx) => {
            riskBucket.risks = _.map(riskBucket.risks, risk => { 
                return _.assign(risk.pppRisk, risk.severityLikelihoodRisk, risk.risk);
            });
            responseData.riskBuckets[idx] = riskBucket; 
        })
    }
    return responseData;
}