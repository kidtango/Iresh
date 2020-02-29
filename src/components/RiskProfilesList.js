import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Files from 'react-files';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../styles/RiskProfilesList.css';
import LoadingMask from './LoadingMask';
import * as csv from 'csvtojson';

class RiskProfilesList extends React.Component {
  state = {
    open: false,
    files: [],
    filteredDisciplines: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  parseCsvStringToJSON(csvString) {
    return csv({
      noheader: false,
      output: 'csv'
    }).fromString(csvString);
  }

  handleFileSelect(files) {
    // var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; files[i]; i++) {
      f = files[i];
      let reader = new FileReader();
      reader.onload = (reader => {
        return async () => {
          let risksJson = await this.parseCsvStringToJSON(reader.result);
          this.props.uploadRisks(risksJson);
        };
      })(reader);
      reader.readAsText(f);
    }
  }

  onFilesChange = async files => {
    this.handleFileSelect(files);
  };

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message);
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.riskProfile && this.props.riskProfile) {
      this.props.updateRiskProfile(this.props.graphqlData.riskProfile);
    }
  }

  componentDidMount() {
    if (this.props.client) {
      this.props.setApolloClient(this.props.client);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={`riskDisciplines`}>
        <Grid item xs={12}>
          <Files
            className='files-dropzone'
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['.csv']}
            multiple={false}
            maxFileSize={10000000000}
            minFileSize={0}
            clickable={false}
          >
            <LoadingMask show={this.props.loadingRiskProfile} />
            <Paper className={classes.paper}>
              <FormControl component='fieldset' className={classes.formControl}>
                <div className='filesInstructions dragFiles'>
                  Drag risks to score
                </div>
                <div className='filesInstructions dropFiles'>Drop files</div>
                <TextField
                  label='Discipline Filter'
                  className={classes.textField}
                  type='text'
                  margin='normal'
                  onChange={e => this.props.filterDisciplines(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Search />
                      </InputAdornment>
                    )
                  }}
                />
                <FormGroup>
                  {this.props.riskProfile
                    ? _.map(
                        this.props.riskProfile.riskDisciplines,
                        (rd, idx) => {
                          if (!rd.hide) {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={rd.selected}
                                    onChange={() => {
                                      this.props.toggleRiskDiscipline(rd);
                                    }}
                                    key={idx}
                                    value={rd.name}
                                  />
                                }
                                label={rd.name}
                                key={idx}
                              />
                            );
                          }
                        }
                      )
                    : ''}
                </FormGroup>
                <FormHelperText> </FormHelperText>
              </FormControl>
            </Paper>
          </Files>
        </Grid>
      </Grid>
    );
  }
}

export default RiskProfilesList;
