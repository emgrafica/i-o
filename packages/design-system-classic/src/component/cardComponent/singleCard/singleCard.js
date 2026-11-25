import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";

import "antd/dist/antd.css";
import './singleCard.scss';

import pcRefImg from '../../../assets/icons/pc-refresh.svg';
import refreshImg from '../../../assets/icons/refresh-icon.svg';
import pcEmptyImg from '../../../assets/images/empty/emptyLaptop01-removebg-preview.png';

const SingleCard = (props) => {
    const { eyebrowTitle, cardTitle, cardDesc, pcImage, pcEmpty, onClick } = props;
    return (
        <Card className="single-card card-wrap"
            onClick={() => onClick()}
            hoverable
        >
            {
                eyebrowTitle === 'pc refresh' ?
                    <div className="ant-row">
                        <div className="ant-col ant-col-15">
                            <div className="eyebrow">{eyebrowTitle}</div>
                            <h5>{cardTitle}</h5>
                        </div>
                        <div className="ant-col ant-col-9 pcRefresh-img">
                            <div className="vertical-middle">
                                {pcImage ?
                                    <img src={pcImage} />
                                    :
                                    pcEmpty && <img src={pcEmptyImg} />
                                }
                                {!pcImage && !pcEmpty && <img src={pcRefImg} className="newPC-img" />}
                            </div>
                            {pcImage && <div className="state-img">
                                <img src={refreshImg} />
                            </div>}
                            
                        </div>
                    </div>
                    :
                    <>
                        <div className={`eyebrow ${(eyebrowTitle === 'outage') || (eyebrowTitle === 'password') ? 'eyebrow-outage' : ''}`}>{eyebrowTitle}</div>
                        <h5>{cardTitle}</h5>
                    </>
            }
            {cardDesc &&
                <div className="captionRegular-cover">
                    <span className="captionRegular">{cardDesc}</span>
                </div>
            }

        </Card>
    );
};

SingleCard.propTypes = {
    /**
    * Title of eye brow
    */
    eyebrowTitle: PropTypes.oneOf([
        'pc refresh',
        'support',
        'outage',
        'password'
    ]),
    /**
   * Title of card
   */
    cardTitle: PropTypes.string,
    /**
   * Description of card
   */
    cardDesc: PropTypes.string,
    /**
   * What image to use
   */
    pcImage: PropTypes.string,
    pcEmpty: PropTypes.bool,
    onClick: PropTypes.func,
};

SingleCard.defaultProps = {
    eyebrowTitle: 'pc refresh',
    cardTitle: 'PC Policy for New PC’s or Upgrades - Australia',
    pcEmpty: false,
    onClick: undefined,
};


export default SingleCard;



