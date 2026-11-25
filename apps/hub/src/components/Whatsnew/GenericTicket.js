import "antd/dist/antd.css";
import { getAnnouncement } from "../../services/whatsnewService";
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import imgGen from '../../assets/icons/support-generic.svg';
import { Card } from "antd";

const GenericTicket = (props) => {
    const history = useHistory();
    const handleViewDetailClick = () => {
        history.push({
            pathname: `/support-history`
        });
    }

    return (
        // <Card className="whatsnew-item card-wrap"
        //     onClick={handleViewDetailClick}
        //     hoverable>
        //     <div className="ticket-status-generic">
        //         <span>SUPPORT</span>
        //     </div>
        //     <div className="ticket-title-generic d-flex justify-content-between">
        //         <h5>View Support Issues</h5>
        //         <div>
        //             <img src={imgGen} />
        //         </div>
        //     </div>
        // </Card>
        // <IoCard.MultipleCard
        //     onClick={handleListWhatsnewClick}
        //     eyebrowTitle="support"
        //     cardTitle="View Support Issues"
        //     multipleImage={imgGen}
        // />
        <></>
    );
};

export default GenericTicket;

