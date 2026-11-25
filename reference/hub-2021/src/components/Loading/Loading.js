import React, { Component, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {KNOWLEDGE} from '../../constants'
import "./Loading.scss";

import { connect } from "react-redux";
class Loading extends React.Component {
    constructor(props) {
        super(props);
        let { isLoading} = this.props.knowledge;
        //console.log(this.props.knowledge);
    }

    render() {
        //console.log("Environment variable>>>", this.props);
        return (
            <Backdrop  className="loading-indicator">
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}

// export default Loading;
const mapStateToProps = ({ isLoading, knowledge, error }) => ({
    isLoading,
    knowledge,
    error
  });
  
  export default connect(mapStateToProps, null)(Loading);