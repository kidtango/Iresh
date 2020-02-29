import { connect } from 'react-redux';
import FeedbackButton from '../components/FeedbackButton';
import * as modalActions from '../actions/modal';

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(modalActions.showAppFeedbackModal())
});

const mapStateToProps = state => {
    return {
        showModal: state.modal.showAppFeedbackModal,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackButton);