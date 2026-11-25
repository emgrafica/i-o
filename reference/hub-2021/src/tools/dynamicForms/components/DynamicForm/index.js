import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Form, Input } from "antd";

import {
  formLayoutTypes,
  httpMethods,
  labelAligns
} from "../../constants/commonTypes";
import {
  serializeObjectWithDot,
  isDefinedAndNotEmpty,
  shallowEqual,
  isDefined,
  getObjectFromString
} from "../../utils";
import { sendRequest } from "../../common/network";
import {
  colHorizontalType,
  colVerticalType,
  filterLayout,
  formItemLayout,
  formItemLayoutVertical,
  formLayout,
  inputSpace
} from "./constants";
import {
  getValueByInputType,
  getError,
  getInputType,
  hasErrors
} from "./helpers";

import "./style.scss";

const FormItem = Form.Item;

class DynamicForm extends PureComponent {
  constructor(props) {
    super(props);
    this.formObject = {};
    this.state = { inputs: [] };
    this.updateFormObject(props.inputs, true);
    // this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    const {
      hasSubmitButton,
      // form: { validateFields },
      url,
      httpMethod,
      objectKey
    } = this.props;
    if (url) this.getFormFields(url, httpMethod, objectKey);
    // else if (hasSubmitButton) this.props.form.validateFields();
  }

  componentDidUpdate(prevProps) {
    if (!shallowEqual(this.props.inputs, prevProps.inputs))
      this.clearDeletedValues();
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.inputs, nextProps.inputs))
      this.updateFormObject(nextProps.inputs);
  }

  updateFormObject = (inputs = [], fromConstructor) => {
    let value = { ...this.formObject };

    for (const element of inputs) {
      if (isDefined(element.initialValue))
        value = {
          ...value,
          [element.key]: element.initialValue
        };


    }
    //console.log(">>>>>>>>>>>>>>>updateFormObject: value"+JSON.stringify(value));
    //console.log(">>>>>>>>>>>>>>>updateFormObject: fromConstructor "+fromConstructor);

    this.setFormObject(value, !fromConstructor);
  };

  getFormFields = (url, httpMethod, objectKey) => {
    sendRequest({
      url,
      method: httpMethod,
      onSuccess: result => {
        this.setState({
          inputs: objectKey ? getObjectFromString(objectKey, result) : result
        });
      }
    });
  };

  clearDeletedValues = () => {
    let changed = false;
    let result = {};
    for (const key in this.formObject) {
      if (this.formObject.hasOwnProperty(key)) {
        const element = this.formObject[key];
        if (this.props.inputs.findIndex(input => input.key === key) !== -1)
          result = { ...result, [key]: element };
        else changed = true;
      }
    }
    this.setFormObject({ ...result });
    if (changed) this.onChange();
  };

  calculateFormValues = formObject => {
    let result = {};
    for (const key in formObject) {
      if (formObject.hasOwnProperty(key)) {
        const element = formObject[key];
        if (isDefinedAndNotEmpty(element))
          result = { ...result, [key]: element };
      }
    }
    return result;
  };

  setFormObject = (newValue, stateIsReady) => {
    if (!shallowEqual(this.formObject, newValue)) {
      this.formObject = newValue ? newValue : {};
      if (stateIsReady) this.forceUpdate();
    }
  };

  onChange = (input, dataField, e, type, label) => {
    const { onChange } = this.props;
    if (e !== undefined) {
      const value = getValueByInputType(e, type);
      this.setFormObject({
        ...this.formObject,
        [dataField]: value
      });
    }
    if (onChange) {
      const values = this.calculateFormValues(this.formObject);
      onChange(values);
    }
  };

  onKeyPress = (input, dataField, e, type, label) => {
    if (e.key === "Enter") this.onChange(input, dataField, e, type, label);
  };

  // onSubmit = e => {
  //   e.preventDefault();
  //   const { onSubmit } = this.props;
  //   //console.log(">>>>>>>>>>>>>>>this.props.form" + this.props.form);
  //   //console.log(">>>>>>>>>>>>>>>onSubmit" + onSubmit);

  //   this.props.form.validateFields(err => {
  //     if (!err && onSubmit) {
  //       const value = this.calculateFormValues(this.formObject);
  //       onSubmit(serializeObjectWithDot(this.formObject), value);
  //     }
  //   });
  // };

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; 

  onBlur(e) {
    e.preventDefault();
  }

  reset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

