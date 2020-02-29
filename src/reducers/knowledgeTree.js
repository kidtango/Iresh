const knowledgeTree = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_KNOWLEDGE_SOURCE_FORMS':
            return {
                ...state,
                sourceFormsVisible: action.sourceFormsVisible
            };
        case 'SAVE_KNOWLEDGE_SOURCE_GENERALITIES_FORM':
            return {
                ...state,
                generalitiesFormData: action.generalitiesFormData
            };
        case 'SAVE_KNOWLEDGE_SOURCE_ENVIRONMENTAL_CONDITIONS_FORM':
            return {
                ...state,
                environmentalConditionsFormData: action.environmentalConditionsFormData
            };
        case 'SAVE_KNOWLEDGE_SOURCE_PRODUCTION_FLUIDS_FORM':
            return {
                ...state,
                productionFluidsFormData: action.productionFluidsFormData
            }
        case 'SAVE_KNOWLEDGE_SOURCE_SUBSURFACE_FORM':
            return {
                ...state,
                subsurfaceFormData: action.subsurfaceFormData
            }
        case 'SET_OFFSHORE_TRENDS':
            return {
                ...state,
                offshoreTrends: action.offshoreTrends
            }
        case 'KNOWLEDGE_SOURCE_FORMS_SAVED':
            return {
                ...state,
                knowledgeSourcesSaved: true
            };
        default:
            return state;
    }
};

export default knowledgeTree;