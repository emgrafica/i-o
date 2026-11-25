import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import PropTypes from "prop-types";
import React, { useState } from "react";
import iconDoc from './../../assets/icons/document-icon.svg';
import "./timeLine.scss";

const TimeLine = (props) => {
  const { data, isLoading, isTicket, createdDateInit } = props;

  let objCreateDate = {
    createdDate: createdDateInit,
    type: "state",
    value: "Created",
  };

  const listActivities = [...data.activities, objCreateDate];

  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showTimeLine = (list) => {
    let result = null;
    result = list.map((item, index) => {
      return (
        <TimelineItem key={index}>

          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary" className="block">
              {item.createdDate}
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent>
            <Paper>
              {item.type !== 'state' ?
                <>
                  <p className="ttl-comment">{item.createdByUserName} {item.type === 'comments' ? 'commented' : 'added an attachment'}</p>
                  {item.type === 'comments' ?
                    <p className="content-comment">{item.value}</p>
                    :
                    <ul className="att-file">
                      <li>
                        <img src={iconDoc} alt="icon-document" />
                        <span>{item.fileName}</span>
                      </li>
                    </ul>
                  }
                </>
                :
                <p className="ttl-comment">{data?.item?.number} {item.value}</p>
              }
            </Paper>
          </TimelineContent>

        </TimelineItem>
      );
    });
    
    return result;
  }

  return (
    <div className="time-line">
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <Typography className="ttl-time show-time">
            Show Timeline
            <VisibilityIcon />
          </Typography>

          <Typography className="ttl-time hide-time">
            Hide Timeline
            <VisibilityOffIcon />
          </Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Timeline align="alternate">

            {isLoading ?
              <CircularProgress />
              :
              showTimeLine(listActivities)
            }

          </Timeline>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

TimeLine.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  isTicket: PropTypes.string,
  createdDateInit: PropTypes.string
};

TimeLine.defaultProps = {
  createdDateInit: '50 days ago',
  isTicket: 'INC',
  isLoading: false,
  data: {
    item: {},
    activities: []
  }
};

export default TimeLine;
