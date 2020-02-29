const riskStreamList = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_RISK_STREAM_ITEMS':
            return {
                ...state,
                attr: action.attr,
                order: action.order
            };
        default:
            return state;
    }
};

export default riskStreamList;