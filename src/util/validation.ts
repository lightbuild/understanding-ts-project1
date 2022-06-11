//Validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validataInput: Validatable) {
  let isValid = true;
  if (validataInput.required) {
    isValid = isValid && validataInput.value.toString().trim().length !== 0;
  }
  if (validataInput.minLength != null && typeof validataInput.value === 'string') {
    isValid =
      isValid && validataInput.value.length > validataInput.minLength;
  }
  if (validataInput.maxLength != null && typeof validataInput.value === 'string') {
    isValid =
      isValid && validataInput.value.length < validataInput.maxLength;
  }
  if (validataInput.min != null && typeof validataInput.value === 'number') {
    isValid = isValid && validataInput.value > validataInput.min;
  }
  if (validataInput.max != null && typeof validataInput.value === 'number') {
    isValid = isValid && validataInput.value < validataInput.max;
  }
  return isValid;
}