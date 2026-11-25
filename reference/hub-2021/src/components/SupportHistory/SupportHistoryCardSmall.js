// import { Card, Col, Grid, Row, Typography } from "antd";
// import calendarIcon from "assets/icons/calendar.svg";
// import { AUTH } from "constants/authConstants";
// import React, { useMemo } from "react";
// import { useHistory, Link } from "react-router-dom";
// import DateUtils from "utils/date";
// import "./SupportHistoryCard.scss";

// const { Text } = Typography;
// const { useBreakpoint } = Grid;

// const SupportHistoryCardSmall = (props) => {
//   const screens = useBreakpoint();
//   const history = useHistory();
//   if (props.totalCount) {
//     return (
//       <Link to="/support-history" className="link-view-all">
//         <Card
//           className="support-ticket-card support-ticket-small-view-all card-wrap"
//           hoverable
//         >
//           <p className="txt-view">View all ({props.totalCount - 5})</p>
//         </Card>
//       </Link>
//     );
//   } else {
//     const { state, short_description, updatedDate, number } = props.data;
//     const currentTimeZone = useMemo(() => {
//       let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
//       if (currentUser) {
//         const time_zone = JSON.parse(currentUser).time_zone;
//         return time_zone;
//       } else {
//         return;
//       }
//     }, [AUTH.CURRENT_USER]);
//     let timeToNow =
//       props.width !== 6
//         ? DateUtils.timetoXbyUTC(updatedDate, currentTimeZone)
//         : "";
//     const handleViewDetailClick = () => {
//       history.push({
//         pathname: `/support-history/detail/${number}`,
//         state:{
//           path: props.path
//         }
//       });
//     };
//     return (
//       <Card
//         onClick={handleViewDetailClick}
//         className="support-ticket-card card-wrap"
//         hoverable
//         title={
//           <Text
//             className={`status-text status-${state
//               .toLowerCase()
//               .replace(/\s/g, "-")}`}
//           >
//             {state}
//           </Text>
//         }
//       >
//         <div className={props.width === 6 ? "support-ticket-content" : ""}>
//           <h5>{short_description}</h5>
//           <div className="ticket-footer">
//             <Row className="inner">
//               <Col>
//                 <Text className="num-ticket" strong>
//                   {number}
//                 </Text>
//               </Col>
//               {timeToNow && (
//                 <Col flex="none">
//                   <img src={calendarIcon} className="date-icon" />
//                   <Text className="last-date">{timeToNow}</Text>
//                 </Col>
//               )}
//             </Row>
//           </div>
//         </div>
//       </Card>
//     );
//   }
// };

// export default SupportHistoryCardSmall;
