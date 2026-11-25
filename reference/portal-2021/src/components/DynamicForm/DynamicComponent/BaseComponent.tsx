// @ts-nocheck
import { Col, Grid, Row, Typography, Box } from '@lumos/core';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  IoDateTimePicker,
  IoDetailLostAndStolen,
  IoMydevicesDetail,
  IoUpload,
  IoAttachment,
} from '@i-o/design-system';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { DynamicControlType, MasterFormAction } from 'utils/dynamicForm';
import { useFormControls } from '../dynamicFormControl';
import AddressCard from './CustomComponent/addressCard';
import DeliveryContact from './CustomComponent/deliveryContact';
import PrimaryDeviceItemCard from './CustomComponent/PrimaryDeviceItemCard';
import SelectDeviceComponent from './CustomComponent/selectDeviceComponent';
import RadioGroup from './Input/radioGroup';
import { CustomLink, CustomTextField } from './style';
import { RiErrorWarningLine } from 'react-icons/ri';

export interface BaseComponent {
  items: any;
  service: any;
  updateFormItem: any;
  masterFormAction: any;
}

/** Clamp the title for cards*/
const BaseComponent: React.FC<DynamicComponent> = ({
  item,
  service,
  updateFormItem,
  masterFormAction,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [value, setValue] = useState(item.componentData.value);
  useEffect(() => {
    if (!!item.componentProps) {
      const msgs = item.componentProps.errorMsg
        ? item.componentProps.errorMsg
        : [];
      if (item.validation) {
        setIsValid(!item.componentProps.error);
        setErrorMsg(msgs.length > 0 ? msgs[0] : '');
      }
    }
  }, [item]);

  const { checkValidItem } = useFormControls();
  const isControlValid = async (item, value) => {
    masterFormAction(MasterFormAction.CheckValidationForm);
    const errorMsgs = await checkValidItem(item, value);
    setIsValid(errorMsgs.length === 0);
    setErrorMsg(errorMsgs.length > 0 ? errorMsgs[0] : '');
  };
  const updateItem = (key, value = null, action = null) => {
    if (value !== null) {
      setValue(value);
      service.updateItemValueByKey(key, value);
    }
    if (action) {
      action.forEach(element => {
        masterFormAction(element.key, element.data, value);
      });
    }
  };

  const renderCustomComponent = e => {
    let defaultProps = {
      ...e.componentProps,
      ...e.componentData,
      value,
      style: {
        ...(e.inlineStyle ? e.inlineStyle : {}),
      },
    };
    switch (e.controlType) {
      case DynamicControlType.TYPOGRAPHY:
        return (
          <Typography kind="body1" {...defaultProps}>
            {ReactHtmlParser(e.label)}
          </Typography>
        );
      case 'DeviceInfoComponent':
        return <PrimaryDeviceItemCard label={e.label} {...defaultProps} />;

      case DynamicControlType.DEVICE_DETAIL:
        return (
          <IoMydevicesDetail
            {...defaultProps}
            itemDetail={{
              configuration: {},
              ...(e.componentData.value
                ? e.componentData.value
                : e.componentData.data),
              actions: {},
            }}
            listLink={[]}
            horizontal={true}
          />
        );
      case DynamicControlType.ADDRESS_COMPONENT:
        return (
          <AddressCard
            {...defaultProps}
            label={e.label}
            errorText={errorMsg}
            error={!isValid}
            onChange={value => {
              updateItem(e.key, value, e.action);
              // updateFormItem(e.key);
              isControlValid(e, value);
            }}
          />
        );
      case DynamicControlType.DELIVERY_CONTACT_COMPONENT:
        return (
          <DeliveryContact
            {...defaultProps}
            label={e.label}
            errorText={errorMsg}
            error={!isValid}
            onChange={value => {
              updateItem(e.key, value, e.action);
              isControlValid(e, value);
            }}
          />
        );
      case DynamicControlType.SELECT_DEVICE_COMPONENT:
        return (
          <SelectDeviceComponent
            {...defaultProps}
            onChange={value => {
              updateItem(e.key, value);
              masterFormAction(MasterFormAction.UpdateHeight);
              isControlValid(e, value);
            }}
          />
        );
      case DynamicControlType.RADIO_GROUP:
        return (
          <RadioGroup
            {...defaultProps}
            error={!isValid}
            label={e.label}
            onChange={value => {
              updateItem(e.key, value.target.value, e.action);
              isControlValid(e, value.target.value);
            }}
          />
        );
      case DynamicControlType.TEXT_INPUT:
        return (
          <>
            <CustomTextField
              {...defaultProps}
              InputLabelProps={{ required: e.validation?.value?.length > 0 }}
              id={e.key}
              error={!isValid}
              label={e.label}
              onBlur={() => {
                isControlValid(e, e.componentData.value);
              }}
              onChange={value => {
                updateItem(e.key, value.target.value);
              }}
            />
          </>
        );
      case DynamicControlType.SELECT_BOX:
        return (
          <>
            <InputLabel id={`${e.key}-label`}>{e.key}</InputLabel>
            <Select
              {...defaultProps}
              error={!isValid}
              labelId={`${e.key}-label`}
              id={e.key}
              onChange={value => {
                updateItem(e.key, value, e.action);
              }}
            >
              {defaultProps.data &&
                defaultProps.data.map((e, index) => (
                  <MenuItem key={index} value={e.value}>
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
          </>
        );
      case DynamicControlType.LINK:
        return (
          <>
            <CustomLink
              {...defaultProps}
              onClick={() => {
                updateItem(e.key, null, e.action);
              }}
            >
              {e.label}
            </CustomLink>
          </>
        );
      case 'LineBreak':
        return <Divider />;
      case DynamicControlType.DATETIME_PICKER:
        return (
          <IoDateTimePicker
            {...defaultProps}
            error={!isValid}
            label={e.label}
            defaultValue={defaultProps.value}
            onChange={value => {
              updateItem(e.key, value.target.value);
              isControlValid(e, value.target.value);
            }}
          />
        );
      case DynamicControlType.DETAIL_LOST_STOLEN:
        return <IoDetailLostAndStolen {...defaultProps} />;
      case DynamicControlType.UPLOAD_COMPONENT:
        return (
          <>
            <Typography kind="body1">{ReactHtmlParser(e.label)}</Typography>
            <Grid>
              <Row>
                {!defaultProps.disabled && (
                  <Col colspan={{ xxs: '12', md: '6', lg: '6' }}>
                    <IoUpload
                      {...defaultProps}
                      fullWidth={true}
                      handleChange={files => {
                        let newFiles = files;
                        if (value)
                          newFiles = files.filter(
                            file =>
                              !value.find(f => {
                                return f.fileName === file.name;
                              }),
                          );
                        let result = newFiles.map(e => {
                          e.fileName = e.name;
                          return e;
                        });
                        if (value) {
                          value.forEach(e => {
                            result.push(e);
                          });
                        }
                        updateItem(e.key, result);
                      }}
                    />
                  </Col>
                )}

                <Col colspan={{ xxs: '12', md: '6', lg: '6' }}>
                  <IoAttachment
                    attachments={value ? value : []}
                    isShowDownload={false}
                    isShowDelete={!defaultProps.disabled}
                    fullWidth={true}
                    handleDeleteFileClick={item => {
                      if (value) {
                        let res = value.filter(
                          e => e.fileName !== item.fileName,
                        );
                        updateItem(e.key, res);
                      }
                    }}
                  />
                </Col>
              </Row>
            </Grid>
          </>
        );
      case DynamicControlType.ERROR_WARNING_LINE:
        return <RiErrorWarningLine {...defaultProps} />;

      case 'ImageComponent':
        return (
          <Box {...defaultProps}>
            <img src={e.image} alt="Process" />
          </Box>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <Col
      colspan={item.colspan ? item.colspan : { _: '12' }}
      {...(item.styles ? item.styles : {})}
      paddingY="10px"
      lineHeight="0px"
      key={item.key}
    >
      <FormControl fullWidth>{renderCustomComponent(item)}</FormControl>
    </Col>
  );
};

export default BaseComponent;
