import { connect } from 'react-redux';
import SubsurfaceForm from '../components/SubsurfaceForm';
import * as knowledgeTreeActions from "../actions/knowledgeTree";

const mapDispatchToProps = dispatch => ({
    saveSubsurfaceForm: formData => dispatch(knowledgeTreeActions.saveSubsurfaceForm(formData))
});

const mapStateToProps = state => {
    return {
        subsurfaceFormData: state.knowledgeTree.subsurfaceFormData
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubsurfaceForm);