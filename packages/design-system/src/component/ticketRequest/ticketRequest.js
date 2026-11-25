// import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EventIcon from '@material-ui/icons/Event';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PropTypes from 'prop-types';
import React from 'react';
import iconDocument from '../../assets/icons/icon-document.svg';
import iconPerson from '../../assets/icons/icon-person-circle.svg';
import './ticketRequest.scss';

const ticketRequest = (props) => {
  const { infoTicket, createdDate, updatedDate, onClickViewDetail } = props;
  let state = infoTicket.state;
  let checkIsTicket = infoTicket.number.substring(0, 3) === 'INC' ? 'INC' : 'RITM';

  return (
    <div className="ticket-item">
      <div className="inner">
        <div className="ticket-card">
          <Grid item container direction="row" alignContent="center">
            <p className={`status ${state.split(' ').join('-')}`}>{state}</p>

            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Grid container direction="row" alignItems="center" item sm={4}>
                <div className="title-block">
                  <div className="image">
                    <img src={iconDocument} alt="icon-document" />
                    <span className={`label ${checkIsTicket}`}>{checkIsTicket}</span>
                  </div>
                  <div>
                    <h5 className="ttl-ticket">{infoTicket.category}</h5>
                    <p className="description">{infoTicket.shortDescription}</p>
                  </div>
                </div>
              </Grid>

              <Grid container direction="row" alignItems="center" item sm={5}>
                <div className="status-process">
                  <p>
                    <CheckCircleIcon className="submitted" />
                    <span>submitted</span>
                  </p>

                  {/* arrow 1 */}
                  <p className="arrow">
                    <ArrowForwardIosIcon />
                  </p>

                  {/* status middle*/}
                  <p>
                    {['OPEN', 'REOPEN', 'ACTION REQUIRED'].includes(state.toUpperCase()) &&
                      <img src={iconPerson} alt="person" />
                    }
                    {['CLOSED', 'RESOLVED'].includes(state.toUpperCase()) &&
                      <p>
                        <img src={iconPerson} alt="person" />
                        <span className="Closed color-perple">Resolved</span>
                      </p>
                    }
                    {['CANCELLED'].includes(state.toUpperCase()) &&
                      <CancelIcon className="cancelled" />
                    }
                    {['CLOSED', 'RESOLVED'].includes(state.toUpperCase()) ?
                      ''
                      :
                      <span className={`${state.split(' ').join('-')}`}>{state}</span>
                    }
                  </p>

                  {/* arrow 2 */}
                  <p className={`arrow ${['OPEN', 'REOPEN', 'ACTION REQUIRED'].includes(state.toUpperCase()) ? 'disabled' : ''}`}>
                    <ArrowForwardIosIcon />
                  </p>

                  {/* status final */}
                  {['OPEN', 'REOPEN', 'ACTION REQUIRED'].includes(state.toUpperCase()) && <p>
                    <FiberManualRecordIcon className="icon-disabled" />
                    <span>Resolved</span>
                  </p>
                  }

                  {['RESOLVED', 'CANCELLED'].includes(state.toUpperCase()) && <p>
                    <FiberManualRecordIcon className="icon-disabled" />
                    <span>Closed</span>
                  </p>
                  }
                  {['CLOSED'].includes(state.toUpperCase()) && <p>
                    <CheckCircleIcon className="submitted" />
                    <span>Closed</span>
                  </p>
                  }

                </div>
              </Grid>

              <Grid container direction="row" alignItems="center" item sm={3} justifyContent="flex-end">
                <Button className="btn-detail" onMouseDown={onClickViewDetail}>View Detail</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="flex-start" justifyContent="space-between">
            <p className="number-ticket">{infoTicket.number}</p>
            <div className="last-date">
              <EventIcon />
              <div className="inner">
                <p>
                  <span className="name">Created</span>
                  <span className="value">{createdDate}</span>
                </p>
                <p>
                  <span className="name">Updated</span>
                  <span className="value">{updatedDate}</span>
                </p>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

ticketRequest.propTypes = {
  infoTicket: PropTypes.object,
  createdDate: PropTypes.string,
  updatedDate: PropTypes.string,
  onClickViewDetail: PropTypes.func
};

ticketRequest.defaultProps = {
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

export default ticketRequest;

