import React from 'react';
import PropTypes from "prop-types";
import {Button, Card, CardContent, CardHeader, Grid, Typography} from '@material-ui/core';
import { CheckCircleSharp } from '@material-ui/icons';
import './acknowledgeDialog.scss';

const acknowledgeDialog  = (props) => {

    const { title, content, handleFinish } = props;

    return (
       <Card className="acknowledge-container">
            <CardHeader className="acknowledge-header" title={<Typography>{title}</Typography>}></CardHeader>
            <CardContent className="acknowledge-card-content">
                <span  className="acknowledge-content">{content}</span>        
                <Grid item container>
                <Grid item xs={12}><CheckCircleSharp style={{color: "#00cc00", fontSize: "100px", marginBottom: "10px"}}/></Grid>
                    <Grid item xs={12}>
                    <span className="acknowledge-desc">Click <b>Close</b> to return to i-o Home.</span>
                    </Grid>
                    <Grid item xs={12} className="acknowledge-button">
                    <Button size="medium" onClick={()=>handleFinish()}>Close</Button>
                    </Grid>             
                </Grid>
            </CardContent>           
       </Card>
    );
};

acknowledgeDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    handleFinish: PropTypes.func
};

acknowledgeDialog.defaultProps = {
    title: 'Acknowledged',
    content: "Thanks for re-connecting. Your device records are up to date.",
    handleFinish: () => { }
};

export default acknowledgeDialog;
