export const lostAndStolenStep1 = {
  'step_1.1': {
    stepKey: 'step_1.1',
    // nextStep: 'step_1.2',
    nextStep: [
      {
        dependOn: 'RadioGroupChooseIssue',
        value: 'lost',
        nextStep: 'step_1.3',
      },
      {
        dependOn: 'RadioGroupChooseIssue',
        value: 'stolen',
        nextStep: 'step_1.2',
      },
    ],
    title: 'Your Missing Device',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: 'MissingDevice',
        paramsBykeys: [
          {
            fromKey: 'deviceID',
            toKey: 'asset_id',
          },
        ],
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
            fromKey: 'model',
            toKey: 'model',
          },
        ],
      },
    ],
    items: [
      {
        id: '45ilrvu4tzzzh7949idlr',
        label:
          'Please share information about <strong>your missing device<strong>.',
        key: 'description1',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: 'noi5flo2rew4u9vef4o43',
        key: 'MissingDevice',
        controlType: 'DevicesDetail',
        active: true,
        componentProps: {
          isLableRefresh: false,
          isCopySerialNumber: false,
          isShowDetailDevice: true,
          isShowSpecifications: false,
          isShowDescription: false,
        },
      },
      {
        id: 'nzjxjbhida3vvcbqbeic5',
        label: "We're sorry to hear about your missing device. Was it lost or stolen?",
        key: 'RadioGroupChooseIssue',
        controlType: 'RadioGroup',
        inlineStyle: {
          display: 'block',
          textAlign: 'center',
          margin: 'auto',
        },
        active: true,
        action: [
          {
            key: 'REFRESH_STEPPER',
          },
          {
            key: 'REFRESH_FORM_ITEMS',
          },
        ],
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
  'step_1.2': {
    stepKey: 'step_1.2',
    nextStep: 'step_1.3',
    title: 'Report Stolen Device',
    items: [
      {
        id: '65esadsadsadb7048204820987654',
        label: 'If you filed a police report for your stolen device, please upload it below.',
        key: 'description1',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadbf70987654jdjaaasdsadg',
        label: 'Police report (optional)',
        key: 'PoliceReport',
        controlType: 'UploadComponent',
        impactFrom: [
          {
            fromControl: 'RadioGroupChooseIssue',
            fieldImpact: 'hidden',
            conditionValue: 'lost',
            matchedValue: true,
            unmatchedValue: false,
          },
        ],
        active: true,
      },
      {
        id: '65esadsadsadb7098e7654',
        label:
          'Click <strong>Next</strong> to continue or <strong>Back</strong> to return to the previous step.',
        key: 'noteStep1.2',
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
    title: 'Confirm Missing Device',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: 'LostDevice1.3',
        paramsBykeys: [
          {
            fromKey: 'deviceID',
            toKey: 'asset_id',
          },
        ],
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
            fromKey: 'model',
            toKey: 'model',
          },
        ],
      },
    ],
    items: [
      {
        id: 'd8kV5klDNwfySB241YnJaK',
        key: 'LineBreak_1_1.3',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: '65esadsadsadb7ssss0987654',
        key: 'note_issue_Step_1.3',
        colspan: { _: '6' },
        impactFrom: [
          {
            fromControl: 'RadioGroupChooseIssue',
            fieldImpact: 'label',
            conditionValue: 'lost',
            matchedValue: 'Issue type: <strong>Lost</strong>',
            unmatchedValue: 'Issue type: <strong>Stolen</strong>',
          },
        ],
        controlType: 'Typography',
        active: true,
      },
      {
        id: 'd8kV5klDNwfySB241YnJaK',
        key: 'LineBreak_1_1.3_1',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: 'noi5flo2rew4u9vef334o43',
        label: 'Lost / Stolen Device',
        key: 'MissingDevice',
        controlType: 'DevicesDetail',
        active: true,
        componentProps: {
          isLableRefresh: false,
          isCopySerialNumber: false,
          isShowDetailDevice: true,
          isShowSpecifications: false,
          isShowDescription: false,
        },
      },
      {
        id: '65esadsadsadb70s32434sdds48ggg820987654',
        key: 'attachmentFilesRef',
        controlType: 'UploadComponent',
        label: 'Police report',
        referenceDataKey: 'PoliceReport',
        componentProps: {
          disabled: true,
        },
        impactFrom: [
          {
            fromControl: 'RadioGroupChooseIssue',
            fieldImpact: 'hidden',
            conditionValue: 'lost',
            matchedValue: true,
            unmatchedValue: false,
          },
        ],
        active: true,
      },
      {
        id: '65esadsadsadb7ssss0987654',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Click <strong>Next</strong> to confirm your missing device or <strong>Back</strong> to change the status.',
        key: 'noteStep1.3',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
};

export const lostAndStolenStep2 = {
  'step_1.1': {
    stepKey: 'step_1.1',
    nextStep: 'step_1.2',
    title: 'Shipping Details',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: 'MissingDevice',
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
        id: '45ilrvu4tzzzh7933349idlr',
        label: 'Please provide shipping address and contact information.',
        key: 'description1',
        componentProps: {
          textAlign: 'center',
        },
        controlType: 'Typography',
        active: true,
      },
      {
        id: 'noi5flo2rew4u9vef4o22243',
        colspan: { xxs: '12', md: '12', lg: '6' },
        key: 'ShippingAddress',
        label: 'Shipping Address',
        controlType: 'AddressComponent',
        validation: {
          type: 'addressObject',
        },
        active: true,
      },
      {
        id: '65esadsadsadbee7568',
        key: 'ShippingContact',
        label: 'Contact Information',
        errorMsg: 'Error',
        colspan: { xxs: '12', md: '12', lg: '6' },
        controlType: 'DeliveryContactComponent',
        validation: {
          type: 'contactObject',
        },
        active: true,
      },
      {
        id: 'weklh77dx0tqf0mc0wnm1',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Please enter your <strong>Shipping</Strong> address. Click <strong>Next</Strong> to select your replacement device.',
        key: 'description2',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  'step_1.2': {
    stepKey: 'step_1.2',
    nextStep: 'step_1.3',
    title: 'Choose Your New Device',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_ELIGIBLE_REFRESH_ASSETS',
        impactTo: 'SelectPCRefreshDevice',
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
    items: [
      {
        id: 'wRtcZFPA1E05EAXJQDLCo',

        componentProps: {
          textAlign: 'center',
        },
        label:
          'Please select your new device and click <strong>Next</Strong> to confirm your request.',
        key: 'description1',
        controlType: 'Typography',
        active: true,
      },
      {
        id: '65esadsadsadb7098sadsd7654',
        label: '',
        key: 'SelectPCRefreshDevice',
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
      {
        id: '8NPPDO4BvKYTQ1A9TNYTV',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Make your selection and click <strong>Next</strong> to continue, or <strong>Back</strong> to return to the previous step.',
        key: 'description2',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  'step_1.3': {
    stepKey: 'step_1.3',
    title: 'Confirm Details',
    items: [
      {
        id: 'klKsvqn3Pm130fQUGyGtk',
        label:
          'Please confirm the shipping address and contact information.',
        key: 'description6',
        componentProps: {
          textAlign: 'center',
        },
        controlType: 'Typography',
        active: true,
      },
      {
        id: 'd8kV5klDNwfySB24YnJaK',
        key: 'LineBreak2',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: '65esadsadsadb7ssss0987654',
        key: 'note_issue_Step_1.3',
        impactFrom: [
          {
            fromControl: 'RadioSelected',
            fieldImpact: 'label',
            conditionValue: 'lost',
            matchedValue: 'Issue type: <strong>Lost</strong>',
            unmatchedValue: 'Issue type: <strong>Stolen</strong>',
          },
        ],
        controlType: 'Typography',
        active: true,
      },
      {
        id: 'eMzpfKRudBiTMHfU5lOnn',
        key: 'LineBreak1',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
      },
      {
        id: 'ehCe7QUxOQPcZfwXcFb7K',
        label: 'Missing PC',
        colspan: { xxs: '12', md: '6', lg: '6' },
        key: 'MissingDevice',
        controlType: 'DeviceInfoComponent',
        active: true,
      },
      {
        id: 'rtjNzAKKxXioSXTmh63JO',
        label: 'Replacement PC',
        colspan: { xxs: '12', md: '6', lg: '6' },
        key: 'NewDevice',
        referenceDataKey: 'SelectPCRefreshDevice',
        controlType: 'DeviceInfoComponent',
        active: true,
      },

      {
        id: '65esadsadsa1111db7568',
        colspan: { xxs: '12', md: '6', lg: '6' },
        referenceDataKey: 'ShippingAddress',
        label: 'Shipping Address',
        key: 'ReturnAddress3',
        controlType: 'AddressComponent',
        componentProps: {
          disabled: true,
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568888',
        key: 'ShippingContactRef',
        label: 'Shipping Contact',
        referenceDataKey: 'ShippingContact',
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
      {
        id: '65esadsadsadb7234223',
        key: '65esadsadsadb7234223',
        controlType: 'Empty',
        active: true,
      },
      {
        id: '65esadsadsadfdb7568',
        label: 'Edit Address',
        key: 'BackToNewDeviceDelivery',
        controlType: 'Link',
        inlineStyle: {
          textAlign: 'end',
          marginTop: '-25px',
        },
        action: [
          {
            key: 'JUMP_TO_STEP',
            data: {
              value: 'step_1.1',
            },
          },
        ],
        active: true,
      },
      {
        id: 'tyuxjbhida3vvcbqbeic5',
        label: '',
        key: 'RadioSelected',
        hidden: true,
        controlType: 'RadioGroup',
        active: true,
      },
      {
        id: 'eMzpfKRudBiTMHfU5lOcc',
        key: 'LineBreak1',
        label: 'Address',
        controlType: 'LineBreak',
        active: true,
        impactFrom: [
          {
            fromControl: 'RadioSelected',
            fieldImpact: 'hidden',
            conditionValue: 'lost',
            matchedValue: true,
            unmatchedValue: false,
          },
        ],
      },
      {
        id: '77esadsadsadb70987654',
        label: '<strong>Attachments</strong>',
        key: 'description9',
        controlType: 'Typography',
        active: true,
        impactFrom: [
          {
            fromControl: 'RadioSelected',
            fieldImpact: 'hidden',
            conditionValue: 'lost',
            matchedValue: true,
            unmatchedValue: false,
          },
        ],
      },
      {
        id: 'ttT9kgn4hT65UrUmEvxmP',
        key: 'attachmentFilesRef',
        controlType: 'UploadComponent',
        componentProps: {
          disabled: true,
        },
        active: true,
        impactFrom: [
          {
            fromControl: 'RadioSelected',
            fieldImpact: 'hidden',
            conditionValue: 'lost',
            matchedValue: true,
            unmatchedValue: false,
          },
        ],
      },
      {
        id: '65esadsadsadb70987654',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Click <strong>Submit</strong> to confirm replacement and get advice on what to do next, or <strong>Back</strong> to return to the previous step.',
        key: 'description7',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
};

export const dynamicFormDefaultData = [
  {
    key: 'ReturnAddress',
    data: {
      companyName: 'DXC',
      country: '',
    },
  },
  {
    key: 'ReturnAddress2',
    data: {
      companyName: 'DXC',
      country: '',
    },
  },
  {
    key: 'RadioGroupChooseIssue',
    data: [
      {
        value: 'lost',
        name: 'Lost',
      },
      {
        value: 'stolen',
        name: 'Stolen',
      },
    ],
  },
  {
    key: 'RadioSelected',
    data: [
      {
        value: 'lost',
        name: 'Lost',
      },
      {
        value: 'stolen',
        name: 'Stolen',
      },
    ],
  },
];
