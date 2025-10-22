// accsClient.js
const axios = require('axios');
const TokenManager = require('./tokenManager');

class ACCSApiClient {
  constructor() {
    this.baseURL = process.env.API_ENDPOINT;
    this.tokenManager = new TokenManager();
  }

  async request(method, endpoint, data = null) {
    const accessToken = await this.tokenManager.getValidToken();
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'x-api-key': process.env.OAUTH_CLIENT_ID,
      'x-gw-ims-org-id': process.env.OAUTH_ORG_ID,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        headers,
        data,
        validateStatus: status => status < 500
      });

      if (response.status === 429) {
        // Handle rate limiting
        const retryAfter = response.headers['retry-after'] || 5;
        await this.sleep(retryAfter * 1000);
        return this.request(method, endpoint, data);
      }

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.status === 401) {
      this.tokenManager.token = null;
    }
    throw error;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = ACCSApiClient;
