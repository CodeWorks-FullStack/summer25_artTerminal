import { Profile } from "./Profile.js"


//NOTE While not necessary, this allows us to have a class with a little more detail than just the profile.
// in this case we are hiding the email, but it could be used to hide other information we don't care about
// note this only hides it from the app, though, any information that comes back from the server is still available
export class Account extends Profile {

  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
