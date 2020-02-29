import React from 'react';
import Grid from '@material-ui/core/Grid';
import RiskProfilesList from '../containers/riskProfilesList';
import RiskMatrix from '../containers/riskMatrix';
import KeywordsViewer from '../containers/keywordsViewer';
import RiskStreamList from '../containers/riskStreamList';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import InsightViewer from '../containers/insightViewer';
import KnowledgeTree from '../containers/knowledgeTree';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ConceptsList from '../containers/conceptsList';
import NPVStochastic from './NPVStochastic';
import NPVConceptSelection from './NPVConceptSelection';
import '../styles/RiskProfileClassifier.css';

class RiskProfileClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainWidgetsState: {
        risk: {
          riskDisciplines: true,
          riskProfile: true,
          riskKnowledgeKeywords: true,
          riskInsightViewer: true,
          riskStream: true
        },
        technical: {
          knowledgeSources: true,
          topConcept: true,
          concept16b: true,
          concept32: true
        },
        business: {
          NPVStochastic: true,
          NPVConceptSelection: true
        }
      }
    };
    // this.getImage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      JSON.stringify(prevProps.mainWidgetsState) !==
      JSON.stringify(this.props.mainWidgetsState)
    ) {
      this.setState({
        mainWidgetsState: JSON.parse(
          JSON.stringify(this.props.mainWidgetsState)
        )
      });
    }
  }

  componentDidMount() {
    this.props.getRiskProfile();
  }

  handleExpand(type, subType) {
    this.setState({
      mainWidgetsState: {
        ...this.state.mainWidgetsState,
        [type]: {
          ...this.state.mainWidgetsState[type],
          [subType]: !this.state.mainWidgetsState[type][subType]
        }
      }
    });
  }

  render() {
    let { classes, theme } = this.props;
    return (
      <div className='RiskProfileClassifier'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={3}>
            <ExpansionPanel
              expanded={this.state.mainWidgetsState.risk.riskDisciplines}
              className='mainWidgetExpansionPanel riskManagementWidget'
            >
              <ExpansionPanelSummary
                className='mainWidgetExpansionPanelSummary'
                onClick={e => this.handleExpand('risk', 'riskDisciplines')}
              >
                Risk Disciplines
                <KeyboardArrowUpIcon className='ArrowUpIcon' />
                <KeyboardArrowDownIcon className='ArrowDownIcon' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <RiskProfilesList classes={classes} theme={theme} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={this.state.mainWidgetsState.technical.knowledgeSources}
              className='mainWidgetExpansionPanel petroTechnicalWidget'
            >
              <ExpansionPanelSummary
                className='mainWidgetExpansionPanelSummary'
                onClick={e =>
                  this.handleExpand('technical', 'knowledgeSources')
                }
              >
                Knowledge Sources
                <KeyboardArrowUpIcon className='ArrowUpIcon' />
                <KeyboardArrowDownIcon className='ArrowDownIcon' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <KnowledgeTree classes={classes} theme={theme} />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12} sm={8} md={5}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ExpansionPanel
                  expanded={this.state.mainWidgetsState.risk.riskProfile}
                  className='mainWidgetExpansionPanel riskManagementWidget'
                >
                  <ExpansionPanelSummary
                    className='mainWidgetExpansionPanelSummary'
                    onClick={e => this.handleExpand('risk', 'riskProfile')}
                  >
                    Risk Profile
                    <KeyboardArrowUpIcon className='ArrowUpIcon' />
                    <KeyboardArrowDownIcon className='ArrowDownIcon' />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <RiskMatrix classes={classes} theme={theme} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={
                    this.state.mainWidgetsState.risk.riskKnowledgeKeywords
                  }
                  className='mainWidgetExpansionPanel riskManagementWidget'
                >
                  <ExpansionPanelSummary
                    className='mainWidgetExpansionPanelSummary'
                    onClick={e =>
                      this.handleExpand('risk', 'riskKnowledgeKeywords')
                    }
                  >
                    Risk Knowledge Keywords
                    <KeyboardArrowUpIcon className='ArrowUpIcon' />
                    <KeyboardArrowDownIcon className='ArrowDownIcon' />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <KeywordsViewer classes={classes} theme={theme} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={this.state.mainWidgetsState.risk.riskInsightViewer}
                  className='mainWidgetExpansionPanel riskManagementWidget'
                >
                  <ExpansionPanelSummary
                    className='mainWidgetExpansionPanelSummary'
                    onClick={e =>
                      this.handleExpand('risk', 'riskInsightViewer')
                    }
                  >
                    Risk Insight Viewer
                    <KeyboardArrowUpIcon className='ArrowUpIcon' />
                    <KeyboardArrowDownIcon className='ArrowDownIcon' />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <InsightViewer />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={this.state.mainWidgetsState.technical.topConcept}
                  className='mainWidgetExpansionPanel petroTechnicalWidget'
                >
                  <ExpansionPanelSummary
                    className='mainWidgetExpansionPanelSummary'
                    onClick={e => this.handleExpand('technical', 'topConcept')}
                  >
                    Top Engineering Concept
                    <KeyboardArrowUpIcon className='ArrowUpIcon' />
                    <KeyboardArrowDownIcon className='ArrowDownIcon' />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ConceptsList justConceptIdx={0} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={this.state.mainWidgetsState.business.NPVStochastic}
                  className='mainWidgetExpansionPanel businessWidget'
                >
                  <ExpansionPanelSummary
                    className='mainWidgetExpansionPanelSummary'
                    onClick={e =>
                      this.handleExpand('business', 'NPVStochastic')
                    }
                  >
                    NPV Concept Selection Analysis
                    <KeyboardArrowUpIcon className='ArrowUpIcon' />
                    <KeyboardArrowDownIcon className='ArrowDownIcon' />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className='NPVConceptContainer'>
                    <NPVStochastic />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <ExpansionPanel
              expanded={this.state.mainWidgetsState.risk.riskStream}
              className='mainWidgetExpansionPanel riskManagementWidget'
            >
              <ExpansionPanelSummary
                className='mainWidgetExpansionPanelSummary'
                onClick={e => this.handleExpand('risk', 'riskStream')}
              >
                Risk Stream
                <KeyboardArrowUpIcon className='ArrowUpIcon' />
                <KeyboardArrowDownIcon className='ArrowDownIcon' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <RiskStreamList classes={classes} theme={theme} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={this.state.mainWidgetsState.technical.concept32}
              className='mainWidgetExpansionPanel petroTechnicalWidget'
            >
              <ExpansionPanelSummary
                className='mainWidgetExpansionPanelSummary'
                onClick={e => this.handleExpand('technical', 'concept32')}
              >
                Contending Engineering Concepts
                <KeyboardArrowUpIcon className='ArrowUpIcon' />
                <KeyboardArrowDownIcon className='ArrowDownIcon' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='NConceptsContainer'>
                <ConceptsList conceptIdxToOmit={0} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={
                this.state.mainWidgetsState.business.NPVConceptSelection
              }
              className='mainWidgetExpansionPanel businessWidget'
            >
              <ExpansionPanelSummary
                className='mainWidgetExpansionPanelSummary'
                onClick={e =>
                  this.handleExpand('business', 'NPVConceptSelection')
                }
              >
                NPV Stochastic Analysis
                <KeyboardArrowUpIcon className='ArrowUpIcon' />
                <KeyboardArrowDownIcon className='ArrowDownIcon' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='NPVConceptContainer'>
                <NPVConceptSelection />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
    // <img src={this.imgSrc} />
  }
}

export default RiskProfileClassifier;
