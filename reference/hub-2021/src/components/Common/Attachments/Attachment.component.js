import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Radio, Rate, Row, Space, Typography } from "antd";
import DocumentIcon from '../../../assets/icons/document-icon.svg';
import "./index.scss";
import { downloatAttachmentBySysId } from '../../../services/knowledgeServices';


const { Text, Title } = Typography;

const propTypes = {
    attachments: PropTypes.array.isRequired
}

const defaultProps = {
    attachments: []
}

function AttachmentComponent(props) {
    const {attachments} = props;
    var saveBlobToFile = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, type, name) {
            var blob = new Blob([data], {type: type}),//"octet/stream"
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    function handleDownloadClick (item){
        return async () =>{
            const response = await downloatAttachmentBySysId(item.uid);
            let data_result= response.data;
            
            if(data_result){
                if(data_result.result) data_result = data_result.result;
                if(data_result && data_result.AttachmentFileContents){
                    data_result.data = data_result.AttachmentFileContents;
                    response.dataFile = {
                        contentType: data_result.AttachmentContentType,
                        fileName: data_result.AttachmentFilename
                    }
                }
                const content = data_result.data || data_result;

                const byteCharacters = atob(content);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                var buffer = content instanceof Blob ? content : byteArray//Buffer.from(content, "binary");
                const contentType = response.dataFile? response.dataFile.contentType : item.content_type;
                const fileName = response.dataFile? response.dataFile.fileName : item.file_name;
                
                saveBlobToFile(buffer, contentType, fileName);
            }            
        }
    }

    const attachmentSize = (fileSize) => {
        fileSize *= 1;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (fileSize < 2) return `(${fileSize}Byte)`;
        const i = parseInt(Math.floor(Math.log(fileSize)/Math.log(1024)));
        return `(${Math.round(fileSize/Math.pow(1024, i), 2)}${sizes[i]})`;
    };
    // <Row key={index}><li> <a href={item.download_link} title={item.file_name}>{item.file_name}</a> </li></Row>
    if(attachments.length>0){
        return (
            <div className="attachment-container">
                <div className="list-content">
                    <Row className="attachment-title">
                        <h6>Attachments ({attachments.length})</h6>
                    </Row>
                    <Row className="word-break">
                        <ul>
                        {
                            attachments.map((item, index) => { 
                                var itemSize = attachmentSize(item.size_bytes);
                                return (
                                    <Row key={index}><li><img src={DocumentIcon}></img> <a title={item.file_name} onClick={handleDownloadClick(item)}>{item.file_name} <span>{itemSize}</span></a> </li></Row>
                                ); 
                            })
                        }
                        </ul>
                    </Row>
                </div>
            </div>
        )
    }
    else {
        return (null)
    }       
}

AttachmentComponent.propTypes = propTypes
AttachmentComponent.defaultProps = defaultProps;
export default AttachmentComponent
