function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const validProperties = new Set([
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people",
    ]);
  
    const invalidProperties = Object.keys(data).filter(
      (property) => !validProperties.has(property)
    );
  
    if (invalidProperties.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidProperties.join(", ")}`,
      });
    }
  
    next();
  }
  
  module.exports = hasOnlyValidProperties;