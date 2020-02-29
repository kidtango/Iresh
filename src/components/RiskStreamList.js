import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../styles/RiskStreamList.css';
import '../styles/RiskCard.css';
import Collapse from '@material-ui/core/Collapse';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MiniMatrix from './MiniMatrix';
import '../styles/MiniMatrix.css';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';
import UpwardIcon from '@material-ui/icons/ArrowUpward';
import DownwardIcon from '@material-ui/icons/ArrowDownward';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import Highlighter from './Highlighter';
import PeopleIcon from '@material-ui/icons/Face';
import ProcessIcon from '@material-ui/icons/EventNote';
import PlantIcon from '@material-ui/icons/Domain';

class RiskStreamList extends React.Component {
  constructor() {
    super();
    this.state = {
      filtersExpanded: false,
      riskTitles: [],
      riskDescriptions: [],
      riskConsequences: [],
      riskCauses: []
    };
    this.scrollContainerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', forceCheck);
    this.props.orderRiskStreamItems('confidenceLevel', 'asc');
  }

  toggleExpandRiskDetail = (riskDetailName, idx) => {
    let stateProp = {};
    stateProp[riskDetailName] = [];
    stateProp[riskDetailName][idx] = !this.state[riskDetailName][idx];
    this.setState(state => stateProp);
  };

  expandFilters = () => {
    this.setState(state => ({ filtersExpanded: !state.filtersExpanded }));
  };

  orderAttrs = [
    { idx: 0, attr: 'confidenceLevel', shown: 'Confidence' },
    { idx: 1, attr: 'likelihood', shown: 'Probability' },
    { idx: 2, attr: 'severity', shown: 'Severity' }
  ];

  toggleOrderAttr = () => {
    let total = this.orderAttrs.length;
    let currentIdx = _.find(this.orderAttrs, oa => oa.attr === this.props.attr)
      .idx;
    if (currentIdx + 1 < total) {
      this.props.orderRiskStreamItems(
        this.orderAttrs[currentIdx + 1].attr,
        this.props.order
      );
    } else {
      this.props.orderRiskStreamItems(
        this.orderAttrs[0].attr,
        this.props.order
      );
    }
  };

  toggleOrderOrder = () => {
    this.props.orderRiskStreamItems(
      this.props.attr,
      this.props.order === 'asc' ? 'desc' : 'asc'
    );
  };

  prepareText = text => text.replace(/[^\x20-\x7E]+/g, '');

  getStats(risks) {
    let types = { red: 0, yellow: 0, green: 0, lowConfidence: 0 };
    _.each(risks, r => {
      if (r.lowConfidence) types['lowConfidence']++;

      types[r.color]++;
    });
    return types;
  }

