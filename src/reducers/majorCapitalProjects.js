const majorCapitalProjects = (state = {
    majorCapitalProjects: []
}, action) => {
    switch (action.type) {
        case 'SET_ALL_MAJOR_CAPITAL_PROJECTS':
            return {
                ...state,
                majorCapitalProjects: action.majorCapitalProjects
            };
        case 'SELECT_MAJOR_CAPITAL_PROJECT':
            return {
                ...state,
                selectedMajorCapitalProject: action.majorCapitalProject
            };
        case 'SET_SELECTED_MAJOR_CAPITAL_PROJECT_CONCEPTS':
            return {
                ...state,
                selectedCapitalProjectConcepts: action.selectedCapitalProjectConcepts
            };
        default:
            return state;
    }
};

export default majorCapitalProjects;