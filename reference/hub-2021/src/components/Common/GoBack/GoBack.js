import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import "./GoBack.scss"
import ArrowBackIcon from "../../../assets/icons/arrow-back.svg";
import {Button} from 'antd';
const propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired
}

function GoBack(props) {
    const history = useHistory();
    const {className, content} = props;
    return (
        <span className={className}>
            <Button type="link"
                    onClick={() => {
                        history.goBack();
                    }}                    
                > <img src={ArrowBackIcon} />&nbsp;{content}
            </Button>
        </span>
    )
}

GoBack.propTypes = propTypes

export default GoBack
