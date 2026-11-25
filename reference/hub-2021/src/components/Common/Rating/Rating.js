import "antd/dist/antd.css";
import "./Rating.scss";
import { Col, Radio, Rate, Row, Space, Typography } from "antd";
import { LikeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { LINKLIRARYCONSTANTS } from "../../../constants/linkLibraryConstants";
import { LinkLibraryUtils } from "../../../utils/linkLibrary";
import { SESSIONSTORAGEKEYS } from "../../../constants/storageConstants";
import {
  FEEDBACK_TYPE
} from "../../../common/constant";

const { Text, Title } = Typography;

const Rating = (props) => {
  if (!props.userName) return null;

  const [rateState, setRateState] = useState({
    kb_number: props.kbNumber,
    kb_user_feedback: props.userName,
    kb_useful: "",
    kb_rating: "",
    isLoading: true
  });

  const [disableNoButton, setDisableNoButton] = useState(false);
  const [disableYesButton, setDisableYesButton] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const [showRatingMessage, setShowRatingMessage] = useState(false);

  let passwordUrl = LinkLibraryUtils.GetLinkByOrderNumber(
    SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL,
    LINKLIRARYCONSTANTS.SEARCH_RESULT,
    3
  );
  let resetUrl = LinkLibraryUtils.GetLinkByOrderNumber(
    SESSIONSTORAGEKEYS.LINK_LIBRARY_SEARCH_DETAIL,
    LINKLIRARYCONSTANTS.SEARCH_RESULT,
    4
  );

  useEffect(() => {
    const kb_useful = props.kbUseful ? ((props.kbUseful.toLowerCase()).indexOf('yes') === -1 ? '' : 'yes') : '' ; 
    setRateState({ ...rateState, kb_rating: props.kbRating, kb_useful });
    if (kb_useful === "yes") {
      setDisableYesButton(true);
    } else {
      setDisableYesButton(false);
    }
  }, [props.kbRating, props.kbUseful]);

  function onChangeRate(e) {
    setRateState({ ...rateState, kb_rating: e });
    if (props.userName && e) {
      setShowRatingMessage(false);
      props.sendFeedback({
        kb_number: props.kbNumber,
        kb_user_feedback: props.userName,
        kb_rating: e
      }, FEEDBACK_TYPE.RATING);
      setShowRatingMessage(true);
    }
  }
  function onChangeValue(e, kb_useful) {
    setRateState({
      ...rateState,
      [e.target.name]: e.target.value,
      kb_useful: (kb_useful.toLowerCase()).indexOf('yes') === -1 ? '' : 'yes',
      isLoading: false
    });
    if (props.userName && e.target.value) {
      if((kb_useful.toLowerCase()).indexOf('yes') === -1) {
        setDisableNoButton(true);
        setDisableYesButton(true);
      } else {
        setDisableYesButton(true);
      }
      setShowMessage(true);
      let params = {
        kb_number: props.kbNumber,
        kb_user_feedback: props.userName,
        [e.target.name]: e.target.value,
      };
      if(!!kb_useful){
        params = {
          ...params,
          kb_useful
        };
      }
      props.sendFeedback(params, FEEDBACK_TYPE.HASH_TAG);
    }
    
  }
  return (
    <Row className="rateContainer" gutter={[0, 16]}>
      <Col xs={24} md={24}>
        <Row gutter={[8, 8]} className="group-rate-item">
          <Col xs={24} md={24} className="rate-article">
            <Row gutter={[8, 8]}>
              <Col span={24} xs={24}>
                <Text>Rate This Article</Text>
              </Col>
              <Col xs={16} md={8}>
                <Rate
                  name="kb_rating"
                  className='rate'
                  value={rateState.kb_rating}
                  onChange={onChangeRate}
                />
              </Col>
              <Col xs={8} md={16} className="kb_rating-thanksful-msg" >
                {!props.isLoading && showRatingMessage && <span className='show-hide-text'>
                  Thanks!
                </span>}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={24}>
        <Row
          className="rating-feedback-component"
          gutter={[0, 16]}
          justify="center"
        >
          <Col xs={24} md={8}>
            <h4 className='mb0'>
              Did this solve your issues?
              </h4></Col>
          <Col xs={24} md={8}  className="mobile-bottom-border">
            <Radio.Group
              name="kb_useful"
              onChange={(e)=>{
                onChangeValue(e,'yes')
              }}
              className="radio-button"
              value={rateState.kb_useful}
              disabled={disableYesButton}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="yes">
                <Space>
                  <LikeFilled className='radio-button-icon'/>
                  Yes 
                </Space>
              </Radio.Button>

            </Radio.Group>
          </Col>
          <Col xs={24} md={8}>
            {showMessage &&<span id='hideMe'>
              Thank you for your feedback
            </span>}
          </Col>
          <Col xs={24} md={8}>
            <Text className="help-narrow-label" >Help us narrow it down:</Text>
          </Col>
          <Col xs={24} md={16}>
            <Radio.Group
              name="kb_comments"
              className="radio-button"
              buttonStyle="outline"
              onChange={(e)=>{
                onChangeValue(e,'no')
              }}
              value={rateState.kb_comments}
              disabled={disableNoButton}
            >
              <Space wrap>
                <Radio.Button value="broad">Too Broad</Radio.Button>
                <Radio.Button value="specific">Too Specific</Radio.Button>
                <Radio.Button value="wrong">Wrong Topic</Radio.Button>
                <Radio.Button value="right">
                  Right Topic, but Need More Help
                    </Radio.Button>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Rating;
