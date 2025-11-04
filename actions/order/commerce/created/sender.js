/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// Include library
const { libDB } = require('@adobe/aio-lib-db');
const { Core } = require("@adobe/aio-sdk");

/**
 * This function send the order created data to the external back-office application
 *
 * @param {object} params - include the env params
 * @param {object} data - order data
 * @param {object} preProcessed - result of the pre-process logic if any
 * @returns the sending result if needed for post process
 */
async function sendData(params, data, preProcessed) {
  // @TODO Here add the logic to send the information to 3rd party
  // @TODO Use params to retrieve need parameters from the environment
  // @TODO in case of error return { success: false, statusCode: <error status code>, message: '<error message>' }

  const logger = Core.Logger("product-commerce-consumer", {
    level: params.LOG_LEVEL || "info",
  });

   // Basic CRUD (small sample of APIs)
  try {
    // Initialize and connect
    const db = await libDB.init({ region: 'amer' });
    const clientDB = await db.connect();

    // Get a collection
    const users = clientDB.collection('products');

    // Insert a document
    await users.insertOne({ sku: data.sku, name: data.name, url_key:data.url_key, description: description  });

    // Find documents
    const cursor = users.findOne({ sku: data.sku });
    logger.debug(cursor);
  }
  finally {
    // Close any open cursors when the application is done
    await clientDB.close();
  }

  return {
    success: true,
  };
}

module.exports = {
  sendData,
};
