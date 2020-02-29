import { connect } from 'react-redux';
import Modal from '../components/Modal';
import * as modalActions from '../actions/modal';

const mapStateToProps = state => {
    return {
        risks: state.modal.selectedRisks || [],
        showModal: state.modal.showModal,
        selectedRiskIdx: state.modal.selectedRiskIdx || 0,
        hideLowConfidenceElements: state.modal.hideLowConfidenceElements,
        editMode: state.modal.editMode || false,
        userProfile: state.userProfile
    };
};

const mapDispatchToProps = dispatch => ({
    sendSMEFeedback: (risk, userProfile) => {
        dispatch(modalActions.sendSMEFeedback(risk));
    },
    closeModal: () => dispatch(modalActions.closeModal()),
    changeShownRisk: idx => dispatch(modalActions.changeShwonLowConfidenceRisk(idx)),
    showEditMode: () => dispatch(modalActions.editMode())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);

