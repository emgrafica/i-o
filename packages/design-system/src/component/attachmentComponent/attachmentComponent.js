import React from "react";
import PropTypes from "prop-types";
import DocumentIcon from "./../../assets/icons/document-icon.svg";
import DownloadIcon from "./../../assets/icons/download-icon.svg";
import RemoveIcon from "./../../assets/icons/remove-icon.svg";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import "./attachmentComponent.scss";

const Attachment = (props) => {
  const { attachments, fullWidth, isShowDownload, isShowDelete } = props;

  // const attachmentSize = (fileSize) => {
  //     fileSize *= 1;
  //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  //     if (fileSize < 2) return `(${fileSize}Byte)`;
  //     const i = parseInt(Math.floor(Math.log(fileSize)/Math.log(1024)));
  //     return `(${Math.round(fileSize/Math.pow(1024, i), 2)}${sizes[i]})`;
  // };

  // <Row key={index}><li> <a href={item.download_link} title={item.file_name}>{item.file_name}</a> </li></Row>
  if (attachments.length > 0) {
    return (
      <div className={fullWidth ? "attachment attachment-fullwidth" : "attachment"}>
        <div className="list-content">
          <ul>
            {attachments.map((item, index) => {
              // var itemSize = attachmentSize(item.size_bytes);
              const fileName = item.fileName;
              const startFileName = fileName.slice(0, fileName.length - 10);
              const endFileName = fileName.slice(fileName.length - 10);
              return (
                <li key={index}>
                  {isShowDelete && <button onClick={() => props.handleDeleteFileClick(item)}>
                    <img
                      className="remove-icon"
                      src={RemoveIcon}
                      alt="remove-icon"
                    />
                  </button>}
                  <DescriptionOutlinedIcon />
                  <Tooltip title={fileName} arrow placement="top">
                    <div className="file-name" style={!fullWidth ? { maxWidth: 150 } : {}}>
                      <div className="start">{startFileName}</div>
                      <div className="end">{endFileName}</div>
                    </div>
                  </Tooltip>
                  {isShowDownload && <button onClick={() => props.handleDownloadClick(item)}>
                    <img src={DownloadIcon} alt="download-icon" />
                  </button>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Attachment.propTypes = {
  attachments: PropTypes.array,
  handleDownloadClick: PropTypes.func,
  isShowDownload: PropTypes.bool,
  isShowDelete: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Attachment.defaultProps = {
  isShowDownload: true,
  isShowDelete: true,
  fullWidth: false,
  attachments: [
    {
      id: "ea4dc3711b22701410e062c8624bcbc3",
      fileName: "sample.jpg",
      contentType: "image/jpeg",
      sizeBytes: "470090",
      createdOn: "2021-09-13 07:35:12",
      createdBy: "io.dev",
      canRemove: true,
    },
  ],
  handleDownloadClick: () => { },
};
export default Attachment;
