exports.validateItemInput = (name, url) => {
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  // Basic URL pattern: starts with http:// or https://
  const urlPattern = /^https?:\/\/[\w.-]+\.[a-z]{2,}(\/\S*)?$/i;
  if (!url || !urlPattern.test(url)) {
    errors.url = 'Valid URL is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
