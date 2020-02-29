import { connect } from 'react-redux';
import AppFeedbackModal from '../components/AppFeedbackModal';
import * as modalActions from '../actions/modal';

const mapStateToProps = state => {
    return {
        showModal: state.modal.showAppFeedbackModal,
    };
};

const mapDispatchToProps = dispatch => ({
   sendAppFeedback: feedback => dispatch(modalActions.sendAppFeedback(feedback)),
   closeModal: () => dispatch(modalActions.closeAppFeedbackModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFeedbackModal);

