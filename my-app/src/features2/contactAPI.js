// A mock function to mimic making an async request for data
import api from "../services/api";

export function fetchContacts() {
 return api.get('/contacts');
}

export function postContacts(contact) {
  return api.post("/contacts", contact);
}
