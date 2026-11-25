// import { Card, Progress } from "antd";
// import dividerBar from "assets/images/divider.png";
// import { PC_REF_STATUS } from "constants/pcRefreshConstants";
// import React from "react";
// import "./MyStuffCard.scss";

// const { Meta } = Card;

// const MyStuffCard = (props) => {

//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   const { myStuff } = props;
//   const {
//     onMyDevicesHandleClick,
//     onRefreshHandleClick,
//     handleViewDetailClick,
//   } = props;

//   const {
//     manufacturer: type,
//     model: name,
//     processing,
//     image,
//     pc_state,
//   } = myStuff;
//   const { knowledge } = myStuff;

//   const getHelpUrl = props.getHelpUrl;

//   const generateFooter = (pc_state) => {
//     switch (pc_state) {
//       case PC_REF_STATUS.REFRESH:
//         return (
//           <>
//             <a
//               className="my-stuff-card-link-text"
//               onClick={() => getHelpUrl(name)}
//               target="_new"
//             >
//               Get Help
//             </a>
//             <img className="my-stuff-divider-bar" alt={type} src={dividerBar} />
//             <div
//               className="my-stuff-card-link-text"
//               onClick={() => onRefreshHandleClick(myStuff)}
//             >
//               Refresh
//             </div>
//           </>
//         );
//       case PC_REF_STATUS.RETURNED:
//         return (
//           <>
//             {knowledge && (
//               <div
//                 className="my-stuff-card-link-text"
//                 onClick={() => handleViewDetailClick(knowledge.kbNumber)}
//               >
//                 Return Instructions
//               </div>
//             )}
//           </>
//         );
//       case PC_REF_STATUS.BEING_REFRESHED:
//         return (
//           <>
//             {knowledge && (
//               <div
//                 className="my-stuff-card-link-text"
//                 onClick={() => handleViewDetailClick(knowledge.kbNumber)}
//               >
//                 Refresh Instructions
//               </div>
//             )}
//           </>
//         );
//       default:
//         return (
//           <>
//             <a
//               className="my-stuff-card-link-text"
//               onClick={() => getHelpUrl(name)}
//               target="_new"
//             >
//               Get Help
//             </a>
//           </>
//         );
//     }
//   };
//   return (
//     <div className="my-stuff-card">
//       <Card hoverable className="card-wrap">
//         {!!myStuff && myStuff.is_new && (
//           <span className="eyebrown-item">NEW</span>
//         )}
//         <Meta
//           description={
//             <div>
//               <div
//                 className="my-stuff-card-body"
//                 onClick={() => onMyDevicesHandleClick(myStuff)}
//               >
//                 <div className="my-stuff-card-image-wrapper">
//                   <img className="my-stuff-card-image" src={image} />
//                 </div>
//                 <div>
//                   <p className="my-stuff-card-body-type">{type}</p>
//                 </div>
//                 <div>
//                   <h5 className="my-stuff-card-body-name">{name}</h5>
//                 </div>
//                 {pc_state === PC_REF_STATUS.REFRESH && (
//                   <div className={pc_state}>
//                     <div>
//                       <Progress
//                         percent={processing}
//                         showInfo={false}
//                         strokeColor="#813ACF"
//                       />
//                     </div>
//                     <div
//                       className={
//                         processing !== 100
//                           ? "my-stuff-card-body-status"
//                           : "my-stuff-card-body-status my-stuff-card-body-status-successful"
//                       }
//                     >
//                       {" "}
//                       Refresh Available{" "}
//                     </div>
//                   </div>
//                 )}

//                 {pc_state === PC_REF_STATUS.RETURNED && (
//                   <div className={pc_state}>
//                     <div className="my-stuff-card-body-status">
//                       {" "}
//                       Prepare for return{" "}
//                     </div>
//                     <div>&nbsp;</div>
//                   </div>
//                 )}

//                 {(pc_state === PC_REF_STATUS.BEING_REFRESHED) && (
//                   <div className={pc_state}>
//                     <div className="my-stuff-card-body-status">
//                       {" "}
//                       Prepare for refresh{" "}
//                     </div>
//                     <div>&nbsp;</div>
//                   </div>
//                 )}

//                 {!pc_state && (
//                   <div>
//                     <div>&nbsp;</div>
//                     <div>&nbsp;</div>
//                   </div>
//                 )}
//               </div>
//               <div className="my-stuff-card-footer">
//                 {generateFooter(pc_state)}
//               </div>
//             </div>
//           }
//         />
//       </Card>
//     </div>
//   );
// };

// export default MyStuffCard;
