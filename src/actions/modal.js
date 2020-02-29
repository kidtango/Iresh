import { feedbackOnClassifiedRisksQuery, feedbackOnIRISAppQuery } from '../lib/queries';

export const sendSMEFeedback = (riskObj) => {
    return (dispatch, getState) => {
        const { app } = getState();
        try{
            app.apolloClient.query({ query: feedbackOnClassifiedRisksQuery(riskObj) });
        } catch(e) {
            console.error(e);
        }
        dispatch({
            type: 'SEND_SME_FEEDBACK'
        });
    };
}

export const sendAppFeedback = feedback => {
    return (dispatch, getState) => {
        const { app } = getState();
        let userProfile = getState().app.userProfile;
        try{
            app.apolloClient.query({ query: feedbackOnIRISAppQuery(userProfile, feedback) });
        } catch(e) {
            console.error(e);
        }
        dispatch({
            type: 'SEND_APP_FEEDBACK'
        });
    };
}

export const showEditRiskModal = risk => {
    return {
        type: 'SHOW_EDIT_RISK_MODAL',
        risk
    }
}

export const showAppFeedbackModal = risk => {
    return {
        type: 'SHOW_APP_FEEDBACK_MODAL'
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_SME_FEEDBACK_MODAL'
    };
}

export const closeAppFeedbackModal = () => {
    return {
        type: 'CLOSE_APP_FEEDBACK_MODAL',
        showAppFeedbackModal: false
    };
}

export const changeShwonLowConfidenceRisk = idx => {
    return {
        type: 'CHANGE_SHOWN_LOW_CONFIDENCE_RISK',
        idx
    };
};

export const editMode = () => {
    return {
        type: 'MODAL_EDIT_MODE'
    };
};

export const riskMatrixActions = {
    SEND_SME_FEEDBACK: 'SEND_SME_FEEDBACK',
    CLOSE_SME_FEEDBACK_MODAL: 'CLOSE_SME_FEEDBACK_MODAL'
};
