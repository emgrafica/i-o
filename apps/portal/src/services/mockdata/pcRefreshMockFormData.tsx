export enum pcRefreshMainKey {
  RETURN_DEVICE = 'ReturnDevice',
  RETURN_ADDRESS = 'ReturnAddress',
  RETURN_CONTACT = 'ReturnContact',
  SELECTED_DEVICE = 'SelectPCRefreshDevice',
  SHIPPING_ADDRESS = 'ShippingAddress',
  SHIPPING_CONTACT = 'ShippingContact',
}

export const dynamicFormData = {
  'step_1.1': {
    stepKey: 'step_1.1',
    nextStep: 'step_1.2',
    title: 'Your Current Device',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: pcRefreshMainKey.RETURN_DEVICE,
        storeValueBykeys: [
          {
            fromKey: 'model_category',
            toKey: 'model_category',
          },
          {
            fromKey: 'company',
            toKey: 'company',
          },
          {
            fromKey: 'model_type',
            toKey: 'model',
          },
        ],
        paramsBykeys: [
          {
            fromKey: 'deviceID',
            toKey: 'asset_id',
          },
        ],
      },
    ],
    items: [
      {
        id: '65esadsadsadb72342',
        label:
          'Your device is at the end of its life cycle, please confirm your current device is shown below.',
        key: 'description1',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        label: 'Device to be replaced:',
        key: pcRefreshMainKey.RETURN_DEVICE,
        controlType: 'DevicesDetail',
        componentProps: {
          isLableRefresh: false,
          isCopySerialNumber: false,
          isShowDetailDevice: true,
          isShowSpecifications: false,
          isShowDescription: false,
        },
        active: true,
      },
      {
        id: '65esadsadsadb70987654',
        label: 'Click <strong>Next</strong> to continue with the request.',
        key: 'description2',
        componentProps: {
          textAlign: 'center',
        },
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  'step_1.2': {
    stepKey: 'step_1.2',
    nextStep: 'step_1.3',
    title: 'Shipping Details',
    items: [
      {
        id: '65esadsadsadb7234223',
        label: 'Please provide shipping address and contact information.',
        key: 'description1',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        colspan: { xxs: '12', md: '12', lg: '6' },
        key: pcRefreshMainKey.RETURN_ADDRESS,
        label: 'Shipping Address',
        controlType: 'AddressComponent',
        validation: {
          type: 'addressObject',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        key: pcRefreshMainKey.RETURN_CONTACT,
        label: 'Shipping Contact',
        errorMsg: 'Error',
        colspan: { xxs: '12', md: '12', lg: '6' },
        controlType: 'DeliveryContactComponent',
        validation: {
          type: 'contactObject',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7234223',
        key: 'LineBreak_Step_1.2',
        label: 'Contact',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        label: 'Return Device:',
        key: 'ReturnDevice1',
        referenceDataKey: pcRefreshMainKey.RETURN_DEVICE,
        componentProps: {
          isLableRefresh: false,
          isCopySerialNumber: false,
          isShowDetailDevice: true,
          isShowSpecifications: false,
          isShowDescription: false,
        },
        controlType: 'DevicesDetail',
        active: true,
      },

      {
        id: '65esadsadsadb7234223',
        label:
          'When the shipping address and shipping contact is correct, Click <strong>Next</Strong> to select your new device.',
        key: 'description2',
        componentProps: {
          textAlign: 'center',
        },
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  'step_1.3': {
    stepKey: 'step_1.3',
    nextStep: 'step_1.5',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_ELIGIBLE_REFRESH_ASSETS',
        impactTo: pcRefreshMainKey.SELECTED_DEVICE,
        paramsBykeys: [
          {
            fromKey: 'model_category',
            toKey: 'category',
          },
          {
            fromKey: 'model',
            toKey: 'model',
          },
        ],
      },
    ],
    title: 'Choose Your New Device',
    items: [
      {
        id: '65esadsadsadb70987654',
        label:
          'Please select your new device and click <strong>Next</Strong> to confirm your request.',
        key: 'description3',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7098sadsd7654',
        key: pcRefreshMainKey.SELECTED_DEVICE,
        controlType: 'SelectDeviceComponent',
        active: true,
        validation: {
          type: 'common_type',
          value: [
            {
              validateCondition: 'required',
            },
          ],
        },
      },
    ],
  },
  // 'step_1.4': {
  //   stepKey: 'step_1.4',
  //   nextStep: 'step_1.5',
  //   title: 'Shipping Address',
  //   items: [
  //     {
  //       id: '65esadsadsadb7234223',
  //       label: 'Please confirm where you want us to deliver your new device. ',
  //       key: 'description4',
  //       controlType: 'Typography',
  //       active: true,
  //     },
  //     {
  //       id: '65esadsadsadb7568',
  //       key: pcRefreshMainKey.SHIPPING_ADDRESS,
  //       referenceDataKey: pcRefreshMainKey.RETURN_ADDRESS,
  //       controlType: 'AddressComponent',
  //       label: 'Shipping Address',
  //       colspan: { xxs: '12', md: '12', lg: '6' },
  //       validation: {
  //         type: 'addressObject',
  //       },
  //       active: true,
  //     },
  //     {
  //       id: '65esadsadsadb7568',
  //       key: pcRefreshMainKey.SHIPPING_CONTACT,
  //       label: 'Shipping Contact',
  //       referenceDataKey: pcRefreshMainKey.RETURN_CONTACT,
  //       errorMsg: 'Error',
  //       colspan: { xxs: '12', md: '12', lg: '6' },
  //       controlType: 'DeliveryContactComponent',
  //       validation: {
  //         type: 'contactObject',
  //       },
  //       active: true,
  //     },
  //     {
  //       id: '65esadsadsadb7234223',
  //       key: 'LineBreak_Step_1.3',
  //       label: 'Contact',
  //       controlType: 'LineBreak',
  //       active: true,
  //     },
  //     {
  //       id: '65esadsadsadb7568',
  //       label: 'Return Device:',
  //       key: 'ReturnDevice2',
  //       referenceDataKey: pcRefreshMainKey.SELECTED_DEVICE,
  //       controlType: 'DevicesDetail',
  //       componentProps: {
  //         isShowDetailDevice: false,
  //         isShowSpecifications: false,
  //       },
  //       active: true,
  //     },

  //     {
  //       id: '65esadsadsadb70987654',
  //       label: 'Click Start to continue with the request, or Cancel to stop.',
  //       key: 'description5',
  //       controlType: 'Typography',
  //       active: true,
  //     },
  //   ],
  // },
  'step_1.5': {
    stepKey: 'step_1.5',
    // nextStep: 'step_1.6',
    title: 'Confirm Refresh Order',
    items: [
      {
        id: '65esadsadsadb7234223',
        label:
          "You're almost done! Review the details below and click <strong>Submit</strong> at the bottom to place your order.",
        key: 'description6',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        colspan: { xxs: '12', md: '6', lg: '6' },
        key: 'ReturnDevice3',
        label: 'Return Device',
        referenceDataKey: pcRefreshMainKey.RETURN_DEVICE,
        controlType: 'DeviceInfoComponent',
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        label: 'Requested Device',
        colspan: { xxs: '12', md: '6', lg: '6' },
        key: 'ReturnDevice4',
        referenceDataKey: pcRefreshMainKey.SELECTED_DEVICE,
        controlType: 'DeviceInfoComponent',
        active: true,
      },
      {
        id: '65esadsadsadb7234223',
        key: 'LineBreak1',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        colspan: { xxs: '12', md: '6', lg: '6' },
        key: 'ReturnAddress1',
        label: 'Shipping Address',
        referenceDataKey: pcRefreshMainKey.RETURN_ADDRESS,
        componentProps: {
          disabled: true,
        },
        controlType: 'AddressComponent',
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        referenceDataKey: pcRefreshMainKey.RETURN_CONTACT,
        key: 'ReturnContactRef',
        label: 'Shipping Contact',
        errorMsg: 'Error',
        colspan: { xxs: '12', md: '6', lg: '6' },
        controlType: 'DeliveryContactComponent',
        componentProps: {
          disabled: true,
        },
        validation: {
          type: 'contactObject',
        },
        active: true,
      },
      // {
      //   id: '65esadsadsadb7568',
      //   colspan: { xxs: '12', md: '6', lg: '6' },
      //   referenceDataKey: pcRefreshMainKey.SHIPPING_ADDRESS,
      //   label: 'Shipping Address',
      //   key: 'ReturnAddress3',
      //   controlType: 'AddressComponent',
      //   componentProps: {
      //     disabled: true,
      //   },
      //   active: true,
      // },
      // {
      //   id: '65esadsadsadb7568',
      //   key: 'ShippingContactRef',
      //   label: 'Shipping Contact',
      //   referenceDataKey: pcRefreshMainKey.SHIPPING_CONTACT,
      //   errorMsg: 'Error',
      //   colspan: { xxs: '12', md: '6', lg: '6' },
      //   controlType: 'DeliveryContactComponent',
      //   componentProps: {
      //     disabled: true,
      //   },
      //   validation: {
      //     type: 'contactObject',
      //   },
      //   active: true,
      // },
      // {
      //   id: '65esadsadsadb7234223',
      //   key: '65esadsadsadb7234223',
      //   controlType: 'Empty',
      //   active: true,
      // },
      {
        id: '65esadsadsadfdb7568',
        label: 'Edit Address',
        key: 'Link1',
        controlType: 'Link',
        // colspan: { xxs: '12', md: '6', lg: '6' },
        inlineStyle: {
          textAlign: 'end',
          // marginTop: '-25px',
        },
        action: [
          {
            key: 'JUMP_TO_STEP',
            data: {
              value: 'step_1.2',
            },
          },
        ],
        active: true,
      },
      // {
      //   id: '65esadsadsadfdb7568',
      //   label: 'Edit Address',
      //   key: 'BackToNewDeviceDelivery',
      //   controlType: 'Link',
      //   colspan: { xxs: '12', md: '6', lg: '6' },
      //   inlineStyle: {
      //     textAlign: 'end',
      //     marginTop: '-25px',
      //   },
      //   action: [
      //     {
      //       key: 'JUMP_TO_STEP',
      //       data: {
      //         value: 'step_1.4',
      //       },
      //     },
      //   ],
      //   active: true,
      // },
      // {
      //   id: '65esadsadsadb7234223',
      //   key: 'LineBreak2',
      //   label: 'Contact',
      //   controlType: 'LineBreak',
      //   active: true,
      // },
      // {
      //   id: '65esadsadsadb7568',
      //   referenceDataKey: pcRefreshMainKey.RETURN_CONTACT,
      //   key: 'ReturnContactRef',
      //   label: 'Collection Contact',
      //   errorMsg: 'Error',
      //   colspan: { xxs: '12', md: '6', lg: '6' },
      //   controlType: 'DeliveryContactComponent',
      //   componentProps: {
      //     disabled: true,
      //   },
      //   validation: {
      //     type: 'contactObject',
      //   },
      //   active: true,
      // },

      {
        id: '65esadsadsadb70987654',
        label: 'Click <strong>Submit</strong> to place your device order.',
        componentProps: {
          textAlign: 'center',
        },
        key: 'description7',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
};

export const dynamicFormDefaultData = [
  {
    key: pcRefreshMainKey.RETURN_ADDRESS,
    data: {
      companyName: 'DXC',
      country: '',
    },
  },
  {
    key: pcRefreshMainKey.SHIPPING_ADDRESS,
    data: {
      companyName: 'DXC',
      country: '',
    },
  },
];
