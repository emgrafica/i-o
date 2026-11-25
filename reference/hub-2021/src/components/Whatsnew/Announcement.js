import "antd/dist/antd.css";
import React from 'react';

import { useHistory } from 'react-router-dom';
import { Card } from "antd";
import { IoCard } from '@i-o/design-system-classic';

const Announcement = (props) => {
    const history = useHistory();
    const handleViewDetailClick = () => {
        history.push({
            pathname: `/knowledges/detail/${props.data.kbNumber}`,
            state: {
                path: props.path
            }
        });
    }

    return (
        // <Card className="whatsnew-item card-wrap"
        //     onClick={handleViewDetailClick}
        //     hoverable>
        //     <div className="item-status">
        //         <span>Outage</span>
        //     </div>
        //     <h5>{props.data.kbName}</h5>
        //     <div className="captionRegular-cover d-flex align-items-end">
        //         <span className="captionRegular">{props.data.kbContent}</span>
        //     </div>
        // </Card>
        <IoCard.SingleCard
            onClick={handleViewDetailClick}
            eyebrowTitle="outage"
            cardTitle={props.data.kbName}
            cardDesc={props.data.kbContent}
        />
    );
};

export default Announcement;

