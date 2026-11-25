export enum pcAssignErrorMainKey {
  DEVICE_ISSUE = 'DeviceIssue',
  CHOOSE_ISSUE = 'RadioGroupChooseIssue',
  TRACKING_DETAIL = 'TrackingDetail',
}

export const dynamicFormData = {
  'step_1.1': {
    stepKey: 'step_1.1',
    title: "I Don't Have This Device",
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: pcAssignErrorMainKey.DEVICE_ISSUE,
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
        id: '65esadsadsadb7568',
        label: 'Device to be replaced:',
        key: pcAssignErrorMainKey.DEVICE_ISSUE,
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
        id: '65esadsadsadbasd72342',
        label: 'What do you know about this device?',
        key: pcAssignErrorMainKey.CHOOSE_ISSUE,
        controlType: 'RadioGroup',
        // inlineStyle: {
        //   display: 'block',
        //   textAlign: 'center',
        //   margin: 'auto',
        // },
        active: true,
        validation: {
          type: 'common_type',
          value: [
            {
              validateCondition: 'required',
            },
          ],
        },
        action: [
          {
            key: 'REFRESH_STEPPER',
          },
          {
            key: 'REFRESH_FORM_ITEMS',
          },
        ],
      },
      {
        id: '65esadsadsadbasd723422',
        label: 'Provide request number (if available)',
        key: pcAssignErrorMainKey.TRACKING_DETAIL,
        controlType: 'TextInput',
        componentProps: {
          multiline: true,
          rows: 3,
          variant: 'outlined',
        },
        impactFrom: [
          {
            fromControl: pcAssignErrorMainKey.CHOOSE_ISSUE,
            fieldImpact: 'hidden',
            conditionValue: ['', undefined],
            matchedValue: true,
            unmatchedValue: false,
          },
          {
            fromControl: pcAssignErrorMainKey.CHOOSE_ISSUE,
            fieldImpact: 'label',
            conditionValue: ['never-had-device', 'other-reason'],
            matchedValue: 'Provide additional Comments (if any)',
            unmatchedValue: 'Provide request number (if available)',
          },
        ],
        active: true,
      },
    ],
  },
};

export const dynamicFormDefaultData = [
  {
    key: pcAssignErrorMainKey.CHOOSE_ISSUE,
    data: [
      {
        value: 'return-device',
        name: "I returned this device.",
      },
      {
        value: 'belonged-previous-employee',
        name: 'This belonged to a previous employee.',
      },
      {
        value: 'never-had-device',
        name: "I don't recognize the device / I never had this device.",
      },
      {
        value: 'other-reason',
        name: "Other",
      },
    ],
  },
];
