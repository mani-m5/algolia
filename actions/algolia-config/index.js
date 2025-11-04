const { Core } = require("@adobe/aio-sdk");
const { errorResponse, successResponse } = require("../algolia-utils");
const {
  getAlgoliaConfig,
  setAlgoliaConfig,
} = require("../../lib/algolia-config");

/**
 * Private action to retrieve or save Stripe settings.
 * @param {*} params
 * @returns
 */
async function main(params) {
  const logger = Core.Logger("algolia-config", {
    level: Number(params.debug) ? "debug" : "info",
  });

  if (params.__ow_method === "post") {
    // Handle regular config updates
    return handleConfigUpdate(params, logger);
  }
  if (params.__ow_method === "get") {
    return handleGetConfig(params, logger);
  }
  return errorResponse(405, "Method Not Allowed", logger);
}

/**
 * Handle regular config updates
 */
async function handleConfigUpdate(params, logger) {
  try {
    const { enableExtension, applicationId, applicationKey, indexName } =
      params;

    // Store the configuration using our lib function
    const configToStore = {
      enableExtension,
      applicationId,
      applicationKey,
      indexName,
    };
    await setAlgoliaConfig(configToStore, params);

    // Simple success check without accessing potentially problematic properties
    return successResponse(
      {
        message: "Algolia config updated successfully",
      },
      200,
      logger,
    );
  } catch (error) {
    logger.error("Error updating algolia config:", error.message, error.stack);
    return errorResponse(
      500,
      "Failed to update algolia config: " + error.message,
      logger,
    );
  }
}

/**
 * Handle GET requests to retrieve configuration
 */
async function handleGetConfig(params, logger) {
  const loadedConfig = await getAlgoliaConfig(params);

  const responseBody = {
    success: true,
    message: "Loaded Algolia config",
    config: loadedConfig,
  };

  return successResponse(responseBody);
}

exports.main = main;
