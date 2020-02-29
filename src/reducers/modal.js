const modalReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_LOW_CONFIDENCE_RISKS_SME_FEEDBACK_MODAL':
            return {
                ...state,
                selectedRisks: action.risks,
                showModal: true,
                selectedRiskIdx: 0,
                hideLowConfidenceElements: false,
                editMode: false
            };
        case 'SHOW_EDIT_RISK_MODAL':
            return {
                ...state,
                selectedRisks: [action.risk],
                showModal: true,
                selectedRiskIdx: 0,
                hideLowConfidenceElements: true,
                editMode: false
            };
        case 'SHOW_APP_FEEDBACK_MODAL':
            return {
                ...state,
                showAppFeedbackModal: true
            };
        case 'CHANGE_SHOWN_LOW_CONFIDENCE_RISK':
            return {
                ...state,
                selectedRiskIdx: action.idx,
                editMode: false
            };
        case 'MODAL_EDIT_MODE':
            return {
                ...state,
                editMode: true
            };
        case 'SEND_SME_FEEDBACK':
        case 'CLOSE_SME_FEEDBACK_MODAL':
            return {
                ...state,
                showModal: false
            };
        case 'SEND_APP_FEEDBACK':
        case 'CLOSE_APP_FEEDBACK_MODAL':
            return {
                ...state,
                showAppFeedbackModal: false
            };
        default:
            return state;
    }
};

export default modalReducer;