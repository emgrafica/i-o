// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import {
  IoKBDetail,
  IoFlagHelpful,
  IoComments,
  IoCard,
  IoDeleteCommentDialog,
} from '@i-o/design-system';
import { useHistory } from 'react-router-dom';
import UserService from 'services/userServices';
import GetSupportSearchInput from 'components/GetSupportSearchInput';
import {
  downloatAttachmentBySysId,
  getUserRatings,
  getUserUsefuls,
  getUserComments,
  provideFeedBack,
  getUsefulPercentage,
  updateViewCount,
  getDetailByKBNumber,
  getLatestComment,
  updateLikeComment,
  updateUnlikeComment,
  deleteComment,
  editComment,
} from 'services/knowledgeServices';
import { AUTH } from 'constants/authConstants';
import { Grid, Box } from '@material-ui/core';
import { Grid as GridLumos, Row, Box as BoxLumos } from '@lumos/core';
import { mostViewedArticles } from 'services/knowledgeServices';
import DateUtils from 'utils/date';
import SkeletonCard from './skeletonKnowledge';
import { HomePath } from 'utils/routes';
import TopSection from 'pages/GetSupportPage/TopSection';
import { KNOWLEDGE } from 'constants/knowledgeConstants';

const KnowledgeArticleCard: React.FC = props => {
  const history = useHistory();
  const [kbDetail, setkbDetail] = useState({});
  const [viewCount, setviewcount] = useState(0);
  const [topMostviewedarticle, setmostview] = useState([]);
  let listAtt = kbDetail?.noEmbedAttachments;
  let dataUser: any = UserService.getCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCountPages, setTotalCountPages] = useState(0);
  let kbNumber = props.match.params.id;
  const [rating, setRating] = useState(0);
  const [commentsData, setCommentsData] = useState([]);
  const [kbUseful, setKbUseful] = useState('');
  const [kbUsefulPercentage, setKbUsefulPercentage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [lastComment, setLastComment] = useState({});
  const [likeCommentChange, setLikeCommentChange] = useState(false);
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  const time_zone = !!currentUser ? JSON.parse(currentUser).time_zone : '';
  let [updateRating, setUpdateRating] = useState(0);
  const [avatarUser, setAvatarUser] = useState({});
  const [isUseful, setIsUseful] = useState(false);
  const kbType = kbDetail?.type ? kbDetail.type.toUpperCase() : null;
  const isOutageArticles = kbType === KNOWLEDGE.OUTAGE;

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState('');
  const [deletedComment, setDeletedComment] = useState('');
  const [editedComment, setEditedComment] = useState('');

  const currentTimeZone = useMemo(() => {
    if (currentUser) {
      const time_zone = JSON.parse(currentUser).time_zone;
      return time_zone;
    } else {
      return;
    }
  }, [AUTH.CURRENT_USER]);

  // get user avatar
  useEffect(() => {
    const imgAvatar = localStorage.getItem('IMAGE_USER_INFO');
    if (!!imgAvatar) {
      setAvatarUser({ user: dataUser.uid, avatar: imgAvatar });
    }
  }, []);

  async function fetchKbDetail(isShowLoading = false) {
    try {
      if (isShowLoading) setIsLoading(true);
      let response = await getDetailByKBNumber(kbNumber, dataUser.user_name);
      if (response?.data !== '') {
        const responseData = response.data;
        responseData.publishedDate = DateUtils.timetoXbyUTC(
          responseData.publishedDate,
          time_zone,
        );
        setkbDetail(responseData);
      } else {
        history.push('/404');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return;
    }
  }

  useEffect(() => {
    fetchKbDetail(true);
  }, [kbNumber]);

  useEffect(() => {
    fetchKbDetail();
  }, [updateRating]);

  useEffect(() => {
    const paramRatings = {
      kb_uid: kbDetail.id,
      user_uid: dataUser.uid,
      page_size: 1,
      page_index: 1,
    };
    async function fetchRatings() {
      try {
        let feedbacksResponse = await getUserRatings(paramRatings);
        let rating =
          feedbacksResponse?.data && feedbacksResponse.data?.length > 0
            ? +feedbacksResponse.data[0].rating
            : 0;
        setRating(rating);
      } catch (error) {
        console.error('Error', JSON.stringify(error));
        return;
      }
    }
    fetchRatings();
  }, [kbDetail.id]);

  useEffect(() => {
    const paramLastCommnent = {
      kb_uid: kbDetail.id,
    };
    async function getLastComment() {
      try {
        let lastCommentRes = await getLatestComment(paramLastCommnent);
        setLastComment(lastCommentRes);
      } catch (error) {
        console.error('Error', JSON.stringify(error));
        return;
      }
    }
    if (!!kbDetail.id) {
      getLastComment();
    }
  }, [kbDetail.id, commentsData]);

  useEffect(() => {
    const paramComments = {
      kb_uid: kbDetail.id,
      user_uid: dataUser.uid,
      page_size: 5 * currentPage,
      page_index: 1,
    };

    async function fetchFeedbacks() {
      try {
        let feedbacksResponse = await getUserComments(paramComments);
        let commentsDataRes =
          feedbacksResponse?.data && feedbacksResponse.data?.length > 0
            ? feedbacksResponse.data
            : [];
        let totalCountPagesRes = feedbacksResponse?.totalCount;
        let newCommentsData = [
          ...new Map(
            [...commentsData, ...commentsDataRes].map(item => [item.uid, item]),
          ).values(),
        ];
        setCommentsData(newCommentsData);
        setTotalCountPages(totalCountPagesRes);
      } catch (error) {
        console.error('Error', JSON.stringify(error));
        return;
      }
    }

    if (kbDetail.number === kbNumber) {
      fetchFeedbacks();
    } else {
      setCommentsData([]);
      setTotalCountPages(0);
    }
  }, [currentPage, kbDetail.id, likeCommentChange, kbNumber, deletedComment, editedComment]);

  useEffect(() => {
    const getKbUsefulPercentage = async () => {
      let result = await getUsefulPercentage({ kb_uid: kbDetail.id });
      if (!result) return;
      setKbUsefulPercentage(result.percentage || 0);
    };
    getKbUsefulPercentage();
  }, [kbDetail.id]);
  useEffect(() => {
    const updateviewCount = async () => {
      if (kbDetail?.id) {
        updateViewCount(dataUser.user_name, kbDetail.id);
        let totalView = kbDetail.viewCount;
        setviewcount(totalView);
      } else {
        return 'not valued';
      }
    };
    updateviewCount();
  }, [kbDetail?.id]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const paramUsefuls = {
      kb_uid: kbDetail.id,
      user_uid: dataUser.uid,
      page_size: 1,
      page_index: 1,
    };
    const getUsefulByUser = async () => {
      let result = await getUserUsefuls(paramUsefuls);
      if (!result || !result.data) return;
      const useful = result.data[0]?.useful || '';
      setKbUseful(useful.toLowerCase());
    };
    getUsefulByUser();

    const mostviewedArticles = () => {
      if (kbDetail) {
        mostViewedArticles({
          user_name: dataUser.user_name,
          kb_base: kbDetail.knowledgeBase,
          kb_category: kbDetail.category,
          kb_number: kbDetail.number,
          page_size: 9,
          page_index: 1,
        }).then(response => {
          if (response.data) {
            const result = response.data;
            setmostview(result?.data);
          } else {
            return 'not valued';
          }
        });
      } else {
        return 'not valued';
      }
    };
    mostviewedArticles();
  }, [kbNumber, kbDetail.id, dataUser.user_name, history.location.pathname]);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    const timeMsg = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    return () => {
      clearTimeout(timeMsg);
    };
  }, [showMessage]);

  const changeFlagUseful = async useful => {
    if (useful === kbUseful) return;
    setShowMessage(true);
    const paramPostFb = {
      kb_number: kbNumber,
      kb_user_feedback: dataUser.user_name,
      kb_article: kbDetail.id,
      //kb_user_feedback: dataUser.uid,
      kb_useful: useful.toLowerCase(),
    };
    setKbUseful(useful.toLowerCase());
    setIsUseful(true);
    const result = await provideFeedBack(paramPostFb);
    // console.log(result);
    if (result.status === 200) {
      (async () => {
        let result = await getUsefulPercentage({ kb_uid: kbDetail.id });
        if (!result) return;
        setKbUsefulPercentage(result.percentage || 0);
      })();
    }
  };

  var saveBlobToFile = (function () {
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    return function (data, type, name) {
      var blob = new Blob([data], { type: type }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();

  const handleDownloadClick = async item => {
    const response = await downloatAttachmentBySysId(item.uid);
    console.log('response: ==============', response);
    // let data_result = response.data;

    // if (data_result) {
    //   if (data_result.result) data_result = data_result.result;
    //   if (data_result && data_result.AttachmentFileContents) {
    //     data_result.data = data_result.AttachmentFileContents;
    //     response.dataFile = {
    //       contentType: data_result.AttachmentContentType,
    //       fileName: data_result.AttachmentFilename,
    //     };
    //   }
    //   const content = data_result.data || data_result;

    //   const byteCharacters = atob(content);
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);

    //   var buffer = content instanceof Blob ? content : byteArray;
    //   const contentType = response.dataFile
    //     ? response.dataFile.contentType
    //     : item.content_type;
    //   const fileName = response.dataFile
    //     ? response.dataFile.fileName
    //     : item.file_name;

    //   saveBlobToFile(buffer, contentType, fileName);
    // }
  };

  const handlePostRating = async val => {
    setRating(+val);
    try {
      await provideFeedBack({
        kb_article: kbDetail.id,
        kb_user_feedback: dataUser.uid,
        kb_rating: val,
      });
      setUpdateRating((updateRating += 1));
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return;
    }
  };

  const onArticleClick = (kbNumber: string) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
    });
  };
  const handleChangeLike = async (like, comment) => {
    if (!!like) {
      const response = await updateLikeComment(dataUser.user_name, comment.uid);
      console.log(response);
    } else {
      const response = await updateUnlikeComment(comment.liked?.uid);
      console.log(response);
    }
    setLikeCommentChange(!likeCommentChange);
  };

  const submitComment = async (comments, uid) => {
    try {
      const result = await provideFeedBack({
        kb_article: kbDetail.id,
        kb_user_feedback: dataUser.uid,
        kb_comments: comments,
        kb_parent: uid,
      });
      if (result.status === 200) {
        const paramComments = {
          kb_uid: kbDetail.id,
          user_uid: dataUser.uid,
          page_size: 5 * currentPage,
          page_index: 1,
        };
        async function fetchFeedbacks() {
          try {
            let feedbacksResponse = await getUserComments(paramComments);
            let commentsDataRes =
              feedbacksResponse?.data && feedbacksResponse.data?.length > 0
                ? feedbacksResponse.data
                : [];
            let totalCountPagesRes = feedbacksResponse?.totalCount;
            let comment = commentsData.find(
              cmt => cmt.uid === commentsDataRes[0].uid,
            );
            let newCommentsData = [
              ...new Map(
                (!!comment
                  ? [...commentsData, ...commentsDataRes]
                  : [...commentsDataRes, ...commentsData]
                ).map(item => [item.uid, item]),
              ).values(),
            ];
            setCommentsData(newCommentsData);
            setTotalCountPages(totalCountPagesRes);
          } catch (error) {
            console.error('Error', JSON.stringify(error));
            return;
          }
        }
        fetchFeedbacks();
      }
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return;
    }
  };

  const handleChangePage = () => {
    let newPage = currentPage + 1;
    setCurrentPage(newPage);
  };

  const backToKBList = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(HomePath);
    }
  };

  const onDeleteComment = (uid) => {
    setDeletedCommentId(uid);
    setIsOpenDeleteDialog(true);
  }

  const handleDeletedComment = async () => {
    setIsOpenDeleteDialog(false);
    const response = await deleteComment(deletedCommentId);
    if (response?.status === 200) {
      setCommentsData(commentsData.filter(comment => comment.uid !== deletedCommentId));
      setDeletedComment(deletedCommentId);
    }
  }

  const submitEditComment = async (commentVal, uid) => {
    const response = await editComment(uid, {comments: commentVal});
    if (response?.status === 200) {
      setEditedComment(commentVal);
    }
  }

  return (
    <Grid container id="knowledge-container">
      <Grid item xs={12}>
        {isLoading && (
          <Box width="100%" justifyContent="center">
            <Box
              margin="50px auto"
              width="100%"
              maxWidth={{
                xs: '340px',
                sm: '670px',
                lg: '1095px',
                xl: '1400px',
                xxl: '1400px',
              }}
              padding={{
                xxs: '0px 17px',
                xs: '0px 17px',
                sm: '0px 24px',
                md: '0px 24px',
                lg: '0px 80px',
              }}
            >
              <SkeletonCard />
            </Box>
          </Box>
        )}

        {!isLoading && (
          <>
            {/* // Start: branding Michael feedback */}
            <BoxLumos
              backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
              backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
              minHeight={120}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundColor="#FFFFFF"
              justifyContent="center"
            >
              <Grid justifyContent="center" height="100%">
                <Grid flexDirection="column" width="100%"
                  maxWidth={{
                    xs: '340px',
                    sm: '670px',
                    lg: '1095px',
                    xl: '1400px',
                    xxl: '1400px',
                  }}>
                  <Row marginBottom={6} justifyContent="center">
                    <BoxLumos width={{ xs: 1, md: 0.8, lg: 1 / 2 }}>
                      <BoxLumos paddingTop="20px" display="flex" justifyContent="center">
                        <GetSupportSearchInput firstName={dataUser.first_name} />
                      </BoxLumos>
                    </BoxLumos>
                  </Row>
                </Grid>
              </Grid>
            </BoxLumos>
            {/* // End: branding Michael feedback */}
            <TopSection />
            <IoKBDetail
              kbDetail={kbDetail}
              usefulPercentage={kbUsefulPercentage}
              listAtt={listAtt}
              history={history}
              totalView={viewCount}
              mostViewedArt={[
                {
                  kbNumber: '1',
                  kbName: 'abc',
                },
              ]}
              handleDownloadClick={handleDownloadClick}
              backToKBList={backToKBList}
            >
              {!isOutageArticles && (
                <IoFlagHelpful
                  rating={rating}
                  useful={kbUseful}
                  showMessage={showMessage}
                  isUseful={isUseful}
                  handleChangeUseful={val => changeFlagUseful(val)}
                  handleChangeRating={val => handlePostRating(val)}
                />
              )}
            </IoKBDetail>
            {!isOutageArticles && (
              <GridLumos
                paddingX={{ xs: '20px', lg: '152px', xxl: '0px' }}
                width={{ xxl: '1440px' }}
                marginX={{ xxl: 'auto' }}
                styles={{ display: 'contents' }}
              >
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  style={{ paddingRight: '25px' }}
                >
                  <IoComments
                    commentsData={commentsData}
                    // currentTimeZone={currentTimeZone}
                    currentTimeZone=""
                    totalCountPages={totalCountPages}
                    currentPage={currentPage}
                    lastComment={lastComment}
                    handleChangeLike={(val1, val2) =>
                      handleChangeLike(val1, val2)
                    }
                    submitComment={(val1, val2) => submitComment(val1, val2)}
                    handleChangePage={() => handleChangePage()}
                    avatarUser={avatarUser}
                    currentUserId={dataUser.uid}
                    onDeleteComment={onDeleteComment}
                    submitEditComment={submitEditComment}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  {topMostviewedarticle && topMostviewedarticle.length > 0 && (
                    <Box
                      className="ra-box"
                      style={{
                        backgroundColor: '#e6e6e6',
                        height: 'auto',
                        padding: '16px',
                        marginBottom: '10px',
                        marginTop: '10px',
                        borderRadius: '12px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '24px',
                          lineHeight: '28px',
                          fontWeight: 'bold',
                          marginBottom: '34px',
                          marginTop: '0px',
                        }}
                      >
                        Related Articles
                      </h4>
                      {topMostviewedarticle.map(item => {
                        return (
                          <Box
                            style={{
                              padding: '8px',
                            }}
                            key={item.id}
                          >
                            <IoCard.SupportArticle
                              direction="horizontal"
                              cardType={item.knowledgeBase.toUpperCase()}
                              cardTitle={item.name}
                              cardDesc={item.content}
                              lastUpdated={DateUtils.timetoXbyUTC(
                                item.publishedDate,
                                time_zone,
                              )}
                              kbNumber={item.number}
                              rate={item.rating}
                              viewCount={item.viewCount}
                              onViewDetail={onArticleClick}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Grid>
              </GridLumos>
            )}
            <IoDeleteCommentDialog
              isOpen={isOpenDeleteDialog}
              handleDelete={handleDeletedComment}
              handleClose={() => setIsOpenDeleteDialog(false)}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default KnowledgeArticleCard;
