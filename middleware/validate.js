export const validate = (schema) => (req, res, next) => {
  try {
    //parse to check if valid or not
    schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};
