const Schemes = require('./scheme-model')

const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params
  Schemes.findById(scheme_id)
  .then((scheme) => {
      if(scheme.length === 0)
        res.status(404).json({message:`scheme with scheme_id ${scheme_id} not found`})
      else
      next()
  })
  .catch((err) => {
    next(err)
  })
}
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name || req.body.scheme_name === '' || typeof req.body.scheme_name != 'string')
    res.status(400).json({message:'invalid scheme_name'})
  else
  next()
}
const validateStep = (req, res, next) => {
  if(!req.body.instructions || req.body.instructions === '' || typeof req.body.instructions != 'string' ||
    typeof req.body.step_number != 'number' || req.body.step_number < 0)
    res.status(400).json({message:'invalid step'})
  else
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
