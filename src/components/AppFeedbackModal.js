import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import '../styles/Modal.css';
import '../styles/AppFeedbackModal.css';
import Paper from '@material-ui/core/Paper';
import { Component } from "react";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, NativeSelect } from '@material-ui/core';
import _ from 'lodash';
import Ratings from 'react-ratings-declarative';
import uuid from 'uuid/v4';

class AppFeedbackModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: '',
            aboutTopics: ['General comments', 'User experience', 'Usability', 'Content', 'Aesthetics', 'Bug', 'Other'],
            selectedAboutTopic: '',
            rating: 5,
            comments: ''
        };
    }

    componentDidMount() {
        
    }

    handleAboutTopicChange = () => event => {
        this.setState({
            selectedAboutTopic: event.target.value,
        });
    };

    changeRating(rating) {
        this.setState({ rating: rating });
    }

    getCurrentFeedback() {
        return {
            id: uuid(),
            on: (new Date()).toISOString(),
            about: this.state.selectedAboutTopic,
            rating: this.state.rating,
            comment: this.state.comments
        };
    }

    changeComment(e) {
        this.setState({ comments: e.target.value });
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.showModal &&  (this.state.selectedAboutTopic !== '' || this.state.rating !== 5 || this.state.comments !== '')){
            this.setState({
                selectedAboutTopic: '',
                rating: 5,
                comments: ''
            });
        }
    }

    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.showModal || false}
                onClose={this.props.closeModal}
            >
                <div className="modalWindow AppFeedbackModal">

                    <Typography variant="h6" className="modalTitle">
                        App feedback
                    </Typography>

                    <Paper className="commentsContainer">

                        <FormControl className="ratingControlContainer">
                            <b>Select a topic</b>
                            <NativeSelect
                                value={this.state.selectedAboutTopic}
                                onChange={this.handleAboutTopicChange()}
                                inputProps={{
                                    name: 'About',
                                    id: 'about-topic-selector',
                                }}
                            >
                                <option value="" disabled>
                                    Topic
                                </option>
                                {_.map(this.state.aboutTopics, (topic, idx) => {
                                    return (<option value={topic} key={idx}>{topic}</option>);
                                })}
                            </NativeSelect>
                        </FormControl>

                        <label className="ratingControlContainer">
                            <b>Rating</b>
                            <Ratings
                                rating={this.state.rating}
                                changeRating={this.changeRating.bind(this)}
                                widgetRatedColors={'#f0c14b'}
                                widgetHoverColors={'#f0c14b'}
                                id={"ratingControl"}
                                widgetDimensions="40px"
                            >
                                <Ratings.Widget key={1}/>
                                <Ratings.Widget key={2}/>
                                <Ratings.Widget key={3}/>
                                <Ratings.Widget key={4}/>
                                <Ratings.Widget key={5}/>
                            </Ratings>
                        </label>

                        <label className="ratingControlContainer">
                            <b>Comments:</b>
                            <textarea editable="false" defaultValue={''} onChange={e => this.changeComment(e)} placeholder={'I would like to mention...'} />
                        </label>
                    </Paper>
                    <div className="buttonsContainer">
                        <Button onClick={() => this.props.closeModal()} variant="contained" size="small" className="closeButton">
                            X
                        </Button>
                        <Button onClick={() => this.props.sendAppFeedback(this.getCurrentFeedback())} variant="contained" size="small" className="saveButton">
                            <SaveIcon />
                        </Button>
                    </div>
                </div>
            </Modal >
        );

    }

};

export default AppFeedbackModal;