  render() {
    const { classes } = this.props;
    const open = anchorEl => {
      this.setState({ anchorEl });
    };
    const id = open ? 'simple-popper' : null;
    let stats = this.getStats(this.props.risks);
    // <div className="title">Risk Stream</div>

    return (
      <div className='riskStreamList'>
        <Paper className={'risksListContainer'}>
          <Paper className={'coloredPaper headerPaper'}>
            <div className='titleContainer'>
              <div className='statistics'>
                <div className='stat total'>
                  ({stats.red + stats.yellow + stats.green})
                </div>
                <div className='stat red'>{stats.red}</div>
                <div className='stat yellow'>{stats.yellow}</div>
                <div className='stat green'>{stats.green}</div>
                <div className='stat lowConfidence'>{stats.lowConfidence}</div>
              </div>
            </div>
            <div className='filters'>
              <div className='sortAndOrder'>
                <Button
                  size='small'
                  className='orderByButton'
                  onClick={() => this.toggleOrderAttr()}
                >
                  {(() => {
                    let filterValueObj = _.find(
                      this.orderAttrs,
                      oa => oa.attr === this.props.attr
                    );
                    return filterValueObj ? filterValueObj.shown : 'Conf';
                  })()}
                </Button>
                <Button
                  size='small'
                  className={`ascDescButton ${this.props.order}`}
                  onClick={() => this.toggleOrderOrder()}
                >
                  <UpwardIcon className='upArrow' />
                  <DownwardIcon className='downArrow' />
                </Button>
              </div>
            </div>
            <div className='clear'></div>
            <Collapse in={this.state.filtersExpanded} collapsedHeight='0px'>
              <Paper className='filterControls'>
                <form className={classes.root} autoComplete='off'>
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='age-simple'>Sorty by</InputLabel>
                        <Select
                          value={'5'}
                          inputProps={{
                            name: 'age',
                            id: 'age-simple'
                          }}
                        >
                          <MenuItem value=''>
                            <em>Risk</em>
                          </MenuItem>
                          <MenuItem value={10}>Severity</MenuItem>
                          <MenuItem value={20}>Probability</MenuItem>
                          <MenuItem value={30}>Confidence</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        component='fieldset'
                        className={classes.formControl}
                        xs={6}
                      >
                        <FormLabel component='legend'>Order</FormLabel>

                        <RadioGroup
                          aria-label='Order'
                          name='order'
                          className={'radioGroup'}
                          value={'asc'}
                        >
                          <Grid container>
                            <Grid item xs={6}>
                              <FormControlLabel
                                value='asc'
                                control={<Radio />}
                                label='Asc'
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <FormControlLabel
                                value='desc'
                                control={<Radio />}
                                label='Desc'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Collapse>
          </Paper>
          <div
            className='streamList scrollableFullHeighPaper'
            ref={this.scrollContainerRef}
          >
            {_.map(this.props.risks, (r, idx) => {
              let wordsToHighlight = {
                description: [],
                cause: [],
                consequence: [],
                title: []
              };

              _.each(r.contributors, cb => {
                if (
                  cb.weight > 0 &&
                  cb.featureName !== 'id' &&
                  cb.featureValue.length > 1 &&
                  /\w+/.test(cb.featureValue) &&
                  !/[^\x20-\x7E]+/g.test(cb.featureValue)
                ) {
                  if (!wordsToHighlight[cb.featureName]) {
                    wordsToHighlight[cb.featureName] = [];
                  }
                  wordsToHighlight[cb.featureName].push(cb.featureValue);
                }
              });

              return (
                <LazyLoad
                  height={209}
                  offset={1500}
                  throttle={800}
                  scroll
                  overflow
                  scrollContainer={this.scrollContainerRef.current}
                  key={idx}
                  unmountIfInvisible={true}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <Paper
                        className={`${r.color} coloredPaper ${
                          r.lowConfidence ? 'lowConfidence' : ''
                        }`}
                      >
                        <div className='description'>
                          <div aria-describedby={id} className='matrixScores'>
                            <div className='plantProcessPeopleContainer'>
                              <Tooltip title='Plant'>
                                <PlantIcon
                                  className={`${r.hardwareFailures.length &&
                                    r.color}`}
                                />
                              </Tooltip>
                              <Tooltip title='Process'>
                                <ProcessIcon
                                  className={`${r.processFailures.length &&
                                    r.color}`}
                                />
                              </Tooltip>
                              <Tooltip title='People'>
                                <PeopleIcon
                                  className={`${r.peopleFailures.length &&
                                    r.color}`}
                                />
                              </Tooltip>
                            </div>
                            <Fab
                              aria-label='Edit'
                              size='small'
                              className='editButton'
                              onClick={e => this.props.editRisk(r)}
                            >
                              <EditIcon />
                            </Fab>
                            <MiniMatrix
                              likelihood={r.likelihood}
                              severity={r.severity}
                              confidence={r.confidenceLevel}
                            />
                          </div>
                          <Collapse
                            collapsedHeight='62px'
                            className='title'
                            in={this.state.riskTitles[idx]}
                            onClick={() =>
                              this.toggleExpandRiskDetail('riskTitles', idx)
                            }
                          >
                            <Highlighter
                              input={this.prepareText(r.title)}
                              keywords={wordsToHighlight.title}
                            />
                          </Collapse>
                          <Collapse
                            collapsedHeight='36px'
                            in={this.state.riskDescriptions[idx]}
                            className='riskWordsMatched'
                            onClick={() =>
                              this.toggleExpandRiskDetail(
                                'riskDescriptions',
                                idx
                              )
                            }
                          >
                            <b>Description:</b>{' '}
                            <Highlighter
                              input={this.prepareText(r.description)}
                              keywords={wordsToHighlight.description}
                            />
                          </Collapse>
                          <Collapse
                            collapsedHeight='36px'
                            in={this.state.riskCauses[idx]}
                            className='riskWordsMatched'
                            onClick={() =>
                              this.toggleExpandRiskDetail('riskCauses', idx)
                            }
                          >
                            <b>Cause:</b>{' '}
                            <Highlighter
                              input={this.prepareText(r.cause)}
                              keywords={wordsToHighlight.cause}
                            />
                          </Collapse>
                          <Collapse
                            collapsedHeight='36px'
                            in={this.state.riskConsequences[idx]}
                            className='riskWordsMatched'
                            onClick={() =>
                              this.toggleExpandRiskDetail(
                                'riskConsequences',
                                idx
                              )
                            }
                          >
                            <b>Consequence:</b>{' '}
                            <Highlighter
                              input={this.prepareText(r.consequence)}
                              keywords={wordsToHighlight.consequence}
                            />
                          </Collapse>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </LazyLoad>
              );
            })}
          </div>
        </Paper>
      </div>
    );
  }
}

export default RiskStreamList;
