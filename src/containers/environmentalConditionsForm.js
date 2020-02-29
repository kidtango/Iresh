import { connect } from 'react-redux';
import EnvironmentalConditionsForm from '../components/EnvironmentalConditionsForm';
import * as knowledgeTreeActions from "../actions/knowledgeTree";

const mapDispatchToProps = dispatch => ({
    saveEnvironmentalConditionsForm: formData => dispatch(knowledgeTreeActions.saveEnvironmentalConditionsForm(formData))
});

const mapStateToProps = state => {
    return {
        environmentalConditionsFormData: state.knowledgeTree.environmentalConditionsFormData,
        sourceFormsVisible: state.knowledgeTree.sourceFormsVisible,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnvironmentalConditionsForm);