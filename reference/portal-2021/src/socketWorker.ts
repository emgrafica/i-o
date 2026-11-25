// @ts-nocheck
import { env, awsChat } from 'utils/env';
import uuid from 'react-uuid';
const axios = require('axios');

export default class ChatService {
  constructor(userEmail) {
    this._userEmail = userEmail;
    this._webSocketUrl = '';
    this._connectionToken = '';
    this._participantToken = '';
    this._contactId = '';
  }

  getHeader(token) {
    return {
      'Content-Type': 'application/json',
      'X-Amz-Bearer': token,
    };
  }

  async initChat(messsage: any, isMustInit = true) {
    let result = {};
    result = localStorage.getItem(awsChat.localStorageKey);
    if (result) {
      result = JSON.parse(result);
      this._participantToken = result.participantToken;
      this._contactId = result.contactId;
    }
    if (result || isMustInit) {
      result = await this.initChatContactConnector(messsage, !!result);
      localStorage.setItem(
        awsChat.localStorageKey,
        JSON.stringify({
          ...result,
          participantToken: this._participantToken,
          contactId: this._contactId,
        }),
      );
    }
    if (result) {
      this._webSocketUrl = result.Websocket.Url;
      this._connectionToken = result.ConnectionCredentials.ConnectionToken;
    }
    return result;
  }

  clearInfo() {
    localStorage.setItem(awsChat.localStorageKey, '');
    this._webSocketUrl = '';
    this._connectionToken = '';
  }

  async initChatContactConnector(
    messsage: any,
    isJustRecallParticipant = false,
  ) {
    if (!isJustRecallParticipant) {
      var body = {
        ParticipantDetails: {
          DisplayName: this._userEmail || '',
        },
        InitialMessage: {
          Content: messsage,
          ContentType: 'text/plain',
        },
        ContactFlowId: env(awsChat.awsContactFlowId),
        InstanceId: env(awsChat.awsInstanceId),
      };
      const startChatResult = await axios
        .post(env(awsChat.awsStartChatURL), body)
        .then(function(response: any) {
          return response.data.data.startChatResult;
        })
        .catch(function(error: any) {
          console.error('Error fetching  : ', error);
        });
      this._participantToken = startChatResult.ParticipantToken;
      this._contactId = startChatResult.ContactId;
    }
    var data = {
      ParticipantToken: this._participantToken,
    };

    var bodyParticipant = {
      Type: ['WEBSOCKET', 'CONNECTION_CREDENTIALS'],
    };
    const me = this;
    const participantResult = await axios
      .post(`${env(awsChat.awsParticipantURL)}connection`, bodyParticipant, {
        headers: this.getHeader(data.ParticipantToken),
        json: true,
      })
      .then(function(response: any) {
        return response.data;
      })
      .catch(function(error: any) {
        console.error('Error fetching  : ', error);
        return me.initChatContactConnector(messsage, false);
      });
    return participantResult;
  }

  async sendMessage(message) {
    var body = {
      Content: message || '',
      ContentType: 'text/plain',
    };
    let _res = {};
    try {
      let options = {
        method: 'POST',
        url: `${env(awsChat.awsParticipantURL)}message`,
        headers: this.getHeader(this._connectionToken),
        transformRequest: [
          function(data, headers) {
            try {
              return JSON.stringify(data);
            } catch (e) {
              return data;
            }
          },
        ],
        transformResponse: axios.defaults.transformResponse.concat(data => {
          if (data.data) return data.data;
          else return data;
        }),
        data: body,
      };
      _res = await axios(options);
    } catch (error) {
      console.log(
        `------ WARNING ERROR --> Have some error when Send Message to AWS service: ${JSON.stringify(
          error,
        )}`,
      );
      _res = JSON.stringify(error);
    }
    return _res;
  }

  async getTranscript() {
    var body = {
      ContactId: this._contactId,
      SortOrder: 'ASCENDING',
    };
    let _res = {};
    try {
      let options = {
        method: 'POST',
        url: `${env(awsChat.awsParticipantURL)}transcript`,
        headers: this.getHeader(this._connectionToken),
        transformRequest: [
          function(data, headers) {
            try {
              return JSON.stringify(data);
            } catch (e) {
              return data;
            }
          },
        ],
        transformResponse: axios.defaults.transformResponse.concat(data => {
          if (data.data) return data.data;
          else return data;
        }),
        data: body,
      };
      _res = await axios(options);
    } catch (error) {
      console.log(
        `------ WARNING ERROR --> Have some error when Send Message to AWS service: ${JSON.stringify(
          error,
        )}`,
      );
      _res = JSON.stringify(error);
    }
    return _res;
  }

  async disconnectParticipant() {
    var body = {
      ClientToken: uuid(),
    };
    let _res = {};
    try {
      let options = {
        method: 'POST',
        url: `${env(awsChat.awsParticipantURL)}disconnect`,
        headers: this.getHeader(this._connectionToken),
        transformRequest: [
          function(data, headers) {
            try {
              return JSON.stringify(data);
            } catch (e) {
              return data;
            }
          },
        ],
        transformResponse: axios.defaults.transformResponse.concat(data => {
          if (data.data) return data.data;
          else return data;
        }),
        data: body,
      };
      _res = await axios(options);
    } catch (error) {
      console.log(
        `------ WARNING ERROR --> Have some error when Send Message to AWS service: ${JSON.stringify(
          error,
        )}`,
      );
      _res = JSON.stringify(error);
    }
    return _res;
  }
}
