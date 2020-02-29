import { getRiskProfileAdapter } from '../lib/serverResponseAdapters';
import {
  uploadRisksQuery,
  getRiskProfileQuery,
  deleteCurrrentRiskProfileDataSetQuey,
  reloadCurrentRiskProfileDataSetQuery
} from '../lib/queries';

export const uploadCsvFile = csvFile => {
  return {
    type: 'UPLOAD_CSV_FILE',
    csvFile
  };
};

export const riskProfileLoaded = riskProfile => {
  return {
    type: 'RISK_PROFILE_LOADED',
    riskProfile
  };
};

export const toggleRiskProfile = id => {
  return {
    type: 'TOGGLE_RISK_PROFILE',
    id
  };
};

export const toggleRiskDiscipline = riskDiscipline => {
  return {
    type: 'TOGGLE_RISK_DISCIPLINE',
    riskDiscipline
  };
};

export const filterRiskDisciplines = text => {
  return {
    type: 'FILTER_RISK_DISCIPLINES',
    textToFilter: text
  };
};

export const loadingRiskProfile = () => {
  return {
    type: 'LOADING_RISK_PROFILES'
  };
};

export const uploadRisks = csvRows => {
  return async (dispatch, getState) => {
    const { app } = getState();
    let response;
    dispatch(loadingRiskProfile());

    try {
      /*
          response = await app.apolloClient.mutate({
              mutation: uploadRisksMutation,
              variables: {
                  newRisks: decomposeCsvRowsIntoQglObjects(csvFile)
              }
          });
          */

      await app.apolloClient.query({
        query: uploadRisksQuery(csvRows),
        fetchResults: true,
        fetchPolicy: 'network-only'
      });
    } catch (e) {
      console.log(e);
    }

    response = await getRiskProfileRequest(app.apolloClient);
    dispatch(
      riskProfileLoaded(
        getRiskProfileAdapter(
          JSON.parse(JSON.stringify(response.data.getRiskProfile))
        )
      )
    );
  };
};

const getRiskProfileRequest = async apolloClient => {
  let response;

  try {
    response = await apolloClient.query({
      query: getRiskProfileQuery(),
      fetchResults: true,
      fetchPolicy: 'network-only'
    });
    console.log('TCL: response', response);
  } catch (e) {
    response = await e;
  }

  return response;
};

export const getRiskProfile = () => {
  return async (dispatch, getState) => {
    const { app } = getState();
    let response;
    dispatch(loadingRiskProfile());
    response = await getRiskProfileRequest(app.apolloClient);
    // dispatch(riskProfileLoaded(getRiskProfileAdapter( JSON.parse(JSON.stringify(response.data.getRiskProfile)) )));
  };
};

// clear current riskProfile data set
const deleteCurrrentRiskProfileDataSet = async apolloClient => {
  let response;

  try {
    // response = await apolloClient.mutate({ mutation: resetMutation });
    response = await apolloClient.query({
      query: deleteCurrrentRiskProfileDataSetQuey()
    });
  } catch (e) {
    response = e;
  }

  return response;
};

// populate first half of risks
const reloadCurrentRiskProfileDataSet = async apolloClient => {
  let response;

  try {
    // response = await apolloClient.mutate({ mutation: reloadMutation });
    response = await apolloClient.query({
      query: reloadCurrentRiskProfileDataSetQuery()
    });
  } catch (e) {
    response = e;
  }

  return response;
};

export const resetCurrentRiskProfile = () => {
  return async (dispatch, getState) => {
    const { app } = getState();
    dispatch(loadingRiskProfile());
    await deleteCurrrentRiskProfileDataSet(app.apolloClient);
    await reloadCurrentRiskProfileDataSet(app.apolloClient);
    let response = await getRiskProfileRequest(app.apolloClient);
    dispatch(
      riskProfileLoaded(getRiskProfileAdapter(response.data.getRiskProfile))
    );
  };
};
