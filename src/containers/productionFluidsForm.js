import { connect } from 'react-redux';
import ProductionFluidsForm from '../components/ProductionFluidsForm';
import * as knowledgeTreeActions from "../actions/knowledgeTree";

const mapDispatchToProps = dispatch => ({
    saveProductionFluidsForm: formData => dispatch(knowledgeTreeActions.saveProductionFluidsForm(formData))
});

const mapStateToProps = state => {
    return {
        productionFluidsFormData: state.knowledgeTree.productionFluidsFormData
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionFluidsForm);