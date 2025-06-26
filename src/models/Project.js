import { Account } from "./Account.js"


export class Project {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.projectImgs = data.projectImgs
    // creator info
    // /** @type {Account} */
    this.creator = new Account(data.creator)
  }
}