import {
  createValidator,
  composeValidators,
  combineValidators,
  hasLengthGreaterThan,
} from 'revalidate';
import {upperFirst} from 'lodash';
import moment from 'moment';

const isRequired = createValidator(
  message => value => ([undefined, null, ''].includes(value) ? message : null),
  field => `${upperFirst(field)} is required`
);

const date = composeValidators(
  isRequired,
  createValidator(
    message => value => (moment(value).isValid() ? false : message),
    field => `this ${field} is not a valid date`
  )
);

const isNotEmptyArray = composeValidators(
  isRequired,
  createValidator(
    message => value => (value.length ? false : message),
    field => `You must select at least one ${field}`
  )
);

const email = composeValidators(
  isRequired,
  createValidator(
    message => value =>
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? message
        : false,
    field => `this ${field} is not a valid format`
  )
)('email');

const streetAddressLine1 = composeValidators(
  isRequired,
  hasLengthGreaterThan(3)
)('street address');

const postalCode = composeValidators(
  isRequired,
  createValidator(
    message => value =>
      !/^\d{5}(?:[-\s]\d{4})?$/i.test(value) ? message : false,
    field => `this ${field} is not a valid format`
  )
)('zip code');

const state = isRequired('state');

const city = isRequired('city');

const location = combineValidators({
  streetAddressLine1,
  postalCode,
  state,
  city,
});

export default {
  location,
  postalCode,
  streetAddressLine1,
  email,
  date,
  isNotEmptyArray,
  createValidator,
  composeValidators,
  combineValidators,
  hasLengthGreaterThan,
  isRequired,
};
