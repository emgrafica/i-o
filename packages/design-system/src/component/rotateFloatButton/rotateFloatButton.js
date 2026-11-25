import {FloatingMenu, MainButton, ChildButton,} from 'react-floating-button-menu';
import React, { useState } from "react";
import { MdClose, MdAdd, MdAssignmentReturn, MdRefresh } from 'react-icons/md';
import PropTypes from 'prop-types';

import './rotateFloatButton.scss';


const RotateFloatButton = (props) => {

    const {returnDeviceHandleClick} = props;

    const mainButtonOnClick = (isOpen)=> {
        setOpen(!isOpen);
        returnDeviceHandleClick();
    };
    const [isOpen, setOpen] = useState(false);
    return (
        <div className = 'RotateFloatButton'>
            <FloatingMenu
                slideSpeed={500}
                direction="left"
                spacing={8}
                isOpen={isOpen}
            >
                    <MainButton className="RotateFloatMainButton"
                    iconResting={<MdAdd className="RotateFloatMainAddButton" />}
                    iconActive={<MdClose className="RotateFloatMainCloseButton" />}
                    onClick={() => mainButtonOnClick(isOpen)}
                    size={40}
                    />
                    {/* //TODO: will able when we have new confirm */}
                    {/* <ChildButton className="RotateFloatChildButton"
                    icon={<MdAssignmentReturn  />}
                    backgroundColor="blue-magenta"
                    size={25}
                    onClick={() => returnDeviceHandleClick(uid)}
                    >
                        Return
                    </ChildButton> */}
                    {/* <ChildButton  className="RotateFloatChildButton"
                    icon={<MdRefresh />}
                    backgroundColor="blue-magenta"
                    size={25}
                    >
                        Refresh
                    </ChildButton> */}
            </FloatingMenu>
        </div>
    );
}


RotateFloatButton.propTypes = {
    /**
     * handle return device
     */
    returnDeviceHandleClick: PropTypes.func,
};

RotateFloatButton.defaultProps = {
    returnDeviceHandleClick: () => {}
};

export default RotateFloatButton;
