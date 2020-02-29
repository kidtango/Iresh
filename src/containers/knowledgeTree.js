import { connect } from 'react-redux';
import KnowledgeTree from '../components/KnowledgeTree';
import * as knowledgeTreeActions from "../actions/knowledgeTree";

const mapDispatchToProps = dispatch => ({
    // saveGeneralitiesForm: formData => dispatch(knowledgeTreeActions.saveGeneralitiesForm(formData)),
    showForms: () => dispatch(knowledgeTreeActions.showForms(true)),
    saveFormsData: () => dispatch(knowledgeTreeActions.saveFormsData())
});

const mapStateToProps = state => {
    return {
        generalitiesFormData: state.knowledgeTree.generalitiesFormData,
        productionFluidsFormData: state.knowledgeTree.productionFluidsFormData,
        environmentalConditionsFormData: state.knowledgeTree.environmentalConditionsFormData,
        subsurfaceFormData: state.knowledgeTree.subsurfaceFormData,
        sourceFormsVisible: state.knowledgeTree.sourceFormsVisible,
        majorCapitalProjects: state.majorCapitalProjects.majorCapitalProjects,
        selectedMajorCapitalProject: state.majorCapitalProjects.selectedMajorCapitalProject
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KnowledgeTree);