import "antd/dist/antd.css";
import { getAnnouncement } from "../../services/whatsnewService";
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Card } from "antd";
import { IoCard } from '@i-o/design-system-classic';

const SupportTicket = (props) => {
    const history = useHistory();
    const handleViewDetailClick = () => {
        history.push({
            pathname: `/support-history/detail/${props.data.number}`,
            state: {
                path: props.path
            }
        });
    }
    return (
        // <Card className="whatsnew-item card-wrap" 
        // onClick={handleViewDetailClick} 
        // hoverable>
        //     <div className="item-status-support">
        //         <span>Support</span>
        //     </div>
        //     <h5>{props.data.short_description}</h5>
        //     <div className="captionRegular-cover d-flex align-items-end">
        //         <span className="captionRegular">
        //             {props.data.comments && props.data.comments.length > 0 ? props.data.comments[0].comment : (props.data.number + ' was created on your behalf')}
        //         </span>
        //     </div>
        // </Card>
        <IoCard.SingleCard
            onClick={handleViewDetailClick}
            eyebrowTitle="support"
            cardTitle={props.data.short_description}
            cardDesc={props.data.comments && props.data.comments.length > 0 ? props.data.comments[0].comment : (props.data.number + ' was created on your behalf')}
        />
    );
};

export default SupportTicket;

