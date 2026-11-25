import React from "react";
import "./openIssuesCard.scss";
import PropTypes from "prop-types";
import { Grid, Card, Divider } from "@material-ui/core";
import DocumentIssuesIcon from "../../../assets/icons/document-issues.svg";

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

const OpenIssuesCard = (props) => {
  const { issues, viewDetailList } = props;
  return (
    <Card className="issues-container">
      <div className="issues-title txt-underline pd-10">MY OPEN ISSUES</div>
      <Divider />
      <div className="issues-item-container">
        {!!issues &&
          issues.map((item, index) => (
            item.totalIssues > 0 &&
            <>
              <div className="issues-item pd-10" key={index}>
                <Grid container>
                  <Grid item xs={4}>
                    <div className="issues-item-img">
                      <img src={DocumentIssuesIcon} alt="document-icon" />
                      <div className={item.type}>{ISSUESTYPE[item.type]}</div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="issues-item-total">
                      <div>{item.totalIssues > 100 ? '99+' : item.totalIssues}</div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="txt-underline issues-type"
                      onMouseDown={() => viewDetailList(item.type)}
                    >
                      {ISSUES[item.type]}
                    </div>
                  </Grid>
                </Grid>
              </div>
              {index < issues.length - 1 && <Divider />}
            </>
          ))}
      </div>
    </Card>
  );
};

OpenIssuesCard.propTypes = {
  issues: PropTypes.array,
  viewDetail: PropTypes.func,
};

OpenIssuesCard.defaultProps = {
  issues: [
    {
      type: "incidents",
      totalIssues: 211,
    },
    {
      type: "requests",
      totalIssues: 0,
    },
    {
      type: "approvals",
      totalIssues: 31,
    },
  ],
  viewDetailList: (props) => {
    console.log(props);
  },
};
export default OpenIssuesCard;
