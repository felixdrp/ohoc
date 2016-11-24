import HttpClient from './http-client';

export default class fetchData {
  constructor() {
    this.httpClient = new HttpClient()
  }

  async templateListGet() {
    let templateList
    try {
      templateList = await this.httpClient.send('', { path: '/api/templates/list' })
      templateList = JSON.parse(templateList)
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return templateList
  }

  async createRecord(data) {
    let newRecordId
    let body = JSON.stringify(data)
    try {
      newRecordId = await this.httpClient.send(
        body,
        {
          method: 'PUT',
          path: '/api/record/create',
          headers: {'content-type': 'application/json'},
        })
      newRecordId = JSON.parse(newRecordId)
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return newRecordId
  }

}
