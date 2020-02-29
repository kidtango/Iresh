export const editRiskEvaluation = (riskEvaluationItem) => {
    return {
        type: 'EDIT_RISK_EVALUATION',
        riskEvaluationItem
    }
}

export const saveRiskEvaluation = (riskEvaluation) => {
    return {
        type: 'SAVE_RISK_EVALUATION',
        riskEvaluation
    }
}

export const orderRiskStreamItems = (attr, order) => {
    return {
        type: 'ORDER_RISK_STREAM_ITEMS',
        attr,
        order
    }
}

export const riskStreamListActions = {
    EDIT_RISK_EVALUATION: 'EDIT_RISK_EVALUATION',
    ORDER_RISK_STREAM_ITEMS: 'ORDER_RISK_STREAM_ITEMS',
    SAVE_RISK_EVALUATION: 'SAVE_RISK_EVALUATION',
    SHOW_EDIT_RISK_MODAL: 'SHOW_EDIT_RISK_MODAL'
};