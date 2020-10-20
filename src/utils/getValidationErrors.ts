import { ValidationError } from 'yup';

interface ErrorBag {
  [key: string]: string;
}

export default (err: ValidationError): ErrorBag => {
  const validationErrors: ErrorBag = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
};
