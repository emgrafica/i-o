import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { Alert, Box, Button, Form } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { ADD_INCIDENT_COMMENT } from 'graphql/mutations/incidentComments';
import {
  AddIncidentComment,
  AddIncidentCommentVariables,
} from 'graphql/mutations/gqlTypes/AddIncidentComment';
import { FormActionGroup } from 'pages/TechnologyPage/index.style';
import { INCIDENT_COMMENTS } from '../../../../../graphql/queries/incidentComments';
import { IncidentComments } from '../../../../../graphql/queries/gqlTypes/IncidentComments';
import LoadingScreen from 'components/LoadingScreen';

const CommentFormBox = styled(Box)`
  background-color: #f8f8f9;
  padding: 10px 8px 25px 8px;
  margin-top: 20px;
`;

const MAX_LENGTH = 250;

interface CommentFormProps {
  canAddComment: boolean;
  incidentId: string;
  incidentNumber: string;
  dispatchCommentAdded: Dispatch<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({
  canAddComment,
  incidentId,
  incidentNumber,
  dispatchCommentAdded,
}) => {
  const { t } = useTranslation('requests');
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const whitespace = /^\s*$/;

  const [addIncidentComment, { loading }] = useMutation<
    AddIncidentComment,
    AddIncidentCommentVariables
  >(ADD_INCIDENT_COMMENT, {
    update: (store, { data }) => {
      // invalid state
      if (!data) {
        handleFailure();
      } else {
        const current = Object.assign(
          {},
          store.readQuery<IncidentComments>({
            query: INCIDENT_COMMENTS,
            variables: { incidentId },
          }),
        );
        if (!current) {
          handleFailure();
        } else {
          // handle success
          current.incidentComments.items.push(data.addComment);
          store.writeQuery({
            query: INCIDENT_COMMENTS,
            variables: { incidentId },
            data: current,
          });
          //clears alert when successful
          setShowAlert(false);
          // clear the comments
          setComment('');
          // signal success to parent
          dispatchCommentAdded();
        }
      }
    },
  });

  const shouldBlockSubmit = whitespace.test(comment) || loading;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleFailure = () => {
    setShowAlert(true);
  };

  const submit = async () => {
    try {
      const { errors } = await addIncidentComment({
        variables: {
          incidentId,
          incidentNumber,
          comment,
        },
      });

      if (errors) {
        handleFailure();
      }
    } catch (error) {
      handleFailure();
    }
  };

  const handleCloseAlert = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // todo - may be propose to Lumos Audit
    //  Alert doesn't have a prop to observe the close event, which causing
    //  the Alert instance not able to be reused. The hack used here is based
    //  on the Lumos source code which guarantee only the close button has
    //  the 'path' as child in the svg icon.
    if (e.target && (e.target as HTMLElement).querySelector('path')) {
      setShowAlert(false);
    }
  };

  return (
    <CommentFormBox>
      <Form.Section disabled={!canAddComment}>
        {loading ? (
          <Box marginTop="82px" marginBottom="40px">
            <LoadingScreen />
          </Box>
        ) : (
          <>
            <Form.Item
              required
              htmlFor="comment-input"
              label={t('incident.addComment')}
            >
              <Form.TextArea
                id="comment-input"
                maximum={MAX_LENGTH}
                maxLength={MAX_LENGTH}
                rows={5}
                onChange={handleChange}
                value={comment}
              />
            </Form.Item>
            {showAlert && (
              <Alert
                kind="warning"
                message={t('common:submissionFailure')}
                closeable
                compact
                marginTop="20px"
                onClick={handleCloseAlert}
              />
            )}

            <FormActionGroup marginTop="12px">
              <Button
                data-testid="submit-comment"
                kind="accent"
                disabled={shouldBlockSubmit}
                onClick={submit}
              >
                {t('common:submit')}
              </Button>
            </FormActionGroup>
          </>
        )}
      </Form.Section>
    </CommentFormBox>
  );
};

export default CommentForm;
