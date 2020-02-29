import React from 'react';
import { Component } from "react";
import '../styles/MiniMatrix.css';
import Fab from '@material-ui/core/Fab';
import FeedbackIcon from '@material-ui/icons/Feedback';
import '../styles/FeedbackButton.css';

class FeedbackButton extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        
    }

    render() {

        return (
            <Fab aria-label={'Expand'} className={'feedbackButton'} onClick={e => this.props.openModal()}>
                <FeedbackIcon />
            </Fab>
        );

    }

};

export default FeedbackButton;