import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import App from '../components/App';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        setUserProfile: userProfile => dispatch(appActions.setUserProfile(userProfile)),
        setGeolocation: location => dispatch(appActions.setGeolocation(location))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);