import { connect } from 'react-redux';
import ConceptsList from '../components/ConceptsList';

const mapStateToProps = state => {
    return {
        allConcepts: state.majorCapitalProjects.selectedCapitalProjectConcepts,
        authHeaders: state.app.authHeaders
    };
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConceptsList);