//TODO: important
  renderField = (field = {}) => {

    //console.log(">>>>>>>>>>>>renderField" + JSON.stringify(field));
    //console.log(">>>>>>>>>>>> this.props.form" + JSON.stringify( this.props.form));
    const placeholder = "";

   
    let {
      id,
      inputType: type,
      initialValue,
      // placeholder,
      name: label,
      key: code,
      objectKey,
      options,
      fieldOptions = {},
      fieldProps,
      formItemProps = {},
      url,
      valueKeyName,
      labelKeyName,
      multiSelect,
      relatedTo,
      relatedKey,
      noLabel,
      span,
      key
    } = field;

    const {
      // form: { getFieldDecorator, getFieldError, isFieldTouched },
      errorOnFocus,
      layoutType,
      getChangeWithEnterPress,
      keyValueSelect
    } = this.props;
    const inputType = getInputType(type);
    const workWithKeyPress =
      inputType.canWorkWithKeyPress && getChangeWithEnterPress;
    const onChange = workWithKeyPress
      ? null
      : e => this.onChange(field, code, e, inputType, label);
    const onKeyPress = workWithKeyPress
      ? e => this.onKeyPress(field, code, e, inputType, label)
      : null;
    const DynamicInput = inputType.creator(
      {
        label,
        options,
        ...fieldProps,
        ...(inputType.remote
          ? {
              valueKeyName,
              labelKeyName,
              objectKey,
              relatedKey,
              url,
              URLKey: id
            }
          : {}),
        ...(inputType.canMultiple
          ? { mode: multiSelect ? "multiple" : "default" }
          : {}),
        ...(keyValueSelect && inputType.canKeyValueResult
          ? { labelInValue: true }
          : {}),
        ...(relatedTo ? { related: this.formObject[relatedTo] } : {}),
        ...(inputType.noLabel ? { noLabel } : {})
      },
      {
        onChange,
        onKeyPress
      }
    );
    // const DynamicInputContainer = placeholder ? (
    //   <PlaceHolderContainer placeholder={placeholder}>
    //     {DynamicInput}
    //   </PlaceHolderContainer>
    // ) : (
    //   DynamicInput
    // );

    // const { hasError, validateStatus, error } = getError(
    //   isFieldTouched,
    //   getFieldError,
    //   code,
    //   errorOnFocus
    // );
    const hasError = false;
    const validateStatus = true;
    const error = [];
    //TODO
    const isInline = layoutType === formLayoutTypes.inline;
    const colLayoutFormItem = isInline
      ? formItemLayout
      : formItemLayoutVertical;
    const initValue = initialValue
      ? inputType.canMultiple
        ? initialValue instanceof Array
          ? initialValue
          : [initialValue]
        : initialValue
      : undefined;

    //console.log(">>>>>>>>>>>>>>>code " + code);
    //console.log(">>>>>>>>>>>>>>>...fieldOptions " + JSON.stringify(fieldOptions));
    //console.log(">>>>>>>>>>>>>>>...initValue " + JSON.stringify(initValue));
    //console.log(">>>>>>>>>>>>>>>...colLayoutFormItem " + JSON.stringify(colLayoutFormItem));
    //console.log(">>>>>>>>>>>>>>>...fieldOptions.rules " + JSON.stringify(fieldOptions));
    //console.log(">>>>>>>>>>>>>>>...placeholder " + placeholder);
    //console.log(">>>>>>>>>>>>>>>...hasError " + hasError);
    //console.log(">>>>>>>>>>>>>>>...validateStatus " + validateStatus);
    //console.log(">>>>>>>>>>>>>>>...error " + error);
    //console.log(">>>>>>>>>>>>>>>...fieldOptions " + JSON.stringify(fieldOptions.rules));


    
    const child = (
      <FormItem
        hasFeedback={fieldOptions.rules ? true : false}
        className={`ant-col-md-24 ant-col-sm-24 ant-col-xs-24`}
        label={inputType.noLabel && noLabel ? null : label.toUpperCase()}
        {...colLayoutFormItem}
        {...formItemProps}
        // validateStatus={hasError ? validateStatus : ""}
        // help={hasError ? error : ""}
        name={code}
        rules = {(fieldOptions.rules)}
        initialValues = {initValue}
         >
            {DynamicInput}
        {/* {
        getFieldDecorator(code, {
          ...fieldOptions,
          initialValue: initValue
        })(DynamicInputContainer)} */}
      </FormItem>
    );
    // const colLayout = isInline ? colHorizontalType : colVerticalType;
    return (
      // TODO: apply responsive span={12}
      // <Col className={`filter-input`} style={{marginRight: "6px"}}  {...colLayout} key={id} span={span} >
      <Col className={`filter-input-${key}`}  key={id}  xs={span.xs} sm={span.sm} md={span.md} lg={span.lg} xl={span.xl} >
        {child}
      </Col>
    );
  };

  renderInputs = (inputs = [], language) => {
    //console.log(">>>>>>>>>>>>>>>renderInputs: inputs"+JSON.stringify(inputs));
    //console.log(">>>>>>>>>>>>>>>renderInputs: language"+JSON.stringify(language));

    const result= inputs.map(input => this.renderField(input));
    //console.log(">>>>>>>>>>>>>>>renderInputs: result"+JSON.stringify(result));

    return result;
  };

  render() {
    //console.log(">>>>>>>>>>>>>>>this.props() =" + JSON.stringify(this.props));

    const {
      language,
      onCancel,
      inputs,
      hasSubmitButton,
      layoutType,
      submitting,
      cancelling,
      // form: { getFieldsError },
      labelAlign
    } = this.props;

    const formInputs = this.renderInputs(inputs, language);
    const isInline = layoutType === formLayoutTypes.inline,
      colLayout = isInline ? filterLayout : formLayout;
    if (!formInputs.length) return null;
    return (
        <>
        {/* <Form onSubmit={this.onSubmit}  */}
            <Form 
              labelAlign={labelAlign}  
              onFinish={this.props.onSubmit}
              onFinishFailed={this.onFinishFailed}>
          {isInline ? (
            <Row gutter={{ ...inputSpace }}>{formInputs}</Row>
          ) : (
            //formInputs
            <Row gutter={{ ...inputSpace }}>{formInputs}</Row>

          )}
          {(hasSubmitButton || onCancel) && (
            <Row className="ant-col-xs-24">
              <FormItem>
              <div className="dynamic-forms-buttons-wrapper">
                  {/* {onCancel && ( */}
                    <Button
                      className="cancel-button"
                      onClick={onCancel}
                      loading={cancelling}
                    >
                      Cancel
                    </Button>
                  {/* )} */}
                  
                  {hasSubmitButton && (
                    <Button
                      className="submit-button"
                      type="primary"
                      htmlType="submit"
                      // disabled={hasErrors(getFieldsError())}
                      loading={submitting}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </FormItem>
            </Row>
          )}
      </Form>
      </>
    );
  }
}

DynamicForm.defaultProps = {
  hasSubmitButton: true,
//TODO: switch from block to inline
  layoutType: formLayoutTypes.inline,
  errorOnFocus: true,
  getChangeWithEnterPress: false,
  multiSelect: false,
  submitting: false,
  cancelling: false,
  keyValueSelect: false,
  //TODO: change the properties label right to left
  labelAlign: labelAligns.left,
  httpMethod: httpMethods.OPTIONS
};

DynamicForm.propTypes = {
  getChangeWithEnterPress: PropTypes.bool,
  language: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      inputType: PropTypes.string.isRequired,
      initialValue: PropTypes.any,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      objectKey: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          label: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          value: PropTypes.string.isRequired
        })
      ),
      fieldOptions: PropTypes.object,
      fieldProps: PropTypes.object,
      formItemProps: PropTypes.object,
      url: PropTypes.string,
      valueKeyName: PropTypes.string,
      labelKeyName: PropTypes.string,
      multiSelect: PropTypes.bool,
      relatedTo: PropTypes.string,
      relatedKey: PropTypes.string
    })
  ).isRequired,
  hasSubmitButton: PropTypes.bool,
  keyValueSelect: PropTypes.bool,
  url: PropTypes.string,
  submitting: PropTypes.bool,
  cancelling: PropTypes.bool,
  httpMethod: PropTypes.string,
  labelAlign: PropTypes.oneOf([labelAligns.left, labelAligns.right]),
  objectKey: PropTypes.string
};

//TODO: remove it when convert ant v3 to ant v4
// export default function(name) {
//   return Form.create({ name })(DynamicForm);
// }


export default DynamicForm;