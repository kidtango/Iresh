import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import '../styles/Modal.css';
// import '../styles/FormModal.css';
import Paper from '@material-ui/core/Paper';
import { Component } from "react";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, NativeSelect } from '@material-ui/core';
import _ from 'lodash';
import Ratings from 'react-ratings-declarative';
import GeneralitiesForm from './GeneralitiesForm';

class FormModal extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState){
    
    }

    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.showModal || false}
                onClose={this.props.closeModal}
            >
                <div className="modalWindow FormModal">

                    <Typography variant="h6" className="modalTitle">
                        Tree Knowledge Form
                    </Typography>

                    <Paper className="commentsContainer">
                         <GeneralitiesForm/>                   
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

export default FormModal;