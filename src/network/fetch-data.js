import HttpClient from './http-client';

export default class fetchData {
  constructor() {
    this.httpClient = new HttpClient()
  }

  async getGeneric(path) {
    let result
    try {
      result = await this.httpClient.send('', { path })
      result = JSON.parse(result)
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

  async getAllRecords() {
    return await this.getGeneric( '/api/getAllRecords' )
  }

  async getRecordsByType(type) {
    return await this.getGeneric( '/api/getRecordsByType/' + type )
  }

  async templateListGet() {
    return await this.getGeneric( '/api/templates/list' )
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

  async getRecordData(recordId) {
    return await this.getGeneric( '/api/getRecord/' + recordId )
  }

  async setRecordData(recordId, data) {
    let result
    let body = JSON.stringify(data)
    try {
      result = await this.httpClient.send(
        body,
        {
          method: 'POST',
          path: '/api/setRecord/' + recordId,
          headers: {'content-type': 'application/json'},
        })
      result = JSON.parse(result)
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

}
