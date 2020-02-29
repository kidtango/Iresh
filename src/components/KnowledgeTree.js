import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring';
import '../styles/KnowledgeTree.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GeneralitiesForm from '../containers/generalitiesForm';
import EnvironmentalConditionsForm from '../containers/environmentalConditionsForm';
import ProductionFluidsForm from '../containers/productionFluidsForm';
import SubsurfaceForm from '../containers/subsurfaceForm';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import _ from 'lodash';
import MCPSearchTool from '../containers/mcpSearchTool';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// export default function KnowledgeTree(props) {
export default class RiskStreamList extends React.Component {

  handleChange(event, newValue = 0) {
    // setValue(newValue);
    this.setState({ value: newValue });
  }

  constructor(props) {
    super(props);
    this.state = {
      forms: {},
      value: 0
    };
  }

  parseName(name) {
    let dictionary = {
      'seismicActivity': 'seismic activity',
      'capitalProject': 'Capital Project',  
      'onshore': 'Onshore',
      'oil': 'Oil dominated',
      'gas': 'Gas dominated',
      'upstream': 'Upstream',
      'downstream': 'Downstream',
      'offshore': 'Offshore',
      'waterDepth': 'Water Depth',
      'metoceanConditions': 'Metocean Conditions',
      'seabedBathymetry': 'Seabed Bathymetry',
      'geoTechnicalConditions': 'Geotechnical Conditions',
      'waxAppareanceTemperature': 'Wax Appareance Temperature',
      'hydrateFormationPresure': 'Hydrate Formation Presure',
      'fluidCharacterization': 'Fluid Characterization',
      'highNaturalFlowPotential': 'High Natural Flow Potential',
      'flowingTemperature': 'Flowing Temperature',
      'flowingPresure': 'Flowing Presure',
      'productionProfile': 'Production Profile',
      'true': 'Yes',
      'false': 'No',
      'seafloorDevelopmentExtension': 'Seafloor Development Extension',
      'oilSpecificGravity': 'Oil Specific Gravity',
      'referenceTemperature': 'Reference Temperature'
    };
    return (dictionary[name] || name);
  }

  getGeneralitiesSubTree(formData = this.props.generalitiesFormData) {
    let subTree = [];
    let status = 'done';
    if (formData) {
      _.each(formData, (attr, attrName) => {
        let value;
        if (attrName === 'latLng') {
          if (attr && attr.length) {
            value = `lat:${attr[0].toFixed(4)}, long:${attr[1].toFixed(4)}`;
          } else {
            value = '';
          }
        } else if ('oilGas,onshoreOffshore,upstreamDownstream'.indexOf(attrName) >= 0) {
          value = this.parseName(attr);
        } else {
          value = attr ? `${this.parseName(attrName)}: ${attr}` : '';
        }

        if (value && value !== '' && value !== undefined) {
          subTree.push(<StyledTreeItem nodeId="3.1" key={attrName} label={`${value}`} />);
        } else {
          status = 'partial';
        }
      });
    } else {
      status = 'empty';
    }

    return { tree: subTree, status };
  }

  getEnvironmentalConditionsSubTree(formData = this.props.environmentalConditionsFormData) {
    let subTree = [];
    let status = 'done';
    if (formData) {
      _.each(formData, (attr, attrName) => {
        let value;
        if (attrName === 'geoTechnicalConditions') {
          value = attr && attr.length ? `${this.parseName(attrName)}: ${attr.join(', ')}` : '';
        } else {
          value = attr ? `${this.parseName(attrName)}: ${this.parseName(attr)}` : '';
        }
        if (value && value !== '' && value !== undefined) {
          subTree.push(<StyledTreeItem nodeId="3.1" key={attrName} label={`${value}`} />);
        } else {
          status = 'partial';
        }
      });
    } else {
      status = 'empty';
    }

    return { tree: subTree, status };
  }

  getProductionFluidsSubTree(formData = this.props.productionFluidsFormData) {
    let subTree = [];
    let status = 'done';
    if (formData) {
      _.each(formData, (attr, attrName) => {
        let value = attr ? `${this.parseName(attrName)}: ${this.parseName(attr)}` : '';

        if (value && value !== '' && value !== undefined) {
          subTree.push(<StyledTreeItem nodeId="3.1" key={attrName} label={`${value}`} />);
        } else {
          status = 'partial';
        }
      });
    } else {
      status = 'empty';
    }

    return { tree: subTree, status };
  }

