import { renderHook, act } from '@testing-library/react-hooks';

import { useFormFields } from './useFormFields';

describe('useFormFields', () => {
  it('should return with the correct initialized state when nothing is required', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
        },
        lastName: {
          defaultValue: '',
          required: false,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
      lastName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
    });

    expect(result.current.isValid).toBe(true);
  });
  it('should return with the correct initialized state when fields are required', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: true,
        },
        lastName: {
          defaultValue: '',
          required: true,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: '',
        required: true,
        dirty: false,
        validationResults: { isRequiredValidation: false },
        isValid: false,
      },
      lastName: {
        value: '',
        required: true,
        dirty: false,
        validationResults: { isRequiredValidation: false },
        isValid: false,
      },
    });

    expect(result.current.isValid).toBe(false);
  });

  it('should return with a valid form when fields are defaulted with a value and set to true', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: 'alan',
          required: true,
        },
        lastName: {
          defaultValue: 'kopetman',
          required: true,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: 'alan',
        required: true,
        dirty: false,
        validationResults: { isRequiredValidation: true },
        isValid: true,
      },
      lastName: {
        value: 'kopetman',
        required: true,
        dirty: false,
        validationResults: { isRequiredValidation: true },
        isValid: true,
      },
    });

    expect(result.current.isValid).toBe(true);
  });
  it('should have the correct state when a field is set', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
    });

    act(() => {
      result.current.setField({ field: 'firstName', value: 'alan' });
    });

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: 'alan',
        required: false,
        // Note that 'dirty' has been updated to true
        dirty: true,
        validationResults: {},
        isValid: true,
      },
    });
  });
  it('should have the correct state when fields are set', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
        },
        lastName: {
          defaultValue: '',
          required: false,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
      lastName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
    });

    act(() => {
      result.current.setField({ field: 'firstName', value: 'alan' });
      result.current.setField({ field: 'lastName', value: 'kopetman' });
    });

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: 'alan',
        required: false,
        // Note that 'dirty' has been updated to true
        dirty: true,
        validationResults: {},
        isValid: true,
      },
      lastName: {
        value: 'kopetman',
        required: false,
        // Note that 'dirty' has been updated to true
        dirty: true,
        validationResults: {},
        isValid: true,
      },
    });
  });
  it('should run validation and set errors on fields when validation is run', () => {
    const mockValidation = jest.fn(val => !(val.length > 4));
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
          validations: { mustBeLessThan4: mockValidation },
        },
        lastName: {
          defaultValue: '',
          required: false,
          validations: { mustBeLessThan4: mockValidation },
        },
      }),
    );

    act(() => {
      result.current.setField({ field: 'firstName', value: '12345' });
      result.current.setField({ field: 'lastName', value: '12345' });
    });

    expect(mockValidation).toBeCalled();

    expect(result.current.formData.firstName.validationResults).toStrictEqual({
      mustBeLessThan4: false,
    });

    expect(result.current.formData.lastName.validationResults).toStrictEqual({
      mustBeLessThan4: false,
    });
  });
  it('should clear validation errors once validation criteria is met', () => {
    const mockValidation = jest.fn(val => !(val.length > 4));
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
          validations: { mustBeLessThan4: mockValidation },
        },
      }),
    );

    act(() => {
      result.current.setField({ field: 'firstName', value: '12345' });
    });

    expect(mockValidation).toBeCalled();

    expect(result.current.formData.firstName.validationResults).toStrictEqual({
      mustBeLessThan4: false,
    });

    act(() => {
      result.current.setField({ field: 'firstName', value: '123' });
    });

    expect(result.current.formData.firstName.validationResults).toStrictEqual({
      mustBeLessThan4: true,
    });
  });
  it("should allow you to set state with the specified form field's set function", () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
        },
      }),
    );

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: '',
        required: false,
        dirty: false,
        validationResults: {},
        isValid: true,
      },
    });

    act(() => {
      result.current.formData.firstName.set('alan');
    });

    expect(result.current.formData).toMatchObject({
      firstName: {
        value: 'alan',
        required: false,
        // Note that 'dirty' has been updated to true
        dirty: true,
        validationResults: {},
        isValid: true,
      },
    });
  });
  it('should validate fields based on other fields', () => {
    const { result } = renderHook(() =>
      useFormFields({
        firstName: {
          defaultValue: '',
          required: false,
          validations: {
            firstAndLastCannotMatch: (value, getField) => {
              if (value === getField('lastName').value) {
                return false;
              }
              return true;
            },
          },
        },
        lastName: {
          defaultValue: '',
          required: false,
          validations: {
            firstAndLastCannotMatch: (value, getField) => {
              if (value === getField('firstName').value) {
                return false;
              }
              return true;
            },
          },
        },
      }),
    );

    act(() => {
      result.current.setField({ field: 'firstName', value: 'alan' });
      result.current.setField({ field: 'lastName', value: 'alan' });
    });

    expect(result.current.formData.firstName.value).toBe('alan');
    expect(result.current.formData.lastName.value).toBe('alan');

    expect(result.current.formData.lastName.validationResults).toStrictEqual({
      firstAndLastCannotMatch: false,
    });
    expect(result.current.formData.firstName.validationResults).toStrictEqual({
      firstAndLastCannotMatch: true,
    });
  });
  it('should validate all fields when `alwaysRunValidations` is set to true', () => {
    const { result } = renderHook(() =>
      useFormFields(
        {
          firstName: {
            defaultValue: '',
            required: false,
            validations: {
              firstAndLastCannotMatch: (value, getField) => {
                if (value === getField('lastName').value) {
                  return false;
                }
                return true;
              },
            },
          },
          lastName: {
            defaultValue: '',
            required: false,
            validations: {
              firstAndLastCannotMatch: (value, getField) => {
                if (value === getField('firstName').value) {
                  return false;
                }
                return true;
              },
            },
          },
        },
        { alwaysRunValidations: true },
      ),
    );

    act(() => {
      result.current.setField({ field: 'firstName', value: 'alan' });
      result.current.setField({ field: 'lastName', value: 'alan' });
    });

    expect(result.current.formData.firstName.value).toBe('alan');
    expect(result.current.formData.lastName.value).toBe('alan');

    expect(result.current.formData.lastName.validationResults).toStrictEqual({
      firstAndLastCannotMatch: false,
    });

    expect(result.current.formData.firstName.validationResults).toStrictEqual({
      firstAndLastCannotMatch: false,
    });
  });
});
