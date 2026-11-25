// import "./SupportHistoryCard.scss";

// import { Card, Col, Grid, Row, Typography } from "antd";

// import React, { useMemo } from "react";
// import { useHistory } from "react-router-dom";
// import calendarIcon from "../../assets/icons/calendar.svg";
// import { AUTH } from "../../constants/authConstants";
// import DateUtils from "../../utils/date";

// const { Text, Title } = Typography;
// const { useBreakpoint } = Grid;
// const SupportHistoryCard = (props) => {
//   const { state, short_description, updatedDate, number } = props.data;
//   const screens = useBreakpoint();
//   const history = useHistory();
//   const handleViewDetailClick = () => {
//     history.push({
//       pathname: `/support-history/detail/${number}`,
//       state:{
//         path: props.path
//       }
//     });
//   };
//   const currentTimeZone = useMemo(() => {
//     let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
//     if (currentUser) {
//       const time_zone = JSON.parse(currentUser).time_zone;
//       return time_zone;
//     } else {
//       return;
//     }
//   }, [AUTH.CURRENT_USER]);
//   let timeToNow = DateUtils.timetoXbyUTC(updatedDate, currentTimeZone);
//   return (
//     <Card
//       onClick={handleViewDetailClick}
//       className="support-ticket-card card-wrap"
//       hoverable
//       title={
//         <Text
//           className={`status-text status-${state
//             .toLowerCase()
//             .replace(/\s/g, "-")}`}
//         >
//           {state}
//         </Text>
//       }
//     >
//       <h5>{short_description}</h5>
//       <div className="ticket-footer">
//         <Row className="inner">
//           <Col>
//             <Text className="num-ticket" strong>
//               {number}
//             </Text>
//           </Col>
//           {timeToNow && (
//             <Col flex="none">
//               <img src={calendarIcon} className="date-icon" />
//               <Text className="last-date">{timeToNow}</Text>
//             </Col>
//           )}
//         </Row>
//       </div>
//     </Card>
//   );
// };

// export default SupportHistoryCard;
