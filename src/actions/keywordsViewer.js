
export const selectKeywords = selectedKeywords => {
    return {
        type: 'UPDATE_SELECTED_KEYWORDS',
        selectedKeywords
    };
};

export const filterKeywords = text => {
    return {
        type: 'FILTER_KEYWORDS',
        text   
    };
};

export const filterByPPP = pppLayer => {
    return {
        type: 'FILTER_KEYWORDS_BY_PPP_LAYER',
        pppLayer
    };
};

export const resetFilteredKeywords = () => {
    return {
        type: 'RESET_FILTERED_KEYWORDS'
    };
};
