import React from "react";
import "./myOpenCard.scss";
import PropTypes from "prop-types";
import { Grid, Card, CardHeader } from "@material-ui/core";
import EyeBrow from "../eyeBrow/eyeBrow";

const ISSUES = {
  incidents: "Incidents",
  requests: "Requests",
  //approvals: "Help",
};

const MyOpenCard = (props) => {
  const { issues } = props;
  return (
    <Card className="open-card-container">
      <CardHeader title={<EyeBrow color={'#000000'} backgroundColor={'#ebebeb'} text={'ACTIVITY'} />}/>
      <Grid container>
        {issues.map((issue, index) =>
          <Grid item xs={6} key={index}>
            <div className="total-issue" onMouseDown={() => props.viewListItem(issue.type)}><span>{issue.totalIssues}</span></div>
            <div className="issue-type">{ISSUES[issue.type]}</div>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

MyOpenCard.propTypes = {
  issues: PropTypes.array,
  viewListItem: PropTypes.func,
};

MyOpenCard.defaultProps = {
  issues: [
    // {
    //   type: "approval",
    //   totalIssues: 0,
    // },
    {
      type: "incidents",
      totalIssues: 211,
    },
    {
      type: "requests",
      totalIssues: 31,
    },
  ],
  viewListItem: (props) => {
    console.log(props);
  },
};
export default MyOpenCard;
