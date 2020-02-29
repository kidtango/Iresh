import React from 'react';
import '../styles/LoadingMask.css';
import irisLogoDev from '../assets/development/irisLoader.png';
import irisLogoProd from '../assets/production/irisLoader.png';

let irisLogo = process.env.PUBLIC_URL + (process.env.REACT_APP_BACKEND_ENV === 'development' ? irisLogoDev : irisLogoProd);

class LoadingMask extends React.Component {
   render() {
        return (
            <div className="LoadingMask" style={{display: this.props.show ? 'block' : 'none'}}> 
                <div className="loadingIndicator">
                   <img className="spinner" src={irisLogo} alt=""/> 
                   <div className="loadingStatusText">Reasoning</div>
                </div>
            </div>
        );
    }
}

export default LoadingMask;