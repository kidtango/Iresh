const riskMatrixReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_RISKS':
            return {
                ...state,
                selectedRisks: action.risks
            };
        default:
            return state;

    }
}

export default riskMatrixReducer;