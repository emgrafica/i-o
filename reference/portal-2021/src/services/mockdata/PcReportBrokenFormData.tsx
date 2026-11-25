export const dynamicFormData = {
  'step_1.1': {
    stepKey: 'step_1.1',
    title: 'Report Broken Device',
    customHandler: [
      {
        type: 'CALL_SERVICE',
        serviceKey: 'GET_DEVICE_BY_ID',
        impactTo: 'ReturnDevice',
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
        id: 'noi5flo2rew4u9vef4o43',
        key: 'ReturnDevice',
        controlType: 'DevicesDetail',
        active: true,
        componentProps: {
          isLableRefresh: false,
          isCopySerialNumber: true,
          isShowDetailDevice: true,
          isShowSpecifications: false,
          isShowDescription: false,
        },
      },
      {
        id: '45ilrvu4tzzzh7949idlr',
        label:
          'Please click the <b>Chat With An Agent</b> button below to report your broken device.<br />Initiate a chat session and select <strong>"Hardware"</strong> as your issue and reference the device serial number in the comment window.',
        key: 'description1',
        controlType: 'Typography',
        active: true,
        componentProps: {
          textAlign: 'center',
        },
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
];
