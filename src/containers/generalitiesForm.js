import { connect } from 'react-redux';
import GeneralitiesForm from '../components/GeneralitiesForm';
import * as knowledgeTreeActions from "../actions/knowledgeTree";

const mapDispatchToProps = dispatch => ({
    saveGeneralitiesForm: formData => dispatch(knowledgeTreeActions.saveGeneralitiesForm(formData)),
    getOffshoreTrends: () => dispatch(knowledgeTreeActions.getOffshoreTrends())
});

const mapStateToProps = state => {
    return {
        generalitiesFormData: state.knowledgeTree.generalitiesFormData,
        sourceFormsVisible: state.knowledgeTree.sourceFormsVisible,
        center: state.app.location,
        offshoreTrends: state.knowledgeTree.offshoreTrends
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GeneralitiesForm);