module.exports = async function(req, res, proceed) {

  // if valid user
  if (req.user) {
    return proceed();
  }

  return res.forbidden();
};
