import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";

import "antd/dist/antd.css";
import './multipleCard.scss';
import outageMultipleImage from '../../../assets/icons/outage-generic.svg';
import supportMultipleImg from '../../../assets/icons/support-generic.svg';

const MultipleCard = (props) => {
    const { eyebrowTitle, cardTitle, onClick } = props;
    return (
        <Card className="multiple-card card-wrap"
            onClick={() => onClick()}
            hoverable
        >
            <div className="ant-row height-full">
                <div className="ant-col ant-col-15">
                    <div className={`eyebrow ${(eyebrowTitle === 'outage') ? 'eyebrow-outage' : ''}`}>{eyebrowTitle}</div>
                    <h5>{cardTitle}</h5>
                </div>
                <div className="ant-col ant-col-9">
                    <div className="vertical-middle">
                        {(eyebrowTitle === 'outage') && <img src={outageMultipleImage} />}
                        {(eyebrowTitle === 'support') && <img src={supportMultipleImg} />}
                    </div>
                </div>
            </div>
        </Card>
    );
};

MultipleCard.propTypes = {
    eyebrowTitle: PropTypes.oneOf([
        'support',
        'outage'
    ]),
    cardTitle: PropTypes.string,
    onClick: PropTypes.func,
};

MultipleCard.defaultProps = {
    eyebrowTitle: 'support',
    cardTitle: 'PC Policy for New PC’s or Upgrades - Australia',
    onClick: undefined,
};


export default MultipleCard;



