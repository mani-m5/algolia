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
const { algoliasearch } = require("algoliasearch");
const { getProduct } = require("../../commerce-product-api-client");
//const { Core } = require("@adobe/aio-sdk");
const { getAlgoliaConfig } = require("../../../../lib/algolia-config");

/**
 * This function send the product updated dara to the external back-office application
 *
 * @param {object} params - include the env params
 * @param {object} data - Product data
 * @param {object} preProcessed - result of the pre-process logic if any
 * @returns the sending result if needed for post process
 */
async function sendData(params, data, preProcessed) {
  // @TODO Here add the logic to send the information to 3rd party
  // @TODO Use params to retrieve needed parameters from the environment
  // @TODO in case of error return { success: false, statusCode: <error status code>, message: '<error message>' }
/**
  const logger = Core.Logger("product-commerce-consumer", {
    level: params.LOG_LEVEL || "info",
  }); */

  // Replace with your actual credentials
  const algoliaConfig = await getAlgoliaConfig(params);

  //  logger.debug(algoliaConfig);
  //logger.debug("==============Algolia get 3333333333333333 ================");
  //logger.debug(JSON.stringify(algoliaConfig));

  if (algoliaConfig.enableExtension !== "1") {
    return {
      success: true,
    };
  }

  const client = algoliasearch(
    algoliaConfig.applicationId,
    algoliaConfig.applicationKey,
  );

  let result = null;
  try {
    result = await getProduct(params.COMMERCE_BASE_URL, params, data.sku);
  } catch (error) {
    console.log("error in retrieving the product details");
  }

  let description = "";

  result.custom_attributes.forEach((element) => {
    if (element.attribute_code == "description") {
      description = element.value;
    }
  });
/**
  logger.debug(
    "=========Products ===================== " +
      JSON.stringify(result.custom_attributes),
  ); */

  const record = {
    sku: data.sku,
    name: data.name,
    url_key: data.url_key,
    description,
  };
/**
  logger.debug(
    "=========record ===================== " + JSON.stringify(record),
  ); */

  // Call the API
  const response = await client.addOrUpdateObject({
    indexName: algoliaConfig.indexName,
    objectID: data.sku,
    body: record,
  });

  return {
    success: true,
  };
}

module.exports = {
  sendData,
};