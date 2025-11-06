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
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

/**
 * This action is on charge of sending updated product information in Adobe commerce to external back-office application
 *
 * @returns response object with status code, request data received and response of the invoked action
 * @param {object} params - includes the env params, type and the data of the event
 */
async function main(params) {

  console.log('My first email sending');
  const logger = Core.Logger("sendEmail", {
    level: params.LOG_LEVEL || "info",
  });

  logger.info("Start email sending");

  // Send email
  sgMail.setApiKey(params.SENDGRID_API_KEY);
  //sgMail.setDataResidency('eu'); 
  // uncomment the above line if you are sending mail using a regional EU subuser

  const templatePath = path.resolve(__dirname, 'welcome.html');
      console.log('templatePath === ', templatePath);

  let htmlContent = fs.readFileSync(templatePath, 'utf8');
/**
  // Replace placeholders
  htmlContent = htmlContent.replace('{{name}}', params.name || 'User');

  const msg = {
    to: 'mani.stelli@gmail.com', // Change to your recipient
    from: 'mani.stelli65@yopmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid from the Adobe App Builder',
    html: htmlContent,
  }

  let res = '';

  try {
    const response = await sgMail.send(msg); // Waits for the email to be sent
    console.log('Email sent:', response[0].statusCode);
    res = 'Status code' + response[0].statusCode;
  } catch (error) {
    console.error('Error sending email:', error.response?.body || error);
  }
 */
  return {
    statusCode: 200,
    body: res
  };
}

exports.main = main;
