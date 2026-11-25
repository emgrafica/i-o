import React from "react";
import "./singleIssuesCard.scss";
import PropTypes from "prop-types";
import { Grid, Card } from "@material-ui/core";
import DocumentIssuesIcon from "../../../assets/icons/document-issues.svg";
import TodayIcon from "@material-ui/icons/Today";

const ISSUESSTATE = {
  incidents: "Open incident",
  requests: "Requested item state",
  approvals: "Approvals required",
};
const ISSUESTYPE = {
  incidents: "INC",
  requests: "RITM",
  approvals: "AR",
};
const ISSUES = {
  incidents: "INCIDENTS",
  requests: "REQUESTS",
  approvals: "APPROVALS",
};

const SingleIssuesCard = (props) => {
  const { issues, viewDetailIssues } = props;
  const getDay = (date) => {
    const updateDate = new Date(date);
    const diffTime = Math.abs(Date.now() - updateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return !!diffDays ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago` : 'N/A days ago';
  }
  return (
    <div className="single-issues-list">
      {issues.map((issue, index) => {
        return (
          issue.totalIssues > 0 && <Card className="single-issues-container" key={index}>
            <Grid container>
              <Grid item xs={8} className="single-issues-left">
                <div className={`single-issues-state ${issue.type}`}>
                  {ISSUESSTATE[issue.type].toUpperCase()}
                </div>
                  {issue.type === ISSUES.incidents.toLowerCase() && 
                  <div className="issue-content content-incidents">
                    <h6>{issue.data[0].category}</h6>
                    <p>{issue.data[0].shortDescription}</p>
                  </div>}
                  {issue.type === ISSUES.requests.toLowerCase() && <h6 className="issue-content content-requests">{issue.data[0].item}</h6>}
              </Grid>
              <Grid item xs={4} className="single-issues-right">
                <div className="image">
                  <img src={DocumentIssuesIcon} alt="document-icon" />
                  <div className={issue.type}>{ISSUESTYPE[issue.type]}</div>
                </div>
                <div className="calendar">
                  <TodayIcon />
                  <div>{getDay(issue.data[0].updateDate)}</div>
                </div>
              </Grid>
            </Grid>
            <div
              className="txt-underline"
              onMouseDown={() => viewDetailIssues(issue)}
            >
              View Details
            </div>
          </Card>
        )
      })}
    </div>
  );
};

SingleIssuesCard.propTypes = {
  issues: PropTypes.array,
  viewDetail: PropTypes.func,
};

SingleIssuesCard.defaultProps = {
  issues: [
    {
      type: "incidents",
      totalIssues: 2,
      data: [{
        "shortDescription": "device03.domain.net-Slow Login Time",
        "description": "      device:      device03.domain.net\n      event:      Slow Login Time\n      time:      2020-02-12T12:36:48.00000000z\n      description:      Slow Login Time.....\n      sourceServer:      https://servername.domain.net\n\n\n",
        "createDate": "2020-09-20 20:34:55",
        "updateDate": "2021-09-07 20:34:55",
        "priority": "3 - Medium",
        "requestFor": "Cong Bang Nguyen",
        "email": "bnguyen42@dxc.com",
        "telephone": "084909970689",
        "location": "",
        "category": "Hardware",
      }]
    },
    {
      type: "requests",
      totalIssues: 2,
      data: [{
        "createDate": "2021-06-10 02:55:04",
        "updateDate": "2021-06-22 00:44:31",
        "shortDescription": "Submit your PC replacement request i-o.",
        "description": "",
        "priority": "3 - Medium",
        "openBy": "i-o Dev",
        "requestFor": "Cong Bang Nguyen",
        "email": "bnguyen42@dxc.com",
        "telephone": "084909970689",
        "location": "",
        "item": "PC Refresh (Invitation Only) i-o",
        "category": "Personal Workplace",
      }]
    },
  ],
  viewDetailIssues: (props) => {
    console.log(props);
  },
};
export default SingleIssuesCard;
