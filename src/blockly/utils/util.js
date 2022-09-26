export const parseValue = (number) => (number >= 0 ? '+=' + Math.abs(number) : '-=' + Math.abs(number));

export const parseDuration = (duration) => duration * 1000;

export const field_number = (name, value = 0, min = null, max = null) => ({ type: 'field_number', name, value, min, max });

export const input_value = (name, check) => ({ type: 'input_value', name, check});