import HttpClient from './http-client';
import { URL_BASE } from '../links'


const urlBase = URL_BASE + 'api/'

export default class fetchData {
  constructor() {
    this.httpClient = new HttpClient()
  }

  async getGeneric(path) {
    let result

    try {
      result = await this.httpClient.send('', { url : path })
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

  async getAllRecords() {
    return await this.getGeneric( urlBase + 'getAllRecords' )
  }

  async getRecordsByType(type) {
    return await this.getGeneric( urlBase + 'getRecordsByType/' + type )
  }

  async templateListGet() {
    return await this.getGeneric( urlBase + 'templates/list' )
  }

  async createRecord(data) {
    let newRecordId
    let body = JSON.stringify(data)

    try {
      newRecordId = await this.httpClient.send(
        body,
        {
          method: 'PUT',
          url: urlBase + 'record/create',
          headers: {'content-type': 'application/json'},
          data: body
        })
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return newRecordId
  }

  async updateParagraph(template, subtemplate, paragraph) {
    let result
    let body = paragraph

    try {
      result = await this.httpClient.send(
        body,
        {
          method: 'POST',
          url: urlBase + 'category/paragraphUpdate/' + template + "/" + subtemplate,
          headers: {'content-type': 'application/json'},
          data: body
        })
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

  async getParagraph(template,subtemplate) {
    return await this.getGeneric( urlBase + 'category/getParagraph/' + template + "/" + subtemplate )
  }

  async getRecordData(recordId) {
    return await this.getGeneric( urlBase + 'getRecord/' + recordId )
  }

  async setRecordData(recordId, data) {
    let result
    let body = data
    try {
      result = await this.httpClient.send(
        body,
        {
          method: 'POST',
          url: urlBase + 'setRecord/' + recordId,
          headers: {'content-type': 'application/json'},
          data: body,
        })
    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

  async deleteRecord(recordId) {
    let result

    try {
      result = await this.httpClient.send(
        'Delete Record',
        {
          method: 'POST',
          url: urlBase + 'deleteRecord/' + recordId,
        })

    } catch(error) {
      console.error('fetching template list error > ' + error)
    }

    return result
  }

}
