import React from 'react';
import { Component } from "react";
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../styles/KeywordsViewer.css';

class KeywordsViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredText: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (!this.props.selectedKeywords.length && _.keys(this.props.keywords).length) {
            this.props.selectKeywords(_.keys(this.props.keywords));
        }
    }

    removeKeyword(keyword) {
        this.props.selectKeywords(_.difference(this.props.selectedKeywords, [keyword]));
    }

    selectKeyword(keyword) {
        this.props.selectKeywords([keyword]);
    }

    addKeyword(keyword) {
        this.props.selectKeywords(_.concat(this.props.selectedKeywords, keyword));
    }

    resetFilters() {
        this.setState({ filteredText: '' });
        this.props.resetFilteredKeywords();
    }

    onTextFilterChange(e) {
        this.setState({ filteredText: e.target.value });
        this.props.filterKeywords(e.target.value)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="KeywordsViewer">
                <div>
                    <br/>
                    <ButtonGroup variant="contained" size="small" aria-label="Small contained button group" className="layerFilter">
                        <Button className={this.props.selectedPPPLayers.plant?'selectedLayer':''} onClick={e=>this.props.filterByPPP('plant')}>Plant</Button>
                        <Button className={this.props.selectedPPPLayers.process?'selectedLayer':''} onClick={e=>this.props.filterByPPP('process')}>Process</Button>
                        <Button className={this.props.selectedPPPLayers.people?'selectedLayer':''} onClick={e=>this.props.filterByPPP('people')}>People</Button>
                    </ButtonGroup>
                    <div>
                        <TextField
                            label="Keywords Filter"
                            className="keywordsInputFilter"
                            type="text"
                            margin="normal"
                            onChange={(e) => this.onTextFilterChange(e)}
                            value={this.state.filteredText}
                            InputProps={{
                                endAdornment:
                                    (<InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>)
                            }}
                        />
                        <Button variant="contained" className="resetButton" onClick={() => this.resetFilters()} size={"small"}>
                            Reset
                        </Button>
                    </div>
                    {
                        _.map(this.props.top20keywords, (kwObj, keyword) => {
                            if (kwObj.hide) {
                                return;
                            }
                            else if (_.indexOf(this.props.selectedKeywords, kwObj.value) !== -1) {
                                return (<Chip
                                    avatar={<Avatar>{kwObj.ocurrences}</Avatar>}
                                    label={kwObj.value}
                                    onClick={() => this.selectKeyword(kwObj.value)}
                                    onDelete={() => this.removeKeyword(kwObj.value)}
                                    className={classes.chip}
                                    key={keyword}
                                />);
                            }
                            else {
                                return (<Chip
                                    avatar={<Avatar>{kwObj.ocurrences}</Avatar>}
                                    label={kwObj.value}
                                    style={{ opacity: 0.5 }}
                                    onClick={() => this.selectKeyword(kwObj.value)}
                                    onDelete={() => this.addKeyword(kwObj.value)}
                                    className={classes.chip}
                                    deleteIcon={<AddCircleIcon />}
                                    key={keyword}
                                />);
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default KeywordsViewer;