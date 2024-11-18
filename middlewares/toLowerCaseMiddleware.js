const toLowerCaseDeep = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toLowerCaseDeep);
  } else if (obj && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = toLowerCaseDeep(obj[key]);
      return acc;
    }, {});
  } else if (typeof obj === "string") {
    return obj.toLocaleLowerCase();
  }
  return obj;
};

exports.stringtoLowerCase = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = toLowerCaseDeep(req.body);
  }
  next();
};
