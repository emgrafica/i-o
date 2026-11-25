import { Card } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import iconCalendar from './../../../assets/icons/calendar.svg';
import './ticketCard.scss';

const TicketCard = (props) => {
  const { status, titleTicket, ticketNumber, timeStamp } = props;

  return (
    <Card
      className="support-ticket-card card-wrap"
      hoverable
      onClick={(e) => props.onClick(e, {...props})}
    >
      <p className={`status-text status-${status.toLowerCase().replace(/\s/g, "-")}`}>{status}</p>
      <h5>{titleTicket}</h5>
      <div className="ticket-footer">
        <div className="inner">
          <p className="ticket-number"> {ticketNumber} </p>
          {!!timeStamp && (
            <p className="time-stamp">
              <img src={iconCalendar} className="icon-calendar" />
              <span>{timeStamp}</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

TicketCard.propTypes = {
  /**
   * Type of status
   */
  status: PropTypes.oneOf( [
    'Open',
    'Action Required',
    'Others status (Close, ...)'
  ]),
  titleTicket: PropTypes.string,
  ticketNumber: PropTypes.string,
  timeStamp: PropTypes.string,
  onClick: PropTypes.func
};

TicketCard.defaultProps = {
  status: 'Open',
  titleTicket: 'PC Refresh (Invitation Only) i-o',
  ticketNumber:'RITM0099435',
  timeStamp: '7 days ago',
  onClick: () => {}
};

export default TicketCard;
