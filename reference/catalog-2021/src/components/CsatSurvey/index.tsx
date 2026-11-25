import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { Alert, Box, Button, Form, Typography } from '@lumos/core';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import LoadingScreen from 'components/LoadingScreen';
import StarRating from 'components/StarRating';
import { SUBMIT_CSAT_FEEDBACK } from 'graphql/mutations/submitCSATFeedback';
import {
  SubmitCSATFeedback,
  SubmitCSATFeedbackVariables,
} from 'graphql/mutations/gqlTypes/SubmitCSATFeedback';

interface CsatSurveyProps {
  ticketId: string;
  catalogClass: CatalogItemClass;
}

/**
 * CSAT Survey component
 */
const CsatSurvey: React.FC<CsatSurveyProps> = ({ ticketId, catalogClass }) => {
  const { t } = useTranslation();
  const [starRating, setStarRating] = useState<number>();
  const [howHelpful, setHowHelpful] = useState<string>();
  const [thoughtsFeedback, setThoughtsFeedback] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [submitCSATFeedback, { loading, data }] = useMutation<
    SubmitCSATFeedback,
    SubmitCSATFeedbackVariables
  >(SUBMIT_CSAT_FEEDBACK, {
    onError: () => {
      setShowSubmitError(true);
    },
  });

  const howHelpfulOptions = [
    t('csatSurvey:veryHelpful'),
    t('csatSurvey:somewhatHelpful'),
    t('csatSurvey:neutral'),
    t('csatSurvey:somewhatUnhelpful'),
    t('csatSurvey:veryUnhelpful'),
  ];

  return (
    <Box
      width="100%"
      marginTop={{ xs: '24px', md: '6px', lg: '38px' }}
      paddingY="16px"
      paddingX={{ xs: '16px', md: '24px' }}
      borderRadius="3px"
      backgroundColor="rgba(255, 255, 255, 0)"
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.15)"
    >
      {loading ? (
        <Box height={{ xs: '633px', lg: '654px' }}>
          <LoadingScreen />
        </Box>
      ) : data ? (
        <Box>
          <Typography kind="h6">{t('csatSurvey:thankYou')}</Typography>
          <Typography kind="body2" paddingBottom={{ xs: '0px', lg: '9px' }}>
            {t('csatSurvey:valuedFeedback')}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography kind="h6">{t('csatSurvey:title')}</Typography>
          <Typography kind="body2" marginBottom="0px">
            {t('csatSurvey:rateExperience')}
          </Typography>
          <StarRating rating={starRating} setRating={setStarRating} />
          <Form name="csatSurvey" padding="0px">
            <Form.Item
              label={t('csatSurvey:howHelpful')}
              htmlFor="HelpfulRadio"
              fontSize="14px"
              padding="0px"
              marginTop={{ xs: '5px', lg: '9px' }}
            >
              <Form.RadioGroup
                name="HelpfulRadio"
                headingLabel=""
                stacked
                marginBottom="16px"
              >
                {howHelpfulOptions.map(helpfulOption => (
                  <Form.Item
                    key={helpfulOption}
                    label={helpfulOption}
                    htmlFor={helpfulOption}
                    inlineLabel
                    fontSize="14px"
                    paddingX="0px"
                  >
                    <Form.Radiobox
                      id={helpfulOption}
                      value={helpfulOption}
                      defaultChecked={helpfulOption === howHelpful}
                      onChange={() => setHowHelpful(helpfulOption)}
                    />
                  </Form.Item>
                ))}
              </Form.RadioGroup>
            </Form.Item>
            <Form.Item
              label={t('csatSurvey:thoughtsFeedback')}
              htmlFor="thoughtsFeedbackTextArea"
              fontSize="14px"
              paddingX="0px"
              paddingTop="0px"
            >
              <Form.TextArea
                marginTop="0px"
                maximum={250}
                value={thoughtsFeedback}
                onChange={event => setThoughtsFeedback(event.target.value)}
              />
            </Form.Item>
          </Form>
          <Typography kind="body3" margin="0px">
            {t('csatSurvey:feedbackVoluntary')}
          </Typography>
          {showSubmitError && (
            <Alert
              kind="danger"
              contrast="low"
              message={t('common:submissionFailure')}
              closeable
              marginTop="10px"
            />
          )}
          <Box
            display="flex"
            flex={1}
            justifyContent="flex-end"
            minWidth="100%"
            marginTop="38px"
          >
            <Button
              disabled={!starRating || !howHelpful}
              onClick={() => {
                if (starRating && howHelpful) {
                  submitCSATFeedback({
                    variables: {
                      ticketId,
                      catalogClass: catalogClass,
                      experienceRating: starRating,
                      productHelpfulness: howHelpful,
                      feedback: thoughtsFeedback,
                    },
                  });
                }
              }}
              width="105px"
            >
              {t('common:submit')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CsatSurvey;
