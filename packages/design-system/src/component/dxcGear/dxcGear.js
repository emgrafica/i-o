import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, InputBase, Paper, Link } from "@material-ui/core";

import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { Headset } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import "./dxcGear.scss";
import {
    StylesProvider,
    createGenerateClassName,
} from "@material-ui/core/styles";
const generateClassName = createGenerateClassName({
    productionPrefix: "dxc-gear"
});
const DxcGear = (props) => {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <div className="gear ant-card ">
                <div hoverable className={`ant-card-bordered ant-card-hoverable card-wrap card-wrap general-card `}>
                    <div className='ant-card-body'>
                        <div class="ant-card-meta">
                            <div class="ant-card-meta-detail">
                                <div class="ant-card-meta-description">
                                    <a className="gearlink" href="https://gear.dxc.com" target="_blank">
                                        <div>
                                            <div class="generalImg-cover">
                                                <Headset />
                                            </div>
                                            <h6>Find accessories</h6>
                                            <div class="general-card-link">
                                                <div className="caption">Go to DXC Gear</div>
                                                {/* <div class="general-card-icon-cover">
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="general-card-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h8a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 5v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.5H9a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </div> */}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </StylesProvider>
    )
}

DxcGear.propTypes = {
}

DxcGear.defaultProps = {
}

export default DxcGear