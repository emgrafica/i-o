import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { Label, Value } from './index.style';
import {
  useOBOInfoLocalState,
  useReportBrokenInfo,
} from 'store/apollo/store/hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { Box } from '@lumos/core';

const ReportBrokenOrderDetails = () => {
  const { t } = useTranslation('checkout');
  const reportBrokenInfo = useReportBrokenInfo();
  const currentUserId = useUserId();
  const oboUserInfo = useOBOInfoLocalState();
  const requestedForUserId =
    oboUserInfo && oboUserInfo.user ? oboUserInfo.user.userId : currentUserId;

  if (!reportBrokenInfo) {
    return null;
  }
  const { incidentNumber, details, usage } = reportBrokenInfo;
  return (
    <Box>
      <GridLayout columnGutters={0}>
        <Row>
          <Col colspan={{ xxs: '12', xs: '4' }}>
            <Label>{t('reportBroken.orderDetails.requestedFor')}</Label>
            <Value>{requestedForUserId}</Value>
          </Col>
        </Row>
        <Row>
          <Col colspan={{ xxs: '12', xs: '4' }}>
            <Label>{t('reportBroken.orderDetails.reasonForRequest')}</Label>
            <Value>
              {t('reportBroken.orderDetails.reasonForRequestValue')}
            </Value>
          </Col>
        </Row>
        <Row>
          <Col colspan={{ xxs: '12', xs: '4' }}>
            <Label>{t('reportBroken.orderDetails.deviceUsage')}</Label>
            <Value>{usage}</Value>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>{t('reportBroken.orderDetails.incidentNumber')}</Label>
            <Value>{incidentNumber}</Value>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>{t('reportBroken.orderDetails.situationDetails')}</Label>
            <Value>{details}</Value>
          </Col>
        </Row>
      </GridLayout>
    </Box>
  );
};

export default ReportBrokenOrderDetails;
