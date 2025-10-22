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
//import algoliasearch from 'algoliasearch';

/**
 * This function send the product created dara to the external back-office application
 *
 * @param {object} params - include the env params
 * @param {object} data - Product data
 * @param {object} preProcessed - result of the pre-process logic if any
 * @returns the sending result if needed for post process
 */
async function sendData(params, data, preProcessed) {
  // @TODO Here add the logic to send the information to 3rd party
  // @TODO Use params to retrieve need parameters from the environment
  // @TODO in case of error return { success: false, statusCode: <error status code>, message: '<error message>' }
    console.log(`Sending data to Algolia.`);

  // Replace with your actual credentials
// const appID = 'BKZ22537V0';
// const apiKey = 'b7f31822623d758c1ef60d9bbc0a8e9d'; // Use an API key with write access
// const indexName = 'test_adobe_algolia';

// const client = algoliasearch(appID, apiKey);
// const index = client.initIndex(indexName);

// const records = [
//   {
//     objectID: '12345',
//     title: 'Algolia Indexing with Node.js',
//     category: 'Tutorials',
//     views: 500,
//   },
//   {
//     objectID: '67890',
//     title: 'Mastering Real-Time Search',
//     category: 'Search',
//     views: 1200,
//   },
//   // ... more records
// ];


// index.saveObjects(records)
//   .then(({ objectIDs, taskID }) => {
//     console.log(`Successfully indexed ${objectIDs.length} records.`);
//     console.log('Object IDs:', objectIDs);
//     // Optionally wait for the indexing task to complete
//     return client.waitTask({ indexName, taskID });
//   })
//   .catch(err => {
//     console.error('Error indexing records:', err);
//   });

  return {
    success: true,
  };
}

module.exports = {
  sendData,
};
