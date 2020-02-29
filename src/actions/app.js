import { addIRISUserQuery } from '../lib/queries';

export const setApolloClient = apolloClient => {
  return {
    type: 'SET_APOLLO_CLIENT',
    apolloClient
  };
};

export const setOtherApolloClient = (apolloClient, entityType) => {
  return {
    type: 'SET_OTHER_APOLLO_CLIENT',
    entityType,
    apolloClient
  };
};

export const setAuthHeaders = headers => {
  return {
    type: 'SET_AUTH_HEADERS',
    headers
  };
};

export const setUserProfile = userProfile => {
  return (dispatch, getState) => {
    const { app } = getState();
    try {
      app.apolloClient.query({ query: addIRISUserQuery(userProfile) });
    } catch (e) {
      console.warn(e);
    }

    dispatch({
      type: 'SET_USER_PROFILE',
      userProfile
    });
  };
};

export const setGeolocation = location => {
  return {
    type: 'SET_USER_GEOLOCATION',
    location
  };
};

export const showMainComponentsByKnowledgeSource = knowledgeSource => {
  /*
    return {
        type: 'SHOW_MAIN_CONCEPT_BY_KNOWLEDGE_SOURCE',
        knowledgeSource
    };
    */
  return (dispatch, getState) => {
    const { app } = getState();

    if (knowledgeSource === app.knowledgeSource) {
      knowledgeSource = '';
    }

    dispatch({
      type: 'SHOW_MAIN_CONCEPT_BY_KNOWLEDGE_SOURCE',
      knowledgeSource
    });
  };
};
