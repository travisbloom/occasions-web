import {isString} from 'lodash';

export const formatLocation = location => {
  const state =
    location.state && !isString(location.state)
      ? location.state.label
      : location.state;
  const streetAddressLine2 = location.streetAddressLine2
    ? ` ${location.streetAddressLine2}`
    : '';
  const localityInfo = `${location.city} ${state} ${location.postalCode}`;
  return `${location.streetAddressLine1}${streetAddressLine2}, ${localityInfo}`;
};
