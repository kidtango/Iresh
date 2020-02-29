import MCPSearchTool from '../components/MCPSearchTool';
import { connect } from 'react-redux';
import * as MCPActions from '../actions/majorCapitalProjects';

const mapStateToProps = state => {
    return {
        majorCapitalProjects: state.majorCapitalProjects.majorCapitalProjects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectMajorCapitalProject: majorCapitalProject => {
            console.log('majorCapitalProjectId %s', majorCapitalProject);
            dispatch(MCPActions.selectMajorCapitalProject(majorCapitalProject));
        },
        getAllMajorCapitalProjects: () => {
            dispatch(MCPActions.getAllMajorCapitalProjects());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MCPSearchTool);