import { getOffshoreTrendsQuery, MajorCapitalProjectAsInput } from '../lib/queries';
import { getAllMajorCapitalProjects } from './majorCapitalProjects';

export const showForms = isVisible => {
    return {
        type: 'SHOW_KNOWLEDGE_SOURCE_FORMS',
        sourceFormsVisible: isVisible
    }
};

export const saveGeneralitiesForm = generalitiesFormData => {
    return {
        type: 'SAVE_KNOWLEDGE_SOURCE_GENERALITIES_FORM',
        generalitiesFormData
    }
};

export const saveEnvironmentalConditionsForm = environmentalConditionsFormData => {
    return {
        type: 'SAVE_KNOWLEDGE_SOURCE_ENVIRONMENTAL_CONDITIONS_FORM',
        environmentalConditionsFormData
    }
};

export const saveProductionFluidsForm = productionFluidsFormData => {
    return {
        type: 'SAVE_KNOWLEDGE_SOURCE_PRODUCTION_FLUIDS_FORM',
        productionFluidsFormData
    }
};

export const saveSubsurfaceForm = subsurfaceFormData => {
    return {
        type: 'SAVE_KNOWLEDGE_SOURCE_SUBSURFACE_FORM',
        subsurfaceFormData
    }
};

export const saveFormsData = () => {
    return async (dispatch, getState) => {
        const { app, knowledgeTree } = getState();
        try {
            let alertText = '';
            let response = await app.otherApolloClients.technical.query({
                query: MajorCapitalProjectAsInput(knowledgeTree)
            });
            debugger;
            if(knowledgeTree.generalitiesFormData.capitalProject.length){
                alertText = '"'+knowledgeTree.generalitiesFormData.capitalProject+'"Capital Project Saved.';
            } else { 
                alertText = 'Capital Project Saved.';
            }
            alert(alertText);
            dispatch({
                type: 'KNOWLEDGE_SOURCE_FORMS_SAVED'
            });

            dispatch(getAllMajorCapitalProjects());
        } catch (e) {
            console.error(e);
        }
    };    
};

export const getOffshoreTrends = feedback => {
    return async (dispatch, getState) => {
        const { app } = getState();
        let response;
        try {
            response = await app.otherApolloClients.technical.query({
                query: getOffshoreTrendsQuery(),
                fetchResults: true,
                fetchPolicy: 'network-only'
            });
            
            dispatch({
                type: 'SET_OFFSHORE_TRENDS',
                offshoreTrends: JSON.parse(JSON.stringify(response.data.offshoreTrends))
            });
        } catch (e) {
            console.error(e);
            response = await e;
        }
        
    };
}