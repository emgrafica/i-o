import React, { FormEventHandler, useState } from 'react';
import {
  AgreementForm,
  CheckboxWrapper,
  CheckoutActionsContainer,
} from './styled';
import { Button, Form, Grid, Typography, useToasts } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import {
  CreateCatalogReturnOrder,
  CreateCatalogReturnOrderVariables,
} from 'pages/confirmationPages/ReturnConfirmationPage/mutations/gqlTypes/CreateCatalogReturnOrder';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import { ReturnCheckoutLocationState } from 'pages/TechnologyPage/types';
import {
  ManagePersonalTechnologyCheckoutConfirmationPath,
  ManagePersonalTechnologyPath,
} from 'utils/routes';
import CancelModal from 'pages/TechnologyPage/CancelModal';
import { useCheckoutContext } from '.';
import { ActionTypes } from './types';
import { OrderType } from 'gqlTypes/globalTypes';
import { CREATE_CATALOG_RETURN_ORDER } from 'pages/confirmationPages/ReturnConfirmationPage/mutations/createCatalogReturnOrder';
import { useFormFields } from 'utils/useFormFields';

const CheckoutActions: React.FC = () => {
  const { t } = useTranslation('technology');
  const history = useHistory();
  const location = useLocation<ReturnCheckoutLocationState>();
  const [createOrder] = useMutation<
    CreateCatalogReturnOrder,
    CreateCatalogReturnOrderVariables
  >(CREATE_CATALOG_RETURN_ORDER);

  // Get OBOUser
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;

  const { addToast } = useToasts();
  const userId = useUserId();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { state, dispatch } = useCheckoutContext();
  const { formData } = useFormFields({
    acknowledged: {
      defaultValue: false,
    },
  });

  if (!location.state) {
    history.push(ManagePersonalTechnologyPath);
  }
  const { reason, asset } = location.state;

  const handleError = () => {
    dispatch({
      type: ActionTypes.SET_IS_LOADING,
      payload: false,
    });
    addToast(t('checkout.failureMessage'), {
      kind: 'danger',
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      autoDismiss: 5000,
    });
  };

  const handleSubmit: FormEventHandler = async e => {
    const { shippingAddress, content } = state;
    e.preventDefault();
    dispatch({
      type: ActionTypes.SET_IS_LOADING,
      payload: true,
    });

    if (userId) {
      // if OBO is active, requests are for OBO user, else requests are for logged user
      const requestedFor = oboUser ? oboUser.userId : userId;
      try {
        const { data, errors } = await createOrder({
          variables: {
            data: {
              assetId: asset.id,
              orderType: OrderType.Computer,
              address: shippingAddress,
              reason: reason.value,
              requestedFor,
              catalogItemId: asset.catalogItemId,
            },
          },
        });
        if (errors) {
          handleError();
        } else if (data) {
          history.push({
            pathname: ManagePersonalTechnologyCheckoutConfirmationPath,
            state: {
              asset,
              reason,
              pickupAddress: shippingAddress,
              data,
              content,
            },
          });
        }
      } catch (error) {
        console.error(error);
        handleError();
      }
    }
  };

  const isAcknowledged = state.agreement ? formData.acknowledged.value : true;

  return (
    <Grid flexDirection="column">
      {state.agreement && (
        <Grid flexDirection="column">
          <Typography kind="body1" color="secondary.1">
            {t('checkout.agreementTitle')}
          </Typography>
          <Typography kind="body1" color="secondary.1">
            {state.agreement}
          </Typography>
          <AgreementForm name="agreement">
            <CheckboxWrapper
              htmlFor="agreementCheckbox"
              label={t('common:acknowledgementLabel')}
              inlineLabel
            >
              <Form.Checkbox
                id="agreementCheckbox"
                name="acknowledgement"
                checked={formData.acknowledged.value}
                onChange={() =>
                  formData.acknowledged.set(!formData.acknowledged.value)
                }
              />
            </CheckboxWrapper>
          </AgreementForm>
        </Grid>
      )}
      <CheckoutActionsContainer>
        <Button
          kind="secondary"
          type="button"
          onClick={() => {
            setIsCancelModalOpen(true);
          }}
          marginX={2}
        >
          {t('common:cancelOrder')}
        </Button>
        <Button
          disabled={!state.isFormValid || !isAcknowledged}
          onClick={handleSubmit}
          marginX={2}
        >
          {t('common:submitOrder')}
        </Button>
        <CancelModal
          isModalOpen={isCancelModalOpen}
          setIsModalOpen={setIsCancelModalOpen}
        />
      </CheckoutActionsContainer>
    </Grid>
  );
};

export default CheckoutActions;
