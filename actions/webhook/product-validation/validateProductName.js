const { Core, Events } = require('@adobe/aio-sdk') // Adobe I/O SDK modules
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('./utils') // Utility functions


// Main function executed by Adobe I/O Runtime
async function main(params) {
 // Create a logger instance
 const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 logger.info('++++++++++++++++++++++++Calling the checkProduct Name validation main action+++++++++++++++++++++++++++++++++ ')
 
 try {
   const response = { statusCode: 200 }
   
   // Check if product name contains 'error'; return error response if true
   if (/error/.test(params.product.name.toLowerCase())) {
   response.body = JSON.stringify({
     op: "exception",
     message: "Invalid product name >> " + params.product.name
   })
 } else {
   // Success response
   response.body = JSON.stringify({
     op: "success"
   })
 }
 
 return response
 } catch (error) {
   // Log error and return a 500 server error response
   logger.error(error)
   return errorResponse(500, 'server error ' + JSON.stringify(params), logger)
   }
 }

 exports.main = main
