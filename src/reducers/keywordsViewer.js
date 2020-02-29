const keywordsViewerReducer = (state = {selectedPPPLayers: {plant: true, process: true, people:true}}, action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_KEYWORDS':
            return {
                ...state,
                selectedKeywords: action.selectedKeywords
            };
        case 'FILTER_KEYWORDS':
            return {
                ...state,
                filterText: action.text
            };
        case 'FILTER_KEYWORDS_BY_PPP_LAYER':
            return {
                ...state,
                selectedPPPLayers: {
                    ...state.selectedPPPLayers,
                    [action.pppLayer]: !(state.selectedPPPLayers?state.selectedPPPLayers[action.pppLayer]:true)
                }
            };
        case 'RESET_FILTERED_KEYWORDS':
            return {
                ...state,
                selectedKeywords: [],
                selectedPPPLayers: {plant: true, process: true, people:true},
                filterText: ''
            }
        default:
            return state;

    }
}

export default keywordsViewerReducer;