exports.validateItemInput = (name, url) => {
  const errors = {};
  let type = null;

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  const urlPattern = /^https?:\/\/.+/;
  if (!url || !urlPattern.test(url)) {
    errors.url = 'Valid URL is required';
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    type = 'youtube';
  } else {
    type = 'link';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    type
  };
};
