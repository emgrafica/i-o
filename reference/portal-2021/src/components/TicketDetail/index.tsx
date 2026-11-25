// @ts-nocheck
import { Grid, SideSheet } from '@lumos/core';
import {
  IoAttachment,
  IoComment,
  IoReopen,
  IoTicketDetail,
  IoTimeLine,
  IoUpload,
  IoDeleteAttachment,
  IoResolved
} from '@i-o/design-system';
import {
  StyledCircularProgress,
  StyledAttachmentTitle,
} from 'pages/GetSupportSearchPage/index.style';
import React, { useEffect, useState } from 'react';
import TicketServices, {
  getActivities,
  getTicketDetail,
  incidentResolved
} from 'services/ticketServices';
import DateUtils from 'utils/date';

interface TicketDetailProps {
  isOpen: boolean;
  setIsOpen: Function;
  infoTicketDetail: object;
  currentUser: object;
  changeStatus: Function;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  isOpen,
  setIsOpen,
  infoTicketDetail,
  currentUser,
  changeStatus,
}) => {
  const [reloadDetail, setReloadDetail] = useState({});

  let isTicket =
    !!infoTicketDetail.number &&
    infoTicketDetail.number.substring(0, 3) === 'INC'
      ? 'INC'
      : 'RITM';

  const [isLoadingTicketDetail, setIsLoadingTicketDetail] = useState(false);

  const [attachments, setAttachments] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [attachmentConfig, setAttachmentConfig] = useState({});
  const [uploadAttachment, setUploadAttachment] = useState({});
  const [isLoadingAtt, setIsLoadingAtt] = useState(false);
  const [createdDateInit, setCreatedDateInit] = useState('');

  const [commentVal, setCommentVal] = useState(null);
  let [
    commentResolvedOrReopenChange,
    setCommentResolvedOrReopenChange,
  ] = useState(0);
  let [addCommentChange, setAddCommentChange] = useState(0);

  const [timeLine, setTimeLine] = useState({ activities: [] });
  const [isLoadingTimeLine, setIsLoadingTimeLine] = useState(false);

  useEffect(() => {
    (async () => {
      let result = await TicketServices.getAttachmentsExtension();
      if (!!result && !!result.value) {
        const config = result.value;
        setAttachmentConfig(config);
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoadingTicketDetail(true);
    (async () => {
      let result = await getTicketDetail(
        isTicket,
        infoTicketDetail?.number,
        currentUser.user_name,
      );
      if (!result) {
        return;
      }
      setReloadDetail(result.data);
      setIsLoadingTicketDetail(false);
    })();
  }, [infoTicketDetail, commentResolvedOrReopenChange]);

  useEffect(() => {
    setIsLoadingAtt(true);
    (async () => {
      const result = await TicketServices.getAttachmentsTicket(infoTicketDetail?.id, isTicket === 'INC');
      if (!!result) {
        setAttachments(result);
        setIsLoadingAtt(false);
      }
    })();
  }, [infoTicketDetail, uploadAttachment]);

  useEffect(() => {
    const avatarStorage = localStorage.getItem('IMAGE_USER_INFO');
    if (avatarStorage === null) return;
    setAvatar(avatarStorage);
  }, [avatar]);

  useEffect(() => {
    const tid = infoTicketDetail?.id || -1;
    if (tid === -1 || !isOpen) {
      setTimeLine({ activities: [] });
      return;
    }
    setIsLoadingTimeLine(true);
    (async () => {
      let result = await getActivities(isTicket, infoTicketDetail?.id);

      if (!!result) {
        setTimeLine(result);
        setCreatedDateInit(DateUtils.timetoXbyGMT(result?.item?.createdDate));
        setIsLoadingTimeLine(false);
      }
    })();
  }, [
    isOpen,
    uploadAttachment,
    commentResolvedOrReopenChange,
    addCommentChange,
  ]);

  const onSideSheetClose = () => {
    setIsOpen(false);
  };

  // attachment
  const saveBlobToFile = (data, type, name) => {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    var blob = new Blob([data], { type: type }), //"octet/stream"
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadClick = async item => {
    setIsLoadingAtt(true);
    const response = await TicketServices.downloatAttachmentBySysId(item.id);
    let data_result = response.data;

    if (data_result) {
      const content = data_result.fileContents?.data || [];
      const byteArray = new Uint8Array(content);

      var buffer = content instanceof Blob ? content : byteArray;
      const contentType = data_result
        ? data_result.contentType
        : item.contentType;
      const fileName = data_result.fileName || item.fileName;

      saveBlobToFile(buffer, contentType, fileName);
      setIsLoadingAtt(false);
    }
  };
  const handleChangeFiles = async files => {
    if (!!files && files.length > 0) {
      setIsLoadingAtt(true);
      try {
        let result = {};
        if (isTicket === 'INC') {
          result = await TicketServices.postAttachmentsIncident(
            {
              id: infoTicketDetail.id,
              name: files[0].name,
              type: files[0].type,
            },
            files[0],
          );
        } else {
          result = await TicketServices.postAttachmentsRequest(
            {
              id: infoTicketDetail.id,
              name: files[0].name,
              type: files[0].type,
            },
            files[0],
          );
        }
        if (result.status === 200) {
          setUploadAttachment(files);
        }
      } catch (error) {
        console.error('Error', JSON.stringify(error));
        return;
      }
    }
  };

  //handle Delete file
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [fileAttachment, setFileAttachmentId] = useState('');
  const handleDeleteFileClick = async item => {
    setIsDeleteModal(true);
    setFileAttachmentId(item);
  };
  const handleCloseDeleteFile = () => {
    setIsDeleteModal(false);
  };
  const handleDeleteClick = async () => {
    setIsLoadingAtt(true);
    setIsDeleteModal(false);
    const response = await TicketServices.deleteAttachment(fileAttachment.id, isTicket === 'INC');
    if (!!response) {
      const result = await TicketServices.getAttachmentsTicket(infoTicketDetail.id, isTicket === 'INC');
      setAttachments(result);
      setAddCommentChange((addCommentChange += 1));
      setIsLoadingAtt(false);
    }
  };

  //handle Reopen
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);
  const onReopenClick = () => {
    setIsReopenModalOpen(true);
  };

 //handle Resolved
 const onResolvedClick = () => {
  setResolvedlOpen(true);
 };
 const [resolvedOpen, setResolvedlOpen] = useState(false);
 
  const handleReopenClick = async item => {
    if (reloadDetail?.actions.requiredReopenComment && item.trim() === '') {
      setIsReopenModalOpen(true);
    } else if (reloadDetail?.id && reloadDetail?.actions.canReopen) {
      const response = await TicketServices.incidentReopen(
        reloadDetail.id,
        item,
      );
      if (response?.success) {
        setIsReopenModalOpen(false);
        setCommentResolvedOrReopenChange((commentResolvedOrReopenChange += 1));
        changeStatus(`${reloadDetail?.state}${reloadDetail?.number}`);
      }
    } else {
      setIsReopenModalOpen(true);
    }
  };
  const handleClose = () => {
    setIsReopenModalOpen(false);
  };

  const handleCloseResolved = () => {
    setResolvedlOpen(false);
  };

  const handleResolvedClick = async item => {
    if (reloadDetail?.actions.requiredResolveComment && item.trim() === '') {
      setResolvedlOpen(true);
    } else if (reloadDetail?.id && reloadDetail?.actions.canResolve) {
      const response = await incidentResolved({
        comment: item,
        incidentId:  reloadDetail.id,
      });
      if (response.data?.success) {
        setResolvedlOpen(false);
        setCommentResolvedOrReopenChange((commentResolvedOrReopenChange += 1));
        changeStatus(`${reloadDetail?.state}${reloadDetail?.number}`);
      }
    } else {
      setResolvedlOpen(true);
    }
  };

  // add comment
  const submitComment = async () => {
    if (!!commentVal) {
      let keyComment = commentVal.trim();
      setCommentVal('');

      let response = await TicketServices.provideComment(
        isTicket,
        infoTicketDetail?.id,
        currentUser.user_name,
        keyComment,
      );

      if (response.status === 200) {
        setAddCommentChange((addCommentChange += 1));
      }
    }

    return;
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value;
      if (value === null && value === ' ') return;
      setCommentVal(value);
      submitComment();
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    if (value === null || value === ' ') return;
    setCommentVal(value);
  };

  return (
    <SideSheet
      id="ticket-detail"
      padding={0}
      isOpen={isOpen}
      onRequestClose={onSideSheetClose}
    >
      <div className="ticket-detail-block">
        <div className="inner">
          {/* Details info */}
          <IoTicketDetail
            isTicket={isTicket}
            createDate={DateUtils.timetoXbyGMT(infoTicketDetail?.createDate)}
            infoTicketDetail={
              !!reloadDetail.number ? reloadDetail : infoTicketDetail
            }
            isLoadingTicketDetail={isLoadingTicketDetail}
            onResolvedClick={onResolvedClick}
            onReopenClick={onReopenClick}
          />

          {/* Attachments */}
          <StyledAttachmentTitle>
            Attach any supporting documentation here:
          </StyledAttachmentTitle>
          <Grid container flexDirection={{ xxs: 'column', md: 'row' }}>
            <Grid item>
              <IoUpload
                handleChange={files => handleChangeFiles(files)}
                attachmentConfig={attachmentConfig}
                canUpload={infoTicketDetail?.actions?.canUploadAttachment}
              />
            </Grid>
            <Grid item marginLeft="20px" position="relative" width="100%">
              {!!isLoadingAtt && (
                <Grid
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                  position="absolute"
                >
                  <StyledCircularProgress />
                </Grid>
              )}
              <IoAttachment
                attachments={attachments}
                handleDownloadClick={item => handleDownloadClick(item)}
                handleDeleteFileClick={item => handleDeleteFileClick(item)}
              />
            </Grid>
          </Grid>

          {/* Timeline */}
          <IoTimeLine
            data={timeLine}
            isLoading={isLoadingTimeLine}
            isTicket={isTicket}
            createdDateInit={createdDateInit}
          />

          {/* Comments */}
          <IoReopen
            incidentId={
              !!reloadDetail?.number
                ? reloadDetail.number
                : infoTicketDetail.number
            }
            isOpen={isReopenModalOpen}
            handleReopen={item => handleReopenClick(item)}
            handleClose={handleClose}
            requiredReopenComment={infoTicketDetail.actions?.requiredReopenComment}
          />
          <IoResolved
            incidentId={
              !!reloadDetail?.number
                ? reloadDetail.number
                : infoTicketDetail.number
            }
            isOpen={resolvedOpen}
            handleResolved={item => handleResolvedClick(item)}
            // handleResolved={handleClose}
            handleClose={handleCloseResolved}
            requiredResolveComment={infoTicketDetail.actions?.requiredResolveComment}
          />
          <IoComment
            value={commentVal || ''}
            submitComment={submitComment}
            onKeyPress={onKeyPress}
            handleChange={handleChange}
            canComment={
              reloadDetail?.actions?.canComment
                ? reloadDetail?.actions?.canComment
                : infoTicketDetail?.actions?.canComment
            }
            avatar={avatar}
          />
          <IoDeleteAttachment
            fileName={fileAttachment?.fileName}
            incidentNumber= {infoTicketDetail?.number}
            isOpen={isDeleteModal}
            handleDelete={handleDeleteClick}
            handleClose={handleCloseDeleteFile}
          />
        </div>
      </div>
    </SideSheet>
  );
};

export default TicketDetail;
