import {
  ApprovalStatusType,
  ApprovalType,
  approverType,
  ClosingStatus,
  ReasonForRequest,
  ReasonForRequestLabel,
  RequestedForType,
  RequestServiceCategoryType,
  RequestStageType,
  RequestStatusType,
  RequestType,
  ShippingCarrier,
} from 'models/globalTypes';
import {
  MyRequests,
  MyRequests_myRequests_items,
  MyRequests_myRequests_items_product,
  MyRequests_myRequests_items_request_reasonForRequest,
  MyRequests_myRequests_items_approvals_approvers,
} from 'models/types/MyRequests';

const approvers: MyRequests_myRequests_items_approvals_approvers[] = [
  {
    type: approverType.User,
    user: {
      id: '123456778',
      image: null,
      firstName: 'Jen',
      nickName: 'Jenny',
      lastName: 'Lee',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      id: '123456779',
      image: null,
      firstName: 'Peter',
      nickName: 'Pete',
      lastName: 'Johnson',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      id: '123456780',
      image: null,
      firstName: 'Mary',
      nickName: 'Mar',
      lastName: 'Allen',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456781',
      image: null,
      firstName: 'Katie',
      lastName: 'Bowman',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456782',
      image: null,
      firstName: 'Alice',
      lastName: 'Quine',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456783',
      image: null,
      firstName: 'Steve',
      lastName: 'Maple',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456784',
      image: null,
      firstName: 'Olivia',
      lastName: 'Kale',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456785',
      image: null,
      firstName: 'Mike',
      lastName: 'Pullman',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      nickName: '',
      id: '123456786',
      image: null,
      firstName: 'Harry',
      lastName: 'Fen',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      id: '123456787',
      image: null,
      firstName: 'David',
      nickName: '',
      lastName: 'Bell',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      id: '123456788',
      image: null,
      firstName: 'Dan',
      nickName: '',
      lastName: 'Mario',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
  {
    type: approverType.User,
    user: {
      id: '123456789',
      image: null,
      firstName: 'Leo',
      nickName: '',
      lastName: 'King',
      __typename: 'RequestsUser',
    },
    __typename: 'RequestApproverDetails',
  },
];

const gcomRequest = (): MyRequests_myRequests_items => ({
  id: 'GEREQ19017430',
  request: {
    id: 'GERITM22444425',
    type: RequestType.Request,
    workflowId: 'GERITM22445622',
    orderNumber: 'GERITM22445622',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.Provisioning,
      label: ReasonForRequestLabel.newGcomService,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Myself,
    newAssignedTo: null,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Shipped,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: 'ba68f482db7ce0944359005ed396193e',
    type: RequestServiceCategoryType.gcom,
    name: 'Teams Dialtone',
    __typename: 'RequestGcom',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.FedEx,
    number: '123456789',
    url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123456789',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});

const request1 = (): MyRequests_myRequests_items => ({
  id: '1229d6de-659d-4c80-b911-84afada94903',
  request: {
    id: '1229d6de-659d-4c80-b911-84afada94913',
    type: RequestType.Request,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
    orderNumber: 'FOO-ORD-0000010',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    newAssignedTo: null,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Shipped,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: 'Personal',
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.FedEx,
    number: '123456789',
    url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123456789',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});
const returnRequest = (): MyRequests_myRequests_items => ({
  id: '1229d6de-659d-4c80-b911-84afada94904',
  request: {
    id: '1229d6de-659d-4c80-b911-84afada94914',
    type: RequestType.Return,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
    orderNumber: 'FOO-ORD-0000010',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.DeviceBroken,
      label: ReasonForRequestLabel.brokenReplacement,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: 'The Wifi adapter frequently disconnects',
    newAssignedTo: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.PickedUp,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro 2020',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: 'Personal',
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: {
    id: '66f47e2e-4151-4da3-af6f-be5d67864ac0',
    name: 'Apple Macbook Pro 2021',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    __typename: 'ExistingComputerProduct',
  },
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.DHL,
    number: '123456789',
    url: 'https://www.dhl.com/en/express/tracking.html?AWB=123456789&brand=DHL',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});

const reassignRequest = (): MyRequests_myRequests_items => ({
  id: '78bd2da0-0a26-4cab-bc82-d6809e6e5d67',
  request: {
    id: '78bd2da0-0a26-4cab-bc82-d6809e6e5d77',
    type: RequestType.Reassign,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac597e',
    orderNumber: 'FOO-ORD-0000510',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.Reassign,
      label: ReasonForRequestLabel.reassign,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    newAssignedTo: {
      firstName: 'Tim',
      lastName: 'Apple',
      __typename: 'RequestsUser',
    },
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Reassigned,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro 2020',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: null,
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: null,
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});
export const singleRequest = (): MyRequests_myRequests_items => ({
  id: '1229d6de-659d-4c80-b911-84afada94905',
  request: {
    id: '1229d6de-659d-4c80-b911-84afada94915',
    type: RequestType.Request,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
    orderNumber: 'FOO-ORD-0000010',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    newAssignedTo: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Shipped,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: 'Personal',
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.FedEx,
    number: '123456789',
    url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123456789',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});

export const singleRequestForCancel = (): MyRequests_myRequests_items => ({
  id: '1229d6de-659d-4c80-b911-84afada94906',
  request: {
    id: '1229d6de-659d-4c80-b911-84afada94916',
    type: RequestType.Request,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
    orderNumber: 'FOO-ORD-0000010',
    status: RequestStatusType.Approval,
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    newAssignedTo: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: true,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Shipped,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: null,
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: 'Personal',
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.FedEx,
    number: '123456789',
    url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123456789',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});

const closingStatusToRequestStatus: Record<ClosingStatus, RequestStatusType> = {
  [ClosingStatus.Cancelled]: RequestStatusType.Cancelled,
  [ClosingStatus.Declined]: RequestStatusType.Declined,
  [ClosingStatus.Completed]: RequestStatusType.Completed,
};

export const inactiveRequest = (
  closingStatus: ClosingStatus,
): MyRequests_myRequests_items => ({
  id: '1229d6de-659d-4c80-b911-84afada94905',
  request: {
    id: '1229d6de-659d-4c80-b911-84afada94915',
    type: RequestType.Request,
    workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
    orderNumber: 'FOO-ORD-0000010',
    status: closingStatusToRequestStatus[closingStatus],
    newAssignedTo: null,
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    reasonDetails: null,
    submittedDate: 1598454147353,
    submittedBy: {
      id: '12334567',
      firstName: 'John',
      lastName: 'Smith',
      nickName: '',
      image: null,
      __typename: 'RequestsUser',
    },
    requestedForUser: {
      id: '',
      firstName: 'Chris',
      lastName: 'Ladd',
      nickName: '',
      image: '',
      __typename: 'RequestsUser',
    },
    requestedFor: RequestedForType.Other,
    justification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
    actions: {
      cancelable: false,
      __typename: 'RequestActions',
    },
    progress: {
      currentStage: RequestStageType.Approval,
      stages: [
        RequestStageType.Approval,
        RequestStageType.Processing,
        RequestStageType.Shipped,
      ],
      __typename: 'RequestProgress',
    },
    closingInformation: {
      date: 1598454147353,
      reason: closingStatus !== ClosingStatus.Completed ? 'Test reason' : null,
      status: closingStatus,
      __typename: 'ClosingInformation',
    },
    __typename: 'RequestDetails',
  },
  approvals: [
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Pending,
      approvers: approvers.slice(0, 3),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Declined,
      approvers: approvers.slice(3, 6),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Group,
      status: ApprovalStatusType.Cancelled,
      approvers: approvers.slice(6, 9),
      __typename: 'RequestApprovals',
    },
    {
      policy: ApprovalType.Manager,
      status: ApprovalStatusType.Approved,
      approvers: approvers.slice(9),
      __typename: 'RequestApprovals',
    },
  ],
  product: {
    id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
    type: RequestServiceCategoryType.computer,
    name: 'Apple Macbook Pro',
    image:
      'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
    price: '$1234',
    operatingSystem: 'OS X',
    deviceUsage: 'Personal',
    keyboard: 'English',
    __typename: 'RequestComputer',
  },
  existingProduct: null,
  shipping: {
    contactName: 'John Smith',
    contactPhoneNumber: '(800) 433-2682',
    company: 'DXC Technology',
    address1: '75 Fountain St',
    address2: '3rd floor',
    city: 'Providence',
    state: 'Rhode Island',
    zip: '02902',
    country: 'United States',
    additionalDeliveryInfo: 'Sign in on the tablet at the door',
    __typename: 'ShippingDetails',
  },
  trackingDetails: {
    carrierName: ShippingCarrier.FedEx,
    number: '123456789',
    url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123456789',
    __typename: 'TrackingDetails',
  },
  _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
  __typename: 'Request',
});

export const mockInactiveOrder = (
  closingStatus: ClosingStatus,
): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [inactiveRequest(closingStatus)],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockRequests = (): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [request1(), returnRequest(), reassignRequest()],
      totalHits: 2,
      __typename: 'Requests',
    },
  },
});

export const mockSingleRequest = (): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [request1()],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockSingleGcomRequest = (): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [gcomRequest()],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockNoResults = (): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [],
      totalHits: 0,
      __typename: 'Requests',
    },
  },
});

export const mockSingleRequestForCancel = () => ({
  data: {
    myRequests: {
      items: [singleRequestForCancel()],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockRequestWithDeploymentDetails = () =>
  mockRequestWithDeploymentDetailsCustom({
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    requestStatus: RequestStatusType.InProgress,
  });

export const mockRequestWithAccessoryDeploymentDetails = () =>
  mockRequestWithDeploymentDetailsCustom({
    reasonForRequest: {
      value: ReasonForRequest.Primary,
      label: ReasonForRequestLabel.primary,
      __typename: 'ReasonForRequestValueLabel',
    },
    requestStatus: RequestStatusType.InProgress,
    type: RequestServiceCategoryType.accessory,
  });

export const mockRequestWithReturnDetails = () =>
  mockRequestWithReturnDetailsCustom({
    reasonForRequest: {
      value: ReasonForRequest.DeviceBroken,
      label: ReasonForRequestLabel.brokenReplacement,
      __typename: 'ReasonForRequestValueLabel',
    },
    requestStatus: RequestStatusType.InProgress,
  });

export const mockReassignRequest = () => ({
  data: {
    myRequests: {
      items: [reassignRequest()],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export interface RequestCustomType {
  reasonForRequest: MyRequests_myRequests_items_request_reasonForRequest;
  requestStatus: RequestStatusType;
  type?: RequestServiceCategoryType;
}

function getMockProduct(
  type: RequestServiceCategoryType,
): MyRequests_myRequests_items_product {
  return type === RequestServiceCategoryType.accessory
    ? {
        id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
        type,
        name: 'Apple Macbook Pro',
        image:
          'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
        price: '$1234',
        keyboard: 'English',
        plugType: 'A/B Type',
        __typename: 'RequestAccessory',
      }
    : {
        id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
        type,
        name: 'Apple Macbook Pro',
        image:
          'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
        price: '$1234',
        keyboard: 'English',
        deviceUsage: 'Personal',
        operatingSystem: 'OS X',
        __typename: 'RequestComputer',
      };
}
export const mockRequestWithDeploymentDetailsCustom = ({
  reasonForRequest,
  requestStatus,
  type = RequestServiceCategoryType.computer,
}: RequestCustomType): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [
        {
          id: '1229d6de-659d-4c80-b911-84afada94907',
          request: {
            id: '1229d6de-659d-4c80-b911-84afada94917',
            type: RequestType.Request,
            workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
            orderNumber: 'FOO-ORD-0000010',
            status: requestStatus,
            reasonForRequest,
            reasonDetails: null,
            newAssignedTo: null,
            submittedDate: 1598454147353,
            submittedBy: {
              id: '12334567',
              firstName: 'John',
              lastName: 'Smith',
              nickName: '',
              image: null,
              __typename: 'RequestsUser',
            },
            requestedForUser: {
              id: '',
              firstName: 'Chris',
              lastName: 'Ladd',
              nickName: '',
              image: '',
              __typename: 'RequestsUser',
            },
            requestedFor: RequestedForType.Other,
            justification:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
            actions: {
              cancelable: requestStatus === RequestStatusType.Approval,
              __typename: 'RequestActions',
            },
            progress: {
              currentStage: RequestStageType.Approval,
              stages: [
                RequestStageType.Approval,
                RequestStageType.Processing,
                RequestStageType.Shipped,
              ],
              __typename: 'RequestProgress',
            },
            closingInformation: null,
            __typename: 'RequestDetails',
          },
          approvals: [
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Pending,
              approvers: approvers.slice(0, 3),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Declined,
              approvers: approvers.slice(3, 6),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Group,
              status: ApprovalStatusType.Cancelled,
              approvers: approvers.slice(6, 9),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Approved,
              approvers: approvers.slice(9),
              __typename: 'RequestApprovals',
            },
          ],
          product: getMockProduct(type),
          existingProduct: null,
          shipping: {
            contactName: 'John Smith',
            contactPhoneNumber: '(800) 433-2682',
            company: 'DXC Technology',
            address1: '75 Fountain St',
            address2: '3rd floor',
            city: 'Providence',
            state: 'Rhode Island',
            zip: '02902',
            country: 'United States',
            additionalDeliveryInfo: 'Sign in on the tablet at the door',
            __typename: 'ShippingDetails',
          },
          trackingDetails: {
            carrierName: ShippingCarrier.DHL,
            number: '123456789',
            url:
              'https://www.dhl.com/en/express/tracking.html?AWB=123456789&brand=DHL',
            __typename: 'TrackingDetails',
          },
          _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
          __typename: 'Request',
        },
      ],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockRequestWithReturnDetailsCustom = ({
  reasonForRequest,
  requestStatus,
}: RequestCustomType): { data: MyRequests } => ({
  data: {
    myRequests: {
      items: [
        {
          id: '1229d6de-659d-4c80-b911-84afada94908',
          request: {
            id: '1229d6de-659d-4c80-b911-84afada94918',
            type: RequestType.Return,
            workflowId: 'e8db6640-90cd-4451-a53e-3842b8ac596e',
            orderNumber: 'FOO-ORD-0000010',
            status: requestStatus,
            reasonForRequest,
            reasonDetails: 'The Wifi adapter frequently disconnects',
            submittedDate: 1598454147353,
            newAssignedTo: null,
            submittedBy: {
              id: '12334567',
              firstName: 'John',
              lastName: 'Smith',
              nickName: '',
              image: null,
              __typename: 'RequestsUser',
            },
            requestedForUser: {
              id: '',
              firstName: 'Chris',
              lastName: 'Ladd',
              nickName: '',
              image: '',
              __typename: 'RequestsUser',
            },
            requestedFor: RequestedForType.Other,
            justification:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel est finibus, porttitor justo non, pulvinar risus. Nulla eget ex sed dui viverra tempus vitae ut ligula. Duis vel consequat enim. Curabitur lectus augue, congue in leo in, mattis hendrerit orci. Proin volutpat orci eu lorem mollis, vitae accumsan libero lacinia. Fusce luctus quis lectus vitae feugiat. Sed tristique facilisis urna, ut commodo lectus. Quisque tincidunt tellus augue, vel ornare dui ornare vel. Etiam eget elit mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a nibh rutrum, tincidunt lectus sit amet, lobortis erat. Ut ut auctor magna, quis tempor velit.',
            actions: {
              cancelable: true,
              __typename: 'RequestActions',
            },
            progress: {
              currentStage: RequestStageType.Approval,
              stages: [
                RequestStageType.Approval,
                RequestStageType.Processing,
                RequestStageType.Shipped,
              ],
              __typename: 'RequestProgress',
            },
            closingInformation: null,
            __typename: 'RequestDetails',
          },
          approvals: [
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Pending,
              approvers: approvers.slice(0, 3),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Declined,
              approvers: approvers.slice(3, 6),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Group,
              status: ApprovalStatusType.Cancelled,
              approvers: approvers.slice(6, 9),
              __typename: 'RequestApprovals',
            },
            {
              policy: ApprovalType.Manager,
              status: ApprovalStatusType.Approved,
              approvers: approvers.slice(9),
              __typename: 'RequestApprovals',
            },
          ],
          product: {
            id: '55f47e2e-4151-4da3-af6f-be5d67864ac0',
            type: RequestServiceCategoryType.computer,
            name: 'Apple Macbook Pro 2020',
            image:
              'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
            price: '$1234',
            operatingSystem: 'OS X',
            deviceUsage: 'Personal',
            keyboard: 'English',
            __typename: 'RequestComputer',
          },
          existingProduct: {
            id: '66f47e2e-4151-4da3-af6f-be5d67864ac0',
            name: 'Current Computer',
            image:
              'https://i.dell.com/sites/csimages/Video_Imagery/all/latitude-5000-series-new.jpg',
            __typename: 'ExistingComputerProduct',
          },
          shipping: {
            contactName: 'John Smith',
            contactPhoneNumber: '(800) 433-2682',
            company: 'DXC Technology',
            address1: '75 Fountain St',
            address2: '3rd floor',
            city: 'Providence',
            state: 'Rhode Island',
            zip: '02902',
            country: 'United States',
            additionalDeliveryInfo: 'Sign in on the tablet at the door',
            __typename: 'ShippingDetails',
          },
          trackingDetails: {
            carrierName: ShippingCarrier.DHL,
            number: '123456789',
            url:
              'https://www.dhl.com/en/express/tracking.html?AWB=123456789&brand=DHL',
            __typename: 'TrackingDetails',
          },
          _etag: '"0c015d0d-0000-0100-0000-5e0f650a0000"',
          __typename: 'Request',
        },
      ],
      totalHits: 1,
      __typename: 'Requests',
    },
  },
});

export const mockRequestSort = () => ({
  data: {
    catalogRequestSortFilters: [
      {
        sortOption: 'Newest',
        sortValue: 'Newest to Oldest',
        __typename: 'CatalogRequestSortOptions',
      },
      {
        sortOption: 'Oldest',
        sortValue: 'Oldest to Newest',
        __typename: 'CatalogRequestSortOptions',
      },
    ],
  },
});

export const mockRequestDateRange = () => ({
  data: {
    incidentDateFilters: [
      {
        rangeValue: 'Last Month',
        rangeOption: 'lastMonth',
        __typename: 'IncidentDateFilterOptions',
      },
      {
        rangeValue: 'Last Three Months',
        rangeOption: 'lastThreeMonths',
        __typename: 'IncidentDateFilterOptions',
      },
      {
        rangeValue: 'Last Six Months',
        rangeOption: 'lastSixMonths',
        __typename: 'IncidentDateFilterOptions',
      },
      {
        rangeValue: 'This Year',
        rangeOption: 'thisYear',
        __typename: 'IncidentDateFilterOptions',
      },
      {
        rangeValue: 'Last Year',
        rangeOption: 'lastYear',
        __typename: 'IncidentDateFilterOptions',
      },
    ],
  },
});
