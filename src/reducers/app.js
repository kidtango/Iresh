const appReducer = (
    state = {
        location: {
            accuracy: 112608,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 27.3153,
            longitude: -92.6050,
            speed: null
        }
    }, 
    action
) => {
    switch (action.type) {
        case 'SET_APOLLO_CLIENT':
            return {
                ...state,
                apolloClient: action.apolloClient
            };
        case 'SET_OTHER_APOLLO_CLIENT':
            return {
                ...state,
                otherApolloClients: {
                    ...state.otherApolloClients,
                    [action.entityType]: action.apolloClient
                }
            };
        case 'SET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.userProfile
            };
        case 'SET_USER_GEOLOCATION':
            return {
                ...state, 
                location: action.location
            };
        case 'SHOW_MAIN_CONCEPT_BY_KNOWLEDGE_SOURCE':
            return {
                ...state,
                knowledgeSource: action.knowledgeSource
            };
        case 'SET_AUTH_HEADERS':
            return {
                ...state,
                authHeaders: action.headers
            };
        default:
            return state;
    }
}

export default appReducer;