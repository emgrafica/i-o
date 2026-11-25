import PackageBox from 'assets/images/branding/package_box.png';
export const dynamicFormData = {
  'step_1.1': {
    stepKey: 'step_1.1',
    nextStep: 'step_1.2',
    title: 'Need any shipping materials?',
    stepTitle: 'Need any shipping materials',
    items: [
      {
        id: '65esadsadsadb7234223',
        label: '',
        key: 'description1',
        controlType: 'Typography',
        componentProps: {
          textAlign: 'center',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7234223',
        label: 'Error Warning Line',
        key: 'RiErrorWarningLine1.1',
        controlType: 'ImageComponent',
        image: PackageBox,
        inlineStyle: {},
        componentProps: {
          justifyContent: 'center',
          display: 'flex',
          minHeight: '380px',
        },
        active: true,
      },
      {
        id: 'nzjxjbhida3vvcbqbeic5',
        key: 'ShippingBoxRequire',
        label:
          'Need a box to ship your device? We can send one to you or you can use your own.',
        controlType: 'RadioGroup',
        inlineStyle: {
          display: 'block',
          textAlign: 'center',
          margin: 'auto',
        },
        active: true,
        action: [],
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
        id: '65esadsadsadb7098e7654',
        componentProps: {
          textAlign: 'center',
        },
        label: 'Click <strong>Next</strong> to add your shipping information for the box and/or label.',
        key: 'noteStep1.1',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  'step_1.2': {
    stepKey: 'step_1.2',
    nextStep: 'step_1.3',
    title: 'Shipping Details',
    stepTitle: 'Where should we send the box',
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
        key: 'ReturnAddress1.1',
        label: 'Shipping Address:',
        colspan: { xxs: '12', md: '12', lg: '6' },
        controlType: 'AddressComponent',
        validation: {
          type: 'addressObject',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        key: 'ReturnAddress1.2',
        label: 'Contact Information:',
        errorMsg: 'Error',
        colspan: { xxs: '12', md: '12', lg: '6' },
        controlType: 'DeliveryContactComponent',
        validation: {
          type: 'contactObject',
        },
        active: true,
      },
      // {
      //   id: '65esadsadsadb7568',
      //   label: 'Device to be returned:',
      //   key: 'ReturnDevice',
      //   controlType: 'DevicesDetail',
      //   active: true,
      //   componentProps: {
      //     isLableRefresh: false,
      //     isCopySerialNumber: false,
      //     isShowDetailDevice: true,
      //     isShowSpecifications: false,
      //     isShowDescription: false,
      //   },
      // },
      {
        id: '65esadsadsadb7098e7654',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Click <strong>Next</strong> to continue or <strong>Back</strong> to return to the previous step.',
        key: 'noteStep1.2',
        controlType: 'Typography',
        active: true,
      },
    ],
  },
  // 'step_1.3': {
  //   stepKey: 'step_1.3',
  //   nextStep: 'step_1.4',
  //   title: 'Prepare the PC for Return',
  //   items: [
  //     {
  //       id: '65esadsadsadb7234223',
  //       label:
  //         '<ul>' +
  //         '<li>Use OneDrive to transfer data to your new laptop.</li>' +
  //         '<li>For future reference,save the serial number of the PC you are returning.</li>' +
  //         '<li>For future reference,save the serial number of the PC you are returning.</li>' +
  //         '<li>Remove sensitive data from the PC. This may take several hours. You can skip this step if your PC is encrypted.</li>' +
  //         '<li>Remove Basic Input/Output System (BIOS) lock passwords. Skip this step if you do not know what this is, you probably did not install a lock password.</li>' +
  //         '<li>Remove personal information added to the BIOS, including your name, phone number, and address. Skip this step if you did not do this or know where to find it.</li>' +
  //         '<li>Return the PC with all its components, such as the original hard disk drive, memory modules, and AC adapter. </li>' +
  //         '</ul>',
  //       key: 'description1',
  //       controlType: 'Typography',
  //       active: true,
  //     },

  //     {
  //       id: '65esadsadsadb7234223',
  //       label:
  //         '<strong>IMPORTANT:</strong> Return even the defective components Your business unit will be charged for missing one or more components. skip this step if your PC is encrypted.',
  //       key: 'description2',
  //       controlType: 'Typography',
  //       active: true,
  //     },
  //   ],
  // },
  'step_1.3': {
    stepKey: 'step_1.3',
    title: 'Confirm Return Details',
    stepTitle: 'Confirm Return Details',
    items: [
      {
        id: '65esadsadsadb7234223',
        label:
          'Please confirm the shipping address and contact information.',
        key: 'description4',
        componentProps: {
          textAlign: 'center',
        },
        controlType: 'Typography',
        active: true,
      },

      // {
      //   id: '65esadsadsadb7098e7654',
      //   label: 'Return Device'    ,
      //   key: 'noteStep1.1',
      //   controlType: 'Typography',
      //   active: true,
      //   componentProps: {
      //     kind: "h5",
      //   },
      // },

      {
        id: '65esadsadsadb7568',
        label: 'Return Device',
        key: 'ReturnDevice',
        // referenceDataKey: 'ReturnDevice',
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
        id: '65esadsadsadb7568',
        label: 'Shipping Address: ',
        key: 'ReturnAddress3.1',
        colspan: { xxs: '12', md: '12', lg: '6' },
        referenceDataKey: 'ReturnAddress1.1',
        controlType: 'AddressComponent',
        validation: {
          type: 'addressObject',
        },
        active: true,
      },
      {
        id: '65esadsadsadb7568',
        label: 'Contact Information:',
        key: 'ReturnAddress3.2',
        colspan: { xxs: '12', md: '12', lg: '6' },
        referenceDataKey: 'ReturnAddress1.2',
        controlType: 'DeliveryContactComponent',
        // validation: {
        //   type: 'addressObject',
        // },
        active: true,
      },

      {
        id: '65esadsadsadb70987654',
        componentProps: {
          textAlign: 'center',
        },
        label:
          'Click <strong>Submit</strong> to continue.',
        key: 'description5',
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
    key: 'ShippingBoxRequire',
    data: [
      {
        value: 'yes',
        name: 'Please send me a box',
      },
      {
        value: 'no',
        name: 'I have a box and will return my device',
      },
    ],
  },
];
