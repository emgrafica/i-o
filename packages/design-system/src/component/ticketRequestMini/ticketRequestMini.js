import { Card, Grid, CardContent, CardHeader } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import PropTypes from 'prop-types';
import React from 'react';
import iconDocument from '../../assets/icons/icon-document.svg';
import './ticketRequestMini.scss';
import EyeBrow from '../cardComponent/eyeBrow/eyeBrow'

const ticketRequestMini = (props) => {
  const { infoTicket, createdDate, updatedDate, onClickViewDetail } = props;
  let state = infoTicket.state;
  let checkIsTicket = infoTicket.number.substring(0, 3) === 'INC' ? 'INC' : 'RITM';
  return (
    <Card onClick={onClickViewDetail} className="ticket-mini-item">
      <CardHeader className="ticket-mini-card-header" title={ state &&  <EyeBrow color="#62c370" backgroundColor="#D8F9E1" text={state} /> }/>
      <CardContent className="ticket-mini-card">
        <Grid item container alignContent="center">
          <Grid spacing={1} container alignItems="flex-end" justifyContent="space-between">
            <Grid container alignItems="center" item xs={12} md={8}>
              <div className="title-block">
                <div className="image">
                  <img src={iconDocument} alt="icon-document" />
                  <span className={`label ${checkIsTicket}`}>{checkIsTicket}</span>
                </div>
                <div>
                  <h5 className="ttl-ticket">{infoTicket.shortDescription}</h5>
                  <p className="number-ticket">{infoTicket.number}</p>
                </div>
              </div>
            </Grid>
            <Grid container className="last-date" direction="column" item xs={12} md={4}>
              <Grid alignItems="center" container>
                <Grid item xs={2}>
                  <EventIcon />
                </Grid>
                <Grid container item xs={10} className="inner">
                  <Grid item xs={6} md={12} className="inner">
                    <span className="name">Created</span>
                    <span className="value">{createdDate}</span>
                  </Grid>
                  <Grid item xs={6} md={12} className="inner">
                    <span className="name">Updated</span>
                    <span className="value">{updatedDate}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
};

ticketRequestMini.propTypes = {
  infoTicket: PropTypes.object,
  createdDate: PropTypes.string,
  updatedDate: PropTypes.string,
  onClickViewDetail: PropTypes.func
};

ticketRequestMini.defaultProps = {
  infoTicket: {
    id: "37a44064dbc568d022db8a3b0b96195c",
    number: "INC0883835",
    state: "Closed",
    shortDescription: "DESKTOP-5BFKJT9-Low available Disk Space",
    description: "      script:      demodevicetogroup\n      device:      DESKTOP-5BFKJT9\n      event:      Low available Disk Space\n      time:      2020-02-12T12:36:48.00000000z\n      description:      The Low Available Disk Space at 2020.....\n      sourceServer:      https://servername.domain.net\n\n\n",
    createDate: "2020-12-09 17:00:59",
    updateDate: "2021-06-16 14:15:02",
    priority: "3 - Medium",
    requestFor: "Thanh Do",
    email: "tdo25@dxc.com",
    telephone: "+84-28-3923-8520",
    location: "",
    category: "Hardware",
    subcategory: "Desktop",
    actions: {
      canResolve: false,
      canReopen: false,
      canComment: false,
      requiredReopenComment: false,
      requiredResolveComment: false
    },
    comments: null
  },
  createdDate: 'mm/dd/yyyy',
  updatedDate: '3 days ago',
  onClickViewDetail: () => { }
};

export default ticketRequestMini;

