import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import "./accordion.scss";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import testimonialsIcon from "../../../assets/icons/testimonialsIcon.svg";
import Badge from "@material-ui/core/Badge";

const generateClassName = createGenerateClassName({
  productionPrefix: "io-accordion",
});
const StyledAccordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const StyledAccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const StyledAccordionDetails = withStyles((theme) => ({
  root: {
    display: "block",
    padding: 0,
  },
}))(MuiAccordionDetails);

const Accordion = (props) => {
  const { id, text, icon, count, children } = props;
  return (
    <StylesProvider generateClassName={generateClassName}>
      <StyledAccordion square>
        <StyledAccordionSummary
          aria-controls={id + "-content"}
          id={id + "-header"}
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
        >
          <img className="accordion-icon" src={icon} alt="imageAccordion" />
          <div className="accordion-count"><span>{count}</span></div>
          <Typography>{text}</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>{children}</StyledAccordionDetails>
      </StyledAccordion>
    </StylesProvider>
  );
};

Accordion.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.string,
};

Accordion.defaultProps = {
  id: "news",
  text: "News",
  count: 0,
  icon: testimonialsIcon,
};

export default Accordion;
