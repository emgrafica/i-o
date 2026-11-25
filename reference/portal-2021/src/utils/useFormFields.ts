import { useReducer, useCallback, useRef, useState } from 'react';

/**
 * Dispatch value for the `setField` function
 */
interface DispatchValue<S> {
  /* Field to change value for */
  field: S;
  /* Value to set the field to */
  value: any;
}

/**
 * Form field being returned in the state object
 */
export type FormField = {
  /* Whether the form field is valid or not */
  readonly isValid: boolean;
  /* Whether this form field is valid or not (will run an `isRequired` validation if it's set to true */
  readonly required: boolean;
  /* Sets the value of this field */
  readonly set: (value: any) => void;
  /* Value for form field */
  readonly value: any;
  /* Whether this form field has been acted upon or not */
  readonly dirty: boolean;
  /* Errors from validations */
  readonly validationResults: Record<string, boolean>;
};

/**
 * Form field with 'set', 'validationResults' and 'isValid' stripped out
 */
type LiteFormField = Omit<FormField, 'set' | 'validationResults' | 'isValid'>;

/**
 * Type for Validation functions for form fields
 */
interface Validation<T> {
  /* Validation function to run on form field; access to `getField` which grabs a field from the form */
  (value: any, getField: (fieldName: T) => LiteFormField): boolean;
}

/**
 * Form field meant to be passed to the useFormField hook to initialize state
 * and the validation map
 */
interface FormFieldInitializer<T> {
  /* Whether the form field is valid or not */
  valid?: boolean;
  /* Validations to run on the form field whenever a new value is dispatched to it */
  validations?: Record<string, Validation<T>>;
  /* The default value to be set in state for this particular form field */
  defaultValue: any;
  /* Whether this form field is valid or not (will run an `isRequired` validation if it's set to true */
  required?: boolean;
}

/**
 * Helper function for initializing form fields. Defaults any properties that were not given a value
 *
 * @export
 * @param {FormFieldInitializer} {
 *   valid = true,
 *   validations = {},
 *   defaultValue = '',
 *   required = false,
 * }
 * @returns
 */
export function formField<T>({
  valid = true,
  validations = {},
  defaultValue = '',
  required = false,
}: FormFieldInitializer<T>) {
  return {
    valid,
    validations,
    defaultValue,
    required,
  };
}

/**
 * Validation function to run on required fields
 *
 * @param value Value to validate on
 */
const isRequiredValidation: Validation<never> = value => {
  if (typeof value === 'string' || value instanceof Array) {
    return !!value.length;
  } else if (value === undefined || value === null) {
    return false;
  }
  return true;
};

/**
 * Runs all given validations for a given set of validations and a value
 * it returns with the validationResults and if the given value is valid
 *
 * @template T
 * @param {Record<string, Validation<T>>} validations Validations to run on the value
 * @param {*} value Value to validate on
 * @param {(field: T) => LiteFormField} getField Utility function to be passed down to the
 * validation
 * @returns { isValid: boolean, validationResults: Record<string, boolean> }
 */
const runValidations = <T>(
  validations: Record<string, Validation<T>>,
  value: any,
  getField: (field: T) => LiteFormField,
) => {
  let validationResults: Record<string, boolean> = {};
  let isValid = true;

  Object.entries(validations).forEach(([validationId, validation]) => {
    const validationResult = validation(value, getField);
    if (!validationResult) {
      isValid = validationResult;
    }
    validationResults = {
      ...validationResults,
      [validationId]: validationResult,
    };
  });
  return { isValid, validationResults };
};

/**
 * Type guard
 *
 * @template T
 * @param {(FormFieldInitializer<T> | FormField)} field Field to run the type guard
 * @returns {field is FormFieldInitializer<T>}
 */
function isInitialFormField<T>(
  field: FormFieldInitializer<T> | FormField,
): field is FormFieldInitializer<T> {
  return (field as FormFieldInitializer<T>).defaultValue !== undefined;
}

/**
 * Type guard
 *
 * @template T
 * @param {(FormFieldInitializer<T> | FormField)} field Field to run the type guard
 * @returns {field is FormField}
 */
function isFormField<T>(
  field: FormFieldInitializer<T> | FormField,
): field is FormField {
  return (field as FormField).value !== undefined;
}

/**
 *
 * Hook to manage form field state returns an object containing
 * `isValid`: Lets you know whether the entire form is valid or not based on the validations passed to the form fields
 * `formData`: Gives you access to form state and validations
 * `setField`: Allows you to set a form field
 *
 * @export
 * @template S
 * @template T
 * @param {Record<T, FormFieldInitializer>} initialState Takes an object of form fields to initialize state
 * @param {boolean} alwaysRunValidations Tells the hook to run all validations whenever a field changes
 * @returns {{
 *   isValid: boolean;
 *   formData: Record<T, FormField>;
 *   setField: ({ field, value }: DispatchValue<T>) => void;
 * }}
 */
