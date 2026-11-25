import "antd/dist/antd.css";
import React from 'react';

import { Card } from "antd";
import { IoCard } from '@i-o/design-system-classic';

const ExpiredPassword = (props) => {
    return (
        <a href={props.data.url} target="_blank">
            {/* <Card className="whatsnew-item card-wrap"
                hoverable>
                <div className="item-status">
                    <span>Password</span>
                </div>
                <h5>Your password is expiring in {props.data.reminderDays}</h5>
            </Card> */}
            <IoCard.SingleCard
                eyebrowTitle="password"
                cardTitle={`Your Universal ID password is expiring in ${props.data.reminderDays}`}
            />
        </a>
    );
};

export default ExpiredPassword;