  getSubsurfaceSubTree(formData = this.props.subsurfaceFormData) {
    let subTree = [];
    let status = 'done';
    if (formData) {
      _.each(formData, (attr, attrName) => {
        let value = attr ? `${this.parseName(attrName)}: ${this.parseName(attr)}` : '';
        if (value && value !== '' && value !== undefined) {
          subTree.push(<StyledTreeItem nodeId="3.1" key={attrName} label={`${value}`} />);
        } else {
          status = 'partial';
        }
      });
    } else {
      status = 'empty';
    }
    return { tree: subTree, status };
  }

  toggleExpandForm(e, formName) {
    this.setState({ 
      forms: { 
        ...this.state.forms,
        [formName]: !this.state.forms[formName] 
      } 
    });
  }

  floatFormat(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  mcpToSourceTreeParser(param, value){
    const parsers = {
      geoTechnicalConditions: mcp => {
        let gtcList = [];
        _.map(mcp.environmentalConditions.offshoreDevelopment.geoTechnicalConditions, (v, k) => {
          if((k !== 'id' && k !== '__typename') && v){
            gtcList.push(this.parseName(k));
          } 
        });
        return gtcList;
      },
      seafloorDevelopmentExtension: mcp => {
        return mcp.environmentalConditions.offshoreDevelopment.seafloorDevExtension ? this.floatFormat(mcp.environmentalConditions.offshoreDevelopment.seafloorDevExtension) + ' acre' : null;
      },
      waxAppareanceTemperature: mcp => {
        return mcp.fluids.waxAppareanceTemperature ? this.floatFormat(mcp.fluids.waxAppareanceTemperature) + ' °C' : null;
      },
      hydrateFormationPresure: mcp => {
        return mcp.fluids.hydrateFormationPresure ? this.floatFormat(mcp.fluids.hydrateFormationPresure) + ' bara' : null;
      },
      flowingTemperature: mcp => {
        return mcp.flowingTemperature ? this.floatFormat(mcp.flowingTemperature) + ' °C' : null;
      },
      flowingPresure: mcp => {
        return mcp.flowingPresure ? this.floatFormat(mcp.flowingPresure) + ' bara' : null
      },
      oilSpecificGravity: mcp => {
        return mcp.fluids.oilCharacterization && mcp.fluids.oilCharacterization.blackoilProperties ? this.floatFormat(mcp.fluids.oilCharacterization.blackoilProperties.oilSpecificGravity) : null
      },
      referenceTemperature: mcp => {
        return mcp.fluids.oilCharacterization && mcp.fluids.oilCharacterization.blackoilProperties ? this.floatFormat(mcp.fluids.oilCharacterization.blackoilProperties.referenceTemperature) + ' °C' : null
      },
      waterDepth: mcp => {
        return mcp.environmentalConditions.offshoreDevelopment.waterDepth ? this.floatFormat(mcp.environmentalConditions.offshoreDevelopment.waterDepth) + ' m' : null;
      }
    };

    return parsers[param](value);
  }

  render() {
    
    if(this.props.selectedMajorCapitalProject){
      let mcp = this.props.selectedMajorCapitalProject;
      this.sourceTree = {
        generalities: this.getGeneralitiesSubTree({
            latLng: [mcp.geography.latitude, mcp.geography.longitude],
            onshoreOffshore: mcp.topology.onshore ? 'onshore' : 'offshore',
            upstreamDownstream: mcp.topology.upstream ? 'upstream' : 'downstream',
            oilGas: mcp.topology.oilDominated ? 'oil' : 'gas',
            capitalProject: mcp.name
          }
        ),
        environmentalConditions: this.getEnvironmentalConditionsSubTree({
            metoceanConditions: null,  
            seabedBathymetry: null,
            geoTechnicalConditions: this.mcpToSourceTreeParser('geoTechnicalConditions', mcp),
            waterDepth: this.mcpToSourceTreeParser('waterDepth', mcp),
            seafloorDevelopmentExtension: this.mcpToSourceTreeParser('seafloorDevelopmentExtension', mcp) 
          }
        ),
        productionFluids: this.getProductionFluidsSubTree({
              waxAppareanceTemperature: this.mcpToSourceTreeParser('waxAppareanceTemperature', mcp) ,
              hydrateFormationPresure: this.mcpToSourceTreeParser('hydrateFormationPresure', mcp) ,
              fluidCharacterization: null,
              oilSpecificGravity: this.mcpToSourceTreeParser('oilSpecificGravity', mcp),
              referenceTemperature: this.mcpToSourceTreeParser('referenceTemperature', mcp)
          }
        ),
        subsurface: this.getSubsurfaceSubTree({
            highNaturalFlowPotential: mcp.highNaturalFlowPotential,
            flowingTemperature: this.mcpToSourceTreeParser('flowingTemperature', mcp) ,
            flowingPresure: this.mcpToSourceTreeParser('flowingPresure', mcp) ,
            productionProfile: mcp.productionProfile
          }
        )
      };
    } else {
    
      this.sourceTree = {
        generalities: this.getGeneralitiesSubTree(),
        environmentalConditions: this.getEnvironmentalConditionsSubTree(),
        productionFluids: this.getProductionFluidsSubTree(),
        subsurface: this.getSubsurfaceSubTree()
      };

    }

    return (
      <div className="KnowledgeTree">
        <div>
          <br/>
          <MCPSearchTool key="MCPSearchTool"/>
          <br/>
        </div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange.bind(this)} aria-label="simple tabs example">
            <Tab label="Input" {...a11yProps(0)} onClick={() => this.props.showForms()} />
            <Tab label="Summary" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ExpansionPanel>
            <ExpansionPanelSummary onClick={e => this.toggleExpandForm(e, 'generalitiesForm')}>
              Generalities
              {
                this.state.forms.generalitiesForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GeneralitiesForm />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary onClick={e => this.toggleExpandForm(e, 'environmentalConditionsForm')}>
              Environmental Conditions (Offshore)
                  {
                    this.state.forms.environmentalConditionsForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                  }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EnvironmentalConditionsForm />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary onClick={e => this.toggleExpandForm(e, 'productionFluidsForm')}>
              Production Fluids
                  {
                    this.state.forms.productionFluidsForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                  }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ProductionFluidsForm />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary onClick={e => this.toggleExpandForm(e, 'subsurfaceForm')}>
              Subsurface
                  {
                    this.state.forms.subsurfaceForm ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                  }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SubsurfaceForm />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <div className="explanation">
            <div className="empty">Empty</div>
            <div className="partial">Partially filled</div>
            <div className="done">Filled</div>
          </div>
          <TreeView
            className=""
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <StyledTreeItem nodeId="1" label="Knowledge Source" className="">
              <StyledTreeItem nodeId="2" label="Generalities" className={"toBeCompleted " + this.sourceTree.generalities.status}>
                {
                  this.sourceTree.generalities.tree
                }
              </StyledTreeItem>
              <StyledTreeItem nodeId="3" label="Environmental Conditions" className={"toBeCompleted " + this.sourceTree.environmentalConditions.status}>
                {
                  this.sourceTree.environmentalConditions.tree
                }
              </StyledTreeItem>
              <StyledTreeItem nodeId="4" label={"Production Fluids"} className={"toBeCompleted " + this.sourceTree.productionFluids.status}>
                {
                  this.sourceTree.productionFluids.tree
                }
              </StyledTreeItem>
              <StyledTreeItem nodeId="5" label={"Subsurface"} className={"toBeCompleted " + this.sourceTree.subsurface.status}>
                {
                  this.sourceTree.subsurface.tree
                }
              </StyledTreeItem>
              <StyledTreeItem nodeId="6" label="Subsea" className="toBeCompleted empty">
                <StyledTreeItem nodeId="6.1" label="Best Practices" />
              </StyledTreeItem>
              <StyledTreeItem nodeId="7" label="Topsides" className="toBeCompleted empty">
                <StyledTreeItem nodeId="7.1" label="Best Practices" />
              </StyledTreeItem>
              <StyledTreeItem nodeId="8" label="Export" className="toBeCompleted empty">
                <StyledTreeItem nodeId="8.1" label="Best Practices" />
              </StyledTreeItem>
            </StyledTreeItem>
          </TreeView>
          <br />
          <Button variant="contained" onClick={() => this.props.saveFormsData()} size="small">Save</Button>
        </TabPanel>
      </div>
    );
  }
}