export function useFormFields<S, T extends keyof S>(
  initialState: Record<T, FormFieldInitializer<T>>,
  {
    alwaysRunValidations = false,
  }: {
    alwaysRunValidations?: boolean;
  } = {},
): {
  isValid: boolean;
  formData: Record<T, FormField>;
  setField: ({ field, value }: DispatchValue<T>) => void;
} {
  const formValidationMap = useRef<Record<T, boolean> | {}>({});
  const dispatch = useRef<(value: any) => void | undefined>();

  /**
   * Returns a function that will retrieve the specified form field based on the
   * given state object to look through
   */
  const buildFieldGetter = useCallback(
    (state: Record<T, FormFieldInitializer<T> | FormField>) => (
      fieldName: T,
    ): LiteFormField => {
      const field = state[fieldName];
      if (isFormField(field)) {
        return {
          required: field.required,
          value: field.value,
          dirty: field.dirty,
        };
      } else if (isInitialFormField(field)) {
        return {
          required: !!field.required,
          value: field.defaultValue,
          dirty: false,
        };
      } else {
        throw Error('Cannot grab field');
      }
    },
    [],
  );

  type FormReducerState = Record<T, FormField>;
  type FormValidationMap = Record<
    T,
    {
      validations: Record<string, Validation<T>>;
      required: boolean;
    }
  >;

  /* Initialize form state and validation map */
  const [[reducerState, validationMap]] = useState(
    () =>
      Object.keys(initialState).reduce<
        [FormReducerState | {}, FormValidationMap | {}]
      >(
        ([prevState, prevMap], cur) => {
          /**
           * Object.keys does not infer type based on object so cur is string and must
           * be set as T
           */
          const currentField = formField(initialState[cur as T]);

          /**
           * Initialize field validation map
           */
          const validationMapping = {
            [cur]: {
              validations: currentField.required
                ? { isRequiredValidation, ...currentField.validations }
                : { ...currentField.validations },
              required: currentField.required,
            },
          };

          const { isValid, validationResults } = runValidations<T>(
            validationMapping[cur].validations,
            currentField.defaultValue,
            buildFieldGetter(initialState),
          );

          /**
           * Initialize field state
           */
          const state = {
            [cur]: {
              value: currentField.defaultValue,
              required: currentField.required,
              dirty: false,
              set: (value: any) => {
                dispatch.current && dispatch.current({ field: cur, value });
              },
              validationResults,
              isValid,
            },
          };

          /**
           * Initializing isFormValid map
           */
          formValidationMap.current = {
            ...formValidationMap.current,
            [cur]: isValid,
          };
          return [
            { ...prevState, ...state },
            { ...prevMap, ...validationMapping },
          ];
        },
        [{}, {}],
      ) as [FormReducerState, FormValidationMap],
  );

  const reducer = (
    state: Record<T, FormField>,
    action: { type: T; payload: any },
  ) => {
    let reducedState: Record<T, FormField>;

    const { isValid, validationResults } = runValidations(
      validationMap[action.type].validations,
      action.payload,
      buildFieldGetter(state),
    );

    formValidationMap.current = {
      ...formValidationMap.current,
      [action.type]: isValid,
    };

    const newState = {
      [action.type]: {
        value: action.payload,
        required: validationMap[action.type].required,
        set: state[action.type].set,
        dirty: true,
        isValid,
        validationResults,
      },
    };

    reducedState = {
      ...state,
      ...newState,
    };

    if (alwaysRunValidations) {
      /**
       * If alwaysRunValidations is set to true then all validations for all form fields are ran
       * TODO: Refactor so that the validations aren't ran twice for the same field
       */

      reducedState = Object.keys(reducedState).reduce<FormReducerState>(
        (prevState, cur) => {
          /**
           * Object.keys does not infer type based on object so cur is string and must
           * be set as T
           */
          const currentFieldName = cur as T;
          const currentField = reducedState[currentFieldName];

          const { isValid, validationResults } = runValidations(
            validationMap[currentFieldName].validations,
            currentField.value,
            buildFieldGetter(reducedState),
          );

          formValidationMap.current = {
            ...formValidationMap.current,
            [currentFieldName]: isValid,
          };

          const newState = {
            [currentFieldName]: {
              value: currentField.value,
              dirty: currentField.dirty,
              required: validationMap[currentFieldName].required,
              set: reducedState[currentFieldName].set,
              isValid,
              validationResults,
            },
          };

          return {
            ...prevState,
            ...newState,
          };
        },
        state,
      );
    }
    return reducedState;
  };

  const [state, stateDispatch] = useReducer(reducer, reducerState);

  dispatch.current = useCallback((payload: { field: T; value: any }) => {
    return stateDispatch({ type: payload.field, payload: payload.value });
  }, []);

  return {
    isValid: !Object.values(formValidationMap.current).includes(false),
    formData: state,
    setField: dispatch.current,
  };
}
