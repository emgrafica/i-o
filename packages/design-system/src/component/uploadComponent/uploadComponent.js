import React, { useState } from "react";
import PropTypes from "prop-types";
import { DropzoneArea } from "material-ui-dropzone";
import "./../../styles/scss/common.scss";
import "./uploadComponent.scss";

const mimeType = {
  sql: "application/sql",
  vbs: "application/x-vbscript",
  ini: "text/plain",
  reg: "text/plain",
  iso: "application/iso",
  exe: "application/x-msdownload",
  js: "text/javascript",
  bin: "application/octet-stream",
  swf: "application/x-shockwave-flash",
  sh: "application/x-sh",
  java: "text/x-java-source,java",
};

const Upload = (props) => {
  const { attachmentConfig, canUpload, fullWidth, value } = props;
  const [errMsg, setErrMsg] = useState();
  const extensionsNotAllowed = (
    attachmentConfig.not_allowed_extensions || []
  ).map((type) => mimeType[type]);

  const handleChange = (files) => {
    if (!!files && files.length > 0) {
      const typeFile = files[0].name.substr(files[0].name.lastIndexOf(".") + 1);
      const exceptFile = extensionsNotAllowed.find((type) => type === files[0].type) || mimeType[typeFile];
      if (!exceptFile) {
        setErrMsg("");
        props.handleChange(files);
      } else {
        setErrMsg("File extension not allowed");
      }
    }
  };
  return (
    <div
      className={`upload-container ${!canUpload ? "disabled" : ""} ${
        fullWidth ? " upload-container-full-width" : ""
      }`}
    >
      <DropzoneArea
        onChange={(files) => handleChange(files)}
        showAlerts={false}
        filesLimit={1}
        initialFiles={value}
        dropzoneText={
          <>
            Drop file here or <br />
            <a>Browse Files</a>
          </>
        }
        showPreviews={false}
        dropzoneProps={{
          disabled: !canUpload,
          minSize: 1,
        }}
        maxFileSize={attachmentConfig.limited_size * 1000000}
        onDropRejected={(fileRejections) =>
          !!fileRejections && fileRejections.length === 1
            ? (fileRejections[0]?.size === 0
              ? setErrMsg("Empty files are not allowed")
              : setErrMsg("File size exceeds the allowed limit of 20 MB"))
            : setErrMsg("")
        }
      />
      <div className="upload-config">
        Except file type:{" "}
        {(attachmentConfig.not_allowed_extensions || []).join(" ,")}.<br></br>
        Limited file size: {attachmentConfig.limited_size} MB.
      </div>
      {errMsg && <div className="upload-error">{errMsg}</div>}
    </div>
  );
};

Upload.propTypes = {
  handleChange: PropTypes.func,
  extension: PropTypes.array,
  attachmentConfig: PropTypes.object,
  value: PropTypes.array,
  canUpload: PropTypes.bool,
};

Upload.defaultProps = {
  handleChange: () => {},
  extension: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  attachmentConfig: {
    not_allowed_extensions: [
      "sql",
      "exe",
      "vbs",
      "js",
      "bin",
      "ini",
      "reg",
      "swf",
      "iso",
      "sh",
      "java",
    ],
    limited_size: 20,
  },
  fullWidth: false,
  value: [],
  canUpload: true,
};

export default Upload;
