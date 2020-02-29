import * as _ from 'lodash';

const selectRiskDiscipline = (riskDisciplines, riskDiscipline) => _.map(riskDisciplines, rd => {
    if (rd.name === riskDiscipline.name) {
        rd.selected = !rd.selected;
    } 
    return rd;
});

const riskProfilesListReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPLOAD_CSV_FILE':
            return {
                ...state,
                csvFiles: _.concat(state.csvFiles, action.csvFile)
            };
        case 'RISK_PROFILE_LOADED':
            return {
                ...state,
                riskProfile: action.riskProfile,
                loadingRiskProfiles: false
            };
        case 'FILTER_RISK_DISCIPLINES':
            let riskDisciplines = [];
            if (action.textToFilter.length) {
                let regex = new RegExp(action.textToFilter, 'gi');
                riskDisciplines = _.map(state.riskProfile.riskDisciplines, rd => {
                    if (regex.test(rd.name)) {
                        rd.hide = false;
                    }
                    else {
                        rd.hide = true;
                    }
                });
            } else {
                riskDisciplines = _.map(state.riskProfile.riskDisciplines, f => { f.hide = false; });
            }
            return { ...state, riskDisciplines };
        case 'LOADING_RISK_PROFILES':
            return {
                ...state,
                loadingRiskProfiles: true
            };
        case 'TOGGLE_RISK_DISCIPLINE':
            return {
                ...state,
                riskProfile: {
                    ...state.riskProfile,
                    riskDisciplines: _.keyBy(selectRiskDiscipline(state.riskProfile.riskDisciplines, action.riskDiscipline), 'name')
                }
            };
        default:
            return state;

    }
};

export default riskProfilesListReducer;