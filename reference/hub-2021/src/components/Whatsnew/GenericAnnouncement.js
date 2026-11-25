import "antd/dist/antd.css";
import { getAnnouncement } from "../../services/whatsnewService";
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import imgGen from '../../assets/icons/outage-generic.svg';
import { Card } from "antd";
import { IoCard } from '@i-o/design-system-classic';

const GenericAnnouncement = (props) => {
    const history = useHistory();
    const handleViewDetailClick = () => {
        history.push({
            pathname: `/whatsnew`
        });
    }

    return (
        // <Card className="whatsnew-item card-wrap"
        //     onClick={handleViewDetailClick}
        //     hoverable>
        //     <div className="item-status-generic">
        //         <span>Outage</span>
        //     </div>
        //     <div className="ticket-title-generic d-flex justify-content-between">
        //         <h5>View Outage Messages</h5>
        //         <div>
        //             <img src={imgGen} />
        //         </div>
        //     </div>
        // </Card>
        <IoCard.MultipleCard
            onClick={handleViewDetailClick}
            eyebrowTitle="outage"
            cardTitle="View Outage Messages"
        />
    );
};

export default GenericAnnouncement;

