import { getAllMajorCapitalProjectsQuery, givenMCPIDWhatAreConceptsQuery } from '../lib/queries';

export const selectMajorCapitalProject = majorCapitalProject => {
    return async (dispatch, getState) => {
        const { app } = getState();
        let response; 
        
        dispatch({
            type: 'SELECT_MAJOR_CAPITAL_PROJECT',
            majorCapitalProject
        });

        try {
            response = await app.otherApolloClients.technical.query({
                query: givenMCPIDWhatAreConceptsQuery(majorCapitalProject.id),
                fetchResults: true,
                fetchPolicy: 'network-only' 
            });
        
            dispatch({
                type: 'SET_SELECTED_MAJOR_CAPITAL_PROJECT_CONCEPTS',
                selectedCapitalProjectConcepts: response.data.givenMCPIDWhatAreConcepts
            });

        } catch (e) {
            console.error(e);
            response = await e;
        }
    };
};

export const getAllMajorCapitalProjects = () => {
    return async (dispatch, getState) => {
        const { app } = getState();
        let response; 
        try {
            response = await app.otherApolloClients.technical.query({
                query: getAllMajorCapitalProjectsQuery(200, 0),
                fetchResults: true,
                fetchPolicy: 'network-only'
            });

            dispatch({
                type: 'SET_ALL_MAJOR_CAPITAL_PROJECTS',
                majorCapitalProjects: response.data.allMajorCapitalProjects
            });
        } catch (e) {
            console.error(e);
            response = await e;
        }
    };    
};
