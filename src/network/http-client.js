import axios from 'axios'

export default class HttpClient {
  constructor(config={}) {
    this.config = config;

    this.host = (typeof location != "undefined") ? location.hostname : ''
    this.port = (typeof location != "undefined") ? location.port : 0
    this.location = "http://"+this.host+":"+this.port

    axios.defaults.baseURL = this.location;

  }

  send(messageBody='', options={}) {
    return new Promise(
      (resolve, reject) => {

        axios(options)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    );
  }
}
