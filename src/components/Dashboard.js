import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '../containers/modal';
import irisLogoDev from '../assets/development/irisLogo.png';
import irisLogoProd from '../assets/production/irisLogo.png';
import maanaLogo from '../assets/maanaLogo.png';
import AppFeedbackModal from '../containers/appFeedbackModal';
import InfoIcon from '@material-ui/icons/Info';
import RefreshIcon from '@material-ui/icons/Refresh';
import RiskProfileClassifier from '../containers/riskProfileClassifier';
import FeedbackButton from '../containers/feedbackButton';
import "../styles/Dashboard.css";
import "../styles/Dashboard.css";
import Brightness1Icon from '@material-ui/icons/Brightness1';

const irisLogo = process.env.PUBLIC_URL + (process.env.REACT_APP_BACKEND_ENV === 'development' ? irisLogoDev : irisLogoProd);
const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    coloredPapper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '0',
        borderLeft: 'red 8px solid',
        margin: '0 3px'
    },
    yellowColoredPapper: {
        borderColorLeft: 'yellow'
    },
    chip: {
        margin: theme.spacing(1),
    },
    riskMatrix: {
    },
    matrixCell: {
        borderRadius: '5px 5px',
        boxShadow: '3px 3px 3px #888',
        width: '70px',
        height: '70px',
        display: 'inline-block',
        '&.yellow': {
            backgkgroundColor: '#FCC984'
        }
    }
});

const ListItemLink = (props) =>  (<ListItem button component="a" {...props}></ListItem>);

class Dashboard extends React.Component {
    state = {
        open: false,
        gilad: true,
        jason: false,
        antoine: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.checked
        });
    };

    componentDidMount() {
        
    }

    render() {
        const { classes, theme, ...otherProps } = this.props;

        return (
            <div className={classes.root + ' Dashboard'}>
                <CssBaseline />
                <AppBar position="fixed"
                    className={
                        classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })
                    }>
                    <Modal classes={classes} theme={theme} />
                    <AppFeedbackModal />
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={
                                classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })
                            }>
                            <img src={irisLogo} className={'irisLogo'} alt="IRIS logo" />
                        </IconButton>
                        <h3 className="sectionTitle">Upstream Projects and Operations Knowledge</h3>
                        <img src={maanaLogo} className={'maanaLogo'} alt="Maana logo" />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent"
                    className={
                        classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })
                    }
                    classes={
                        {
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }
                    }
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List> 
                        <ListItemLink key={'About'} href="https://iris.knowledge.maana.io/" target="_blank">
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary={'About'} />
                        </ListItemLink>
                        <ListItem button onClick={e => this.props.resetCurrentRiskProfile()}>
                                <ListItemIcon><RefreshIcon /></ListItemIcon>
                                <ListItemText primary={'Reset'} />
                        </ListItem>
                        <ListItem button onClick={e => {this.props.showMainComponentsByKnowledgeSource('risk')}} className="riskKnowledge">
                            <ListItemIcon><Brightness1Icon className="knowledgeFilterIcon"/></ListItemIcon>
                            <ListItemText primary={'Risk Knowledge'} />
                        </ListItem>
                        <ListItem button onClick={e => {this.props.showMainComponentsByKnowledgeSource('technical')}} className="technicalKnowledge">
                            <ListItemIcon><Brightness1Icon className="knowledgeFilterIcon"/></ListItemIcon>
                            <ListItemText primary={'Technical Knowledge'} />
                        </ListItem>
                        <ListItem button onClick={e => {this.props.showMainComponentsByKnowledgeSource('business')}} className="businessKnowledge">
                            <ListItemIcon><Brightness1Icon className="knowledgeFilterIcon"/></ListItemIcon>
                            <ListItemText primary={'Business Knowledge'} />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.root}>
                        <RiskProfileClassifier {...otherProps} classes={classes} theme={theme} />
                        <FeedbackButton />
                    </div>
                </main>

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);

