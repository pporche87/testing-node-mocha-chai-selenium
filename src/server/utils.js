const renderError = function(error, response){
  response.status(422).send(`ERROR: ${error.message}\n\n${error.stack}`)
}

module.exports = {renderError}
