import React, { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import "./generalCard.scss";
import PropTypes from 'prop-types';
import { Box } from "@material-ui/core";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";
const generateClassName = createGenerateClassName({
	productionPrefix: ""
});
const GeneralCard = (props) => {  
    const {
        cardType,
        uid,
        name,
        link,
        typeIcon,
        srcIcon,
        handleClick,
        displayLinkIcon,
        
    } = props;
 
    const { onMyDevicesHandleClick } = props;

    const generateContent = () => {
        return (
            <div>
                {(!displayLinkIcon) ?
                    (<div className="deviceImg-cover"><img alt={typeIcon} src={srcIcon} onClick={() => onMyDevicesHandleClick(uid)} /></div>) :
                    (<div className="generalImg-cover">{srcIcon}</div>)
                }
                <div className="general-title">
                {cardType == "small card" ?
                    <div className="heading6">
                        {name}
                    </div>
                    :
                    <div className="heading4">
                        {name}
                    </div>
                }                
                </div>
                <div className="general-card-link">
                    <div className={cardType == "small card" ? "link-small-card" : "link-large-card"}>{link}</div>
                    {/* <div className="general-card-icon-cover">
                        {displayLinkIcon && <BsBoxArrowUpRight className="general-card-icon" />}
                    </div> */}
				</div>
			</div>
		);
	};


	return (
		<StylesProvider generateClassName={generateClassName}>
			<div className={cardType == "large card" ? "LargeCard" : "ioCard "}>
				<Box hoverable className={`ant-card ant-card-bordered ant-card-hoverable card-wrap general-card ${!displayLinkIcon ? 'device-card' : ''}`}>
					<Box className="ant-card-body">
						<Box className="ant-card-meta">
							<Box className="ant-card-meta-detail">

								{
									displayLinkIcon ? (
										<Box className="ant-card-meta-description" onClick={() => handleClick()}>
											{generateContent()}
										</Box>
									) : (
										<div onClick={() => onMyDevicesHandleClick(uid)}>
											{generateContent()}
										</div>
									)
								}

							</Box>
						</Box>
					</Box>


				</Box>
			</div>
		</StylesProvider>
	);
};



GeneralCard.propTypes = {
	cardType: PropTypes.oneOf([
		'large card',
		'small card'
	]),
	/**
	* displayLinkIcon: display link icon
	*    true: is display link icon
	*    false: is not display link icon
	*/
	displayLinkIcon: PropTypes.bool,
	/**
	* uid: the id of small device
	*/
	uid: PropTypes.string,
	/**
	 * name: the name of card
	 */
	name: PropTypes.string,
	/**
	 * link: the uri link of card
	 */
	link: PropTypes.string,
	/**
	 * What image to use
	 */
	srcIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
	/**
	 * url: the link of small card
	 */
	url: PropTypes.string,
	/**
	 * Optional click handleViewDetailClick
	 */
	onMyDevicesHandleClick: PropTypes.func,
	handleClick: PropTypes.func,
};


GeneralCard.defaultProps = {
	cardType: "small card",
	displayLinkIcon: false,
	uid: "84b81272878fa41020ae0e1acebb35e2",
	name: "ThinkPad 1410",
	srcIcon: "https://cdn.i-o.systems/images/devices_lenovo_thinkcentre_m92p.jpg",
	link: "Prepare for return",
	url: '',
	onMyDevicesHandleClick: () => { },
	handleClick: () => { },
};


export default GeneralCard;
