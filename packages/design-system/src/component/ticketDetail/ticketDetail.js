import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import './ticketDetail.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import HlxButton from '../input/button/button';

const ticketDetail = (props) => {

  const { infoTicketDetail, createDate, onResolvedClick, onReopenClick, isLoadingTicketDetail, isTicket } = props;
  const canResolve = infoTicketDetail.actions.canResolve;
  const canReopen = infoTicketDetail.actions.canReopen;

  
  const configTracking = (string) => {
    if (!!string) {
      if (string.indexOf('http') > -1) {
        return <a href={string} target="blank" className="link-tracking">Link</a>;
      }
      return `${string}`;
    } 
    return 'N/A';
  }



  return (
    <div className="info-detail">
      {isLoadingTicketDetail ?
        <CircularProgress className="isLoadingTicketDetail" />
        :
        <>
          <h4 className="title-ticket">{infoTicketDetail.shortDescription}</h4>
          <Grid container>
            <Grid item xs={6} className="pr-20">
              <p>
                <span className="ttl-bold">State</span>
                <span className={`value state ${infoTicketDetail.state}`}>{infoTicketDetail.state}</span>
              </p>
            </Grid>
            <Grid item xs={6}>
              <p>
                <span className="ttl-bold">Created</span>
                <span className="value">{createDate}</span>
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="pr-20">
              <p>
                <span className="ttl-bold">Ticket Number</span>
                <span className="value">{infoTicketDetail.number}</span>
              </p>
            </Grid>
            <Grid item xs={6}>
              <p>
                <span className="ttl-bold">Priority</span>
                <span className="value">{infoTicketDetail.priority}</span>
              </p>
            </Grid>
          </Grid>
          <Grid container style={{ margin: '15px 10px 0 0' }}>
            {(canResolve || canReopen) &&
              <HlxButton
                label={canResolve ? "RESOLVE" : "REOPEN"}
                onClick={canResolve ? onResolvedClick : onReopenClick}>
              </HlxButton>
            }
          </Grid>
          <div className="desc-ticket">
            <Grid container>
              <Grid item xs={6} className="pr-20">
                <p className="ttl-col-desc">Requested for</p>
                <p className="value-info">{!!infoTicketDetail.requestFor ? infoTicketDetail.requestFor : 'N/A'}</p>
              </Grid>
              <Grid item xs={6}>
                <p className="ttl-col-desc">Location</p>
                <p className="value-info">{!!infoTicketDetail.location ? infoTicketDetail.location : 'N/A'}</p>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} className="pr-20">
                <p className="ttl-col-desc">Email</p>
                <p className="value-info">{!!infoTicketDetail.email ? infoTicketDetail.email : 'N/A'}</p>
              </Grid>
              <Grid item xs={6}>
                <p className="ttl-col-desc">Contact Number</p>
                <p className="value-info">{!!infoTicketDetail.telephone ? infoTicketDetail.telephone : 'N/A'}</p>
              </Grid>
            </Grid>

            {isTicket === 'INC' ?
              <Grid container>
                <Grid item xs={6} className="pr-20">
                  <p className="ttl-col-desc">Type of issue</p>
                  <p className="value-info">{!!infoTicketDetail.category ? infoTicketDetail.category : 'N/A'}</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="ttl-col-desc">More details</p>
                  <p className="value-info">{!!infoTicketDetail.subcategory ? infoTicketDetail.subcategory : 'N/A'}</p>
                </Grid>
                <Grid item xs={12}>
                  <p className="ttl-col-desc">Description</p>
                  <p className="value-info">{!!infoTicketDetail.description ? infoTicketDetail.description : 'N/A'}</p>
                </Grid>
              </Grid>
              :
              <Grid container>
                <Grid item xs={6} className="pr-20">
                  <p className="ttl-col-desc">Requested Item</p>
                  <p className="value-info">{!!infoTicketDetail.item ? infoTicketDetail.item : 'N/A'}</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="ttl-col-desc">Qty.</p>
                  <p className="value-info">{!!infoTicketDetail.quantity ? infoTicketDetail.quantity : 'N/A'}</p>
                </Grid>
                <Grid item xs={6} className="pr-20">
                  <p className="ttl-col-desc">Tracking number</p>
                  <p className="value-info">{configTracking(infoTicketDetail?.deliveryRef)}</p>
                </Grid>
                <Grid item xs={6}>
                  <p className="ttl-col-desc">More details</p>
                  <p className="value-info">{!!infoTicketDetail.description ? infoTicketDetail.description : 'N/A'}</p>
                </Grid>
              </Grid>
            }
          </div>
        </>
      }
    </div>
  );
};

ticketDetail.propTypes = {
  isTicket: PropTypes.string,
  createDate: PropTypes.string,
  isLoadingTicketDetail: PropTypes.bool,
  infoTicketDetail: PropTypes.object,
  onResolvedClick: PropTypes.func,
  onReopenClick: PropTypes.func
};

ticketDetail.defaultProps = {
  isTicket: 'RITM',
  isLoadingTicketDetail: false,
  createDate: '1 day ago',
  infoTicketDetail: {
    id: "b4c09e0c871fac10b83e0f2acebb3507",
    number: "INC1123387",
    state: "Active",
    shortDescription: "AMCAMDPFPFDB01: MSSQL-6 Issue in connecting database",
    description: "PDXC Alert Monitor Server: AMCAMDPFPFDB01: MSSQL-6 Issue in connecting database",
    createDate: "2021-03-30 03:17:20",
    updateDate: "2021-06-23 04:15:00",
    priority: "3 - Medium",
    requestFor: "Hai Huynh ",
    email: "hhuynh30@dxc.com",
    deliveryRef: 'https://vnexpress.net/',
    telephone: "",
    location: "",
    category: "Software",
    subcategory: "Midrange/Server Performance",
    actions: {
      canResolve: true,
      canReopen: true,
      canComment: false,
      requiredReopenComment: false,
      requiredResolveComment: false
    },
    comments: {
      totalItems: 60,
      items: []
    }
  },
  onResolvedClick: () => { },
  onReopenClick: () => { }
};

export default ticketDetail;