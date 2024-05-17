// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotEmpty = (value: any) => {
  if (value == null) {
    console.log('Null Data');
    return false;
  }

  if (value == undefined) {
    console.log('undefined Data');
    return false;
  }

  if (typeof value === 'number' && isNaN(value)) {
    console.log('NaN Data');
    return false;
  }

  if (typeof value === 'string' && value.trim() === '') {
    console.log('Empty String data');
    return false;
  }

  if (typeof value === 'string' && value.trim() === '') {
    console.log('Empty String data');
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    console.log('Empty Array data');
    return false;
  }

  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    console.log('Empty Object data');
    return false;
  }

  return true;
};
