import { connect } from 'react-redux';
import KeywordsViewer from '../components/KeywordsViewer';
import * as keywordsViewerActions from '../actions/keywordsViewer';
import { topBy, getKeywords } from '../lib/keywordsFilters';

const mapStateToProps = state => {
    let allKeywords = getKeywords(state);
    return {
        keywords: allKeywords,
        top20keywords: topBy(allKeywords),
        selectedKeywords: state.keywordsViewer.selectedKeywords || [],
        selectedPPPLayers: state.keywordsViewer.selectedPPPLayers,
        filterText: state.keywordsViewer.filterText
    };
};

const mapDispatchToProps = dispatch => (
    {
        selectKeywords: selectedKeywords => dispatch(keywordsViewerActions.selectKeywords(selectedKeywords)),
        filterKeywords: text => dispatch(keywordsViewerActions.filterKeywords(text)),
        resetFilteredKeywords: () => dispatch(keywordsViewerActions.resetFilteredKeywords()),
        filterByPPP: pppLayer => dispatch(keywordsViewerActions.filterByPPP(pppLayer))
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordsViewer);

