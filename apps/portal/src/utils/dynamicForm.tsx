export enum MasterFormAction {
  SetIsLoading = 'SET_IS_LOADING',
  JumpToStep = 'JUMP_TO_STEP',
  RefreshStepper = 'REFRESH_STEPPER',
  UpdateHeight = 'UPDATE_HEIGHT',
  RefreshFormItems = 'REFRESH_FORM_ITEMS',
  CheckValidationForm = 'CHECK_VALIDATION_FORM',
}

export enum DynamicControlType {
  TYPOGRAPHY = 'Typography',
  DEVICE_INFO_COMPONENT = 'DeviceInfoComponent',
  DEVICE_DETAIL = 'DevicesDetail',
  ADDRESS_COMPONENT = 'AddressComponent',
  SELECT_DEVICE_COMPONENT = 'SelectDeviceComponent',
  TEXT_INPUT = 'TextInput',
  SELECT_BOX = 'SelectBox',
  LINK = 'Link',
  RADIO_GROUP = 'RadioGroup',
  DELIVERY_CONTACT_COMPONENT = 'DeliveryContactComponent',
  DATETIME_PICKER = 'DatetimePicker',
  DETAIL_LOST_STOLEN = 'DetailLostAndStolenComponent',
  UPLOAD_COMPONENT = 'UploadComponent',
  ERROR_WARNING_LINE = 'IconRiErrorWarningLine',
}

export enum ValidationType {
  ADDRESS_OBJECT = 'addressObject',
  TEXT_INPUT = 'text_input',
  COMMON_TYPE = 'common_type',
  CONTACT_PHONE_OBJECT = 'contactObject',
}
export enum ValidationCondition {
  REQUIRED = 'required',
  TEXT_INPUT = 'text_input',
}

export enum WorkFlowType {
  PC_REFRESH = 'pc_refresh',
  PC_ASSIGNMENT_ERROR = 'pc_assignment_error',
  PC_LOST_STOLEN = 'pc_lost_stolen',
  PC_ACKNOWLEDGE_DEVICE = 'pc_acknowledge_device',
  PC_REPORT_BROKEN = 'pc_breakfix',
}
