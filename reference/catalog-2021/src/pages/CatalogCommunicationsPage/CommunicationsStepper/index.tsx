import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Stepper } from '@lumos/core';
import telephoneImage from 'assets/images/telephone.png';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';
import {
  GComResolveSku_gcomResolveSku_sku as Sku,
  GComResolveSku_gcomResolveSku_components as GComComponent,
} from 'graphql/queries/gqlTypes/GComResolveSku';
import { useCart } from 'store';
import { IHash, CartGcomProduct } from 'store/Cart';
import { CheckoutPath, RequestGComPath } from 'utils/routes';
import { CheckoutTypes } from '../../CatalogPage/utils';
import AccountInformation from './subSections/AccountInformation';
import LocationOfService from './subSections/LocationOfService';
import ProductSelection from './subSections/ProductSelection';
import { SPECIAL_REQUEST_SKU } from '../utils';

export enum StepperAction {
  Back = 'back',
  Continue = 'continue',
  Proceed = 'proceed',
}

/**
 * Location label/value
 */
export interface LocationOption {
  label: string;
  value: string;
}

/**
 * Props for CommunicationStepper
 */
export interface CommunicationStepperProps {
  currentUser: UserProfileRequest_userProfile;
  billedToUser: UserProfileRequest_userProfile;
}

/**
 * Communications stepper component
 */
const CommunicationStepper: React.FC<CommunicationStepperProps> = ({
  currentUser,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const currentUserId = useUserId() as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [billedToUser, setBilledToUser] = useState(currentUser);
  const [state, setState] = useState<string | null>();
  const [city, setCity] = useState<string | null>();
  const [selectedProduct, setSelectedProduct] = useState<CartGcomProduct>({
    value: '',
    label: '',
  });
  const [selectedSite, setSelectedSite] = useState<LocationOption>({
    value: '',
    label: '',
  });
  const [selectedSku, setSelectedSku] = useState<Sku | null>();
  const [selectedSkuComponents, setSelectedSkuComponents] = useState<
    GComComponent[]
  >([]);
  const [selectedSkuAnswers, setSelectedSkuAnswers] = useState<IHash>({});
  const [cart, setCart] = useCart(currentUserId);

  const updateCurrentStep = (stepperAction: StepperAction) => {
    if (stepperAction === StepperAction.Continue) {
      setCurrentStep(currentStep + 1);
    } else if (stepperAction === StepperAction.Back) {
      setCurrentStep(currentStep - 1);
    } else {
      if (billedToUser && state && city && selectedSite && selectedSku) {
        const { sku, description, reasonForRequest, hasShipping } = selectedSku;

        // Manage Special Request
        let businessJustification = '';
        let answers = selectedSkuAnswers;
        if (sku === SPECIAL_REQUEST_SKU) {
          const selectedSkuAnswer = selectedSkuAnswers[sku];
          if (selectedSkuComponents.length > 0) {
            businessJustification =
              selectedSkuAnswer[selectedSkuComponents[0].id];
          }
        }

        setCart({
          ...cart,
          items: [
            {
              checkoutType: CheckoutTypes.GCom,
              data: {
                billedToUser,
                location: {
                  state,
                  city,
                  site: selectedSite.value,
                },
                sku,
                selectedProduct,
                image: telephoneImage,
                description,
                reasonForRequest,
                businessJustification,
                hasShipping,
                answers,
                skuComponents: selectedSkuComponents,
              },
            },
          ],
        });
        history.push(CheckoutPath, {
          force: true,
          from: RequestGComPath,
        });
      }
    }
  };

  const subSectionComponents = [
    {
      label: 'pages:request.gcom.accountInformation.label',
      hint: 'pages:request.gcom.accountInformation.hint',
      component: (
        <AccountInformation
          updateCurrentStep={updateCurrentStep}
          currentUser={currentUser}
          billedToUser={billedToUser}
          setBilledToUser={setBilledToUser}
        />
      ),
    },
    {
      label: 'pages:request.gcom.locationOfService.label',
      hint: 'pages:request.gcom.locationOfService.hint',
      component: (
        <LocationOfService
          updateCurrentStep={updateCurrentStep}
          billedToUser={billedToUser}
          currentUser={currentUser}
          state={state}
          setState={setState}
          city={city}
          setCity={setCity}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          setSelectedProduct={setSelectedProduct}
        />
      ),
    },
    {
      label: 'pages:request.gcom.productSelection.label',
      hint: 'pages:request.gcom.productSelection.hint',
      component: (
        <ProductSelection
          updateCurrentStep={updateCurrentStep}
          currentUser={currentUser}
          selectedSku={selectedSku}
          setSelectedSku={setSelectedSku}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedSkuComponents={selectedSkuComponents}
          setSelectedSkuComponents={setSelectedSkuComponents}
          selectedSkuAnswers={selectedSkuAnswers}
          setSelectedSkuAnswers={setSelectedSkuAnswers}
          site={selectedSite}
        />
      ),
    },
  ];

  return (
    <Box>
      <Stepper kind="vertical" currentStep={currentStep} marginY={4}>
        {subSectionComponents.map((subSection, index) => {
          return (
            <Stepper.Step
              content={subSection.component}
              key={index}
              completed={currentStep > index}
            >
              <Stepper.StepLabel>
                {t(subSection.label)}
                <Stepper.StepHint>{t(subSection.hint)}</Stepper.StepHint>
              </Stepper.StepLabel>
            </Stepper.Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default CommunicationStepper;
