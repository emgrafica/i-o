import React from "react";
import { Upload, message } from "antd";
import PropTypes from "prop-types";
import uploadImg from "../../../assets/icons/upload-icon.svg";
import downloadImg from "../../../assets/icons/download-icon.svg";
import articleImg from "../../../assets/icons/article.svg";
import removeImg from "../../../assets/icons/remove-icon.svg";
import "./uploadComponent.scss";
const { Dragger } = Upload;

const UploadComponent = (props) => {
  const config = {
    name: props.name,
    multiple: props.multiple,
    maxCount: props.maxFileUpload,
    action: props.action,
    listType: props.listType,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        props.onChange(info.fileList);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
    iconRender(file, fileList) {
      return <img className="small-icons" src={props.fileIcon} />;
    },
    showUploadList: {
      showDownloadIcon: props.showDownloadIcon,
      downloadIcon: <img src={props.downloadIcon} />,
      showRemoveIcon: props.showRemoveIcon,
      removeIcon: <img src={props.removeIcon} />,
    },
  };
  return (
    <div className="io-upload">
      <Dragger {...config}>
        <p className="ant-upload-drag-icon">
          <img src={props.uploadIcon} />
        </p>
        <p className="ant-upload-text">{props.uploadText}</p>
      </Dragger>
    </div>
  );
};

UploadComponent.propTypes = {
  /**
   * name
   */
  name: PropTypes.string,
  /**
   * multiple or single upload
   */
  multiple: PropTypes.bool,
  /**
   * max file can upload
   */
  maxFileUpload: PropTypes.number,
  /**
   * action
   */
  action: PropTypes.string,
  /**
   * options: text, pictures
   */
  listType: PropTypes.string,
  /**
   * showDownloadIcon
   */
  showDownloadIcon: PropTypes.bool,
  /**
   * showRemoveIcon
   */
  showRemoveIcon: PropTypes.bool,
  /**
   * fileIcon
   */
  fileIcon: PropTypes.string,
  /**
   * downloadIcon
   */
  downloadIcon: PropTypes.string,
  /**
   * removeIcon
   */
  removeIcon: PropTypes.string,
  /**
   * uploadIcon
   */
  uploadIcon: PropTypes.string,
 /**
   * uploadText
   */
  uploadText: PropTypes.element,
  /**
   * after upload func
   */
  onChange: PropTypes.func,
};

UploadComponent.defaultProps = {
  name: "file",
  multiple: false,
  maxFileUpload: 3,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  showDownloadIcon: false,
  showRemoveIcon: false,
  fileIcon: articleImg,
  downloadIcon: downloadImg,
  removeIcon: removeImg,
  uploadIcon: uploadImg,
  uploadText:  <>Drop Files here or <br /><a>Browse Files</a></>,
  onChange: () => {},
};

export default UploadComponent;
