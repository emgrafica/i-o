import "antd/dist/antd.css";
import { getAnnouncement } from "../../services/whatsnewService";
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import deviceImg from '../../assets/icons/laptop.svg';
import pcRefImg from '../../assets/icons/pc-refresh.svg';

import refreshImg from '../../assets/icons/refresh-icon.svg';
import { PC_REF_STATUS } from "../../constants/pcRefreshConstants";
import { Card } from "antd";
import pcEmpty from '../../assets/images/empty/emptyLaptop01-removebg-preview.png';
import { IoCard } from '@i-o/design-system-classic';

const DeviceInfo = (props) => {
    const history = useHistory();

    const handleViewDetailClick = () => {
        //window.location.href=`mydevices?uid=${props.data.uid}`;
        history.push({
            pathname: hasKB ? `/knowledges/detail/${props.data.knowledge.kbNumber}` : `/marketplace`,
            state: {
                path: props.path
            }
        });
    }

    const pcState = props.data.pc_state;
    const hasKB = pcState !== PC_REF_STATUS.REFRESH;
    const isReturned = pcState === PC_REF_STATUS.RETURNED;
    let contentKB = '';
    if (hasKB) {
        if (props.data && props.data.knowledge && props.data.knowledge.hasOwnProperty('kbName')) {
            contentKB = props.data.knowledge.kbName;
        }
    }

    return (
        // <Card className="device-item card-wrap"
        //     onClick={handleViewDetailClick}
        //     hoverable
        //    >
        //     {/* Device Info */}
        //     <div className="device-info">
        //         <div className="device-content">
        //             <div className="device-name">
        //                 <span>PC REFRESH</span>
        //             </div>
        //             <h5>
        //                 {hasKB ? contentKB : 'A device refresh is available'}
        //             </h5>
        //         </div>
        //         <div className="device-img">
        //             {!hasKB && (
        //                 <div>
        //                     <img src={props.data.image ? props.data.image : pcEmpty} />
        //                     <div className="device-refresh-icon">
        //                         <img src={refreshImg} />
        //                     </div>
        //                 </div>
        //             )}
        //             {hasKB && (
        //                 <div>
        //                     <img src={pcRefImg} />
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        //     {/* Description */}
        //     <div className="captionRegular-cover d-flex align-items-end">
        //         <span className="captionRegular">{hasKB && props.data.knowledge ? props.data.knowledge.kbContent : (`Your ${props.data.model} is due for a replacement.`)}
        //         </span>
        //     </div>
        // </Card>
        <IoCard.SingleCard
            onClick={handleViewDetailClick}
            eyebrowTitle="pc refresh"
            cardTitle={hasKB ? contentKB : 'A device refresh is available'}
            cardDesc={hasKB && props.data.knowledge ? props.data.knowledge.kbContent : (`Your ${props.data.model} is due for a replacement.`)}
            pcImage={!hasKB && props.data.image ? props.data.image : null}
            pcEmpty={!hasKB && !props.data.image ? true : false}
        />
    );
};

export default DeviceInfo;

