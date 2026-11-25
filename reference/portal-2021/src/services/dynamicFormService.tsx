// @ts-nocheck

export default class DynamicFormService {
  constructor(dynamicFormData: any, dynamicData: any, startStep: string) {
    let dataConbine: any = {};
    this._startStep = startStep;
    Object.keys(dynamicFormData).map(key => {
      let stepItem = dynamicFormData[key];
      stepItem.items = stepItem.items.map((item: any) => {
        const dataItem = dynamicData.find(
          (itemD: any) => itemD.key === item.key,
        );
        if (!item.componentData) {
          item.componentData = {};
        }
        if (!!dataItem) {
          item.componentData.data = dataItem.data;
        }
        return item;
      });
      dataConbine[key] = stepItem;
    });

    this._formData = dataConbine;
    this.updateChildStep();
  }

  updateChildStep = () => {
    let steps = [];
    const createChildStep = step => {
      const stepData = this._formData[step];
      if (stepData.nextStep) {
        if (typeof stepData.nextStep === 'string') {
          steps.push({
            stepKey: stepData.stepKey,
            nextStep: stepData.nextStep,
            title: stepData.stepTitle || stepData.title,
          });
          createChildStep(stepData.nextStep);
        } else {
          let nextStep = null;
          stepData.nextStep.forEach(e => {
            const dependControl = this.getControlByKey(e.dependOn);
            if (dependControl.componentData.value === e.value) {
              nextStep = e.nextStep;
            }
          });
          steps.push({
            stepKey: stepData.stepKey,
            ...(nextStep ? { nextStep } : {}),
            title: stepData.stepTitle || stepData.title,
          });
          if (nextStep) {
            createChildStep(nextStep);
          }
        }
      } else {
        steps.push({
          stepKey: stepData.stepKey,
          title: stepData.stepTitle || stepData.title,
        });
      }
    };
    createChildStep(this._startStep);

    this._steps = steps;
  };

  getFormDataByStep = (step = '') => {
    if (step) {
      let stepData = this._formData[step];
      stepData.items = stepData.items.map((item: any) => {
        if (item.referenceDataKey) {
          const refControl = this.getControlByKey(item.referenceDataKey);
          if (refControl.componentData.data) {
            item.componentData.data = { ...refControl.componentData.data };
          }
          if (
            refControl.componentData.value &&
            (!item.componentData.value || item.componentData.isDataCopied)
          ) {
            item.componentData.value = refControl.componentData.value;
            item.componentData.isDataCopied = true;
            item = { ...item };
          }
        }
        if (item.impactFrom) {
          item.impactFrom.forEach(e => {
            const impactFromControl = this.getControlByKey(e.fromControl);
            let isMatch = false;
            isMatch =
              e.conditionValue && typeof e.conditionValue === 'string'
                ? impactFromControl.componentData.value === e.conditionValue
                : e.conditionValue.indexOf(
                    impactFromControl.componentData.value,
                  ) != -1;
            item[e.fieldImpact] = isMatch ? e.matchedValue : e.unmatchedValue;
          });
        }
        return item;
      });
    }
    return !step ? this._formData : this._formData[step];
  };

  getControlByKey = key => {
    let control = null;
    Object.keys(this._formData).forEach(fieldKey => {
      let step = null;
      step = this._formData[fieldKey].items.find(
        (item: any) => item.key == key,
      );
      if (step) {
        control = step;
      }
    });
    return control;
  };

  getSteps = () => {
    return this._steps;
  };

  updateItemValueByKey = (key, value, keyField = 'value') => {
    const formData = { ...this._formData };
    Object.keys(formData).map(fieldKey => {
      let step = formData[fieldKey];
      step.items = step.items.map((item: any) => {
        if (item.key == key) {
          item.componentData[keyField] = value;
          item.componentData.isDataCopied = false;
        }
        return item;
      });
      formData[fieldKey] = step;
    });
    this._formData = formData;
  };
}
