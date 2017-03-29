import { buildContactList, submitNewContact, form }  from './contactMan'

buildContactList();
form.addEventListener('submit', submitNewContact, false);

