import PropTypes from "prop-types";
import React from "react";
import "./secretKeyExpiringCard.scss";
import { Card, Grid, Box, Paragraph, Link } from "@material-ui/core";
import { BsBoxArrowUpRight } from "react-icons/bs";
import EyeBrow from "../eyeBrow/eyeBrow";

const SecrectKeyExpiringCard = (props) => {
    const { urlChangePass, reminderExpiredDays, titleCard, description, day } = props;
    return (
        <div className="io-article-ticket secretkey-expiring">
            <Card className={"io-article-item card-wrap"}
            >
                <div className='article-left'>
                    <ul>
                        <li className="number-day">{reminderExpiredDays}</li>
                        <li className="chid-day">{day}</li>
                    </ul>

                </div>
                <div className="article-right single-card">
                    <div className="article-right-eyebrow">
                        <EyeBrow color='#D81E5B' backgroundColor='#FDDEE2' text='Action Required' />
                    </div>
                <div onClick={urlChangePass} target="_blank" className="article-right-link">
                    <div className="article-title number-of-line">{titleCard}</div>
                    {/* <Title ellipsis={{ rows: props.cardTitleMaxRox }}>{props.cardTitle}</Title> */}
                    <div className="general-card-link">
                        <div className="captionSemibold">{description} {reminderExpiredDays} {day}</div>
                        <div className="general-card-icon-cover">
                           <BsBoxArrowUpRight className="general-card-icon" />
                        </div>
                    </div>
                    {/* <Paragraph ellipsis={{ rows: 2 }} className='knowledge-card-desc'>
                        {description}
                    </Paragraph>
                    <Link href={urlChangePass} target="_blank">
                        {reminderExpiredDays}
                    </Link> */}
                    </div>
                </div>
            </Card>
        </div>
    );
};
SecrectKeyExpiringCard.propTypes = {
    reminderExpiredDays: PropTypes.number,
    urlChangePass: PropTypes.string,
    titleCard: PropTypes.string,
    description: PropTypes.string,
    day: PropTypes.string
};

SecrectKeyExpiringCard.defaultProps = {
    // reminderExpiredDays: "14",
    // urlChangePass: "https://changepass.ex",
    // titleCard: "Update your password",
    // description: "Your UID password will expire in",
    // day: 14
};

export default SecrectKeyExpiringCard;
