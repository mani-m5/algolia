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

const { Core } = require("@adobe/aio-sdk");

/**
 * This action is on charge of sending updated product information in Adobe commerce to external back-office application
 *
 * @returns response object with status code, request data received and response of the invoked action
 * @param {object} params - includes the env params, type and the data of the event
 */
async function main(params) {

  console.log('Get Devices');
  const logger = Core.Logger("getDevices", {
    level: params.LOG_LEVEL || "info",
  });

  logger.info("Fetch getDevices details");

  const data = [
    {
      "name": "device1",
      "color": "color1",
    },
     {
      "name": "device2",
      "color": "color2",
    }
  ];

  

  return {
    statusCode: 200,
    body: {"announcement": "Get 20% off on all products for a limited time. Use code: 20OFF"}
  };
}

exports.main = main;



