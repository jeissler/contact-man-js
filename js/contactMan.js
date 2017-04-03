import { _$, _$$, _$each } from './utils'
import { contacts } from './contacts'

const root = _$('#sidebar .list-group')
const form = _$('form')
const inputs = _$$('form input')

function buildContactList() {
    for (let contact of contacts) {
        updateContactList(contact)
    }
}

function updateContactList(contact) {
    // Insert list item(s)
    const listItem = `<li class="list-group-item" data-name="${contact.name}">
                        ${contact.name}<br>${contact.email}<br>${contact.phone}
                        <button class="btn btn-sm remove">remove</button>
                    </li>`
    root.insertAdjacentHTML('beforeend', listItem)
    
    // Add close btns if data and UI states match
    if (root.children.length === contacts.length) {
        const btns = _$$('#sidebar .remove')

        _$each(btns, (btn) => {
            btn.addEventListener('click', removeItem, false)
        })
    }
}

function submitNewContact(ev){
    ev.preventDefault()
    
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    
    // ie. this data would get posted back or saved to db in a real world app
    // and form data would need to be sanitized before use
    contacts.push({ 'name': name, 'email': email, 'phone': phone })

    const contact = contacts[contacts.length - 1]
    updateContactList(contact)
    clearFormInputs()

    console.log(contacts)
}

function clearFormInputs() {
    _$each(inputs, (input) => {
        input.value = ""
    })
}

function removeItem() {
    // get current node index for removal
    const name = this.parentNode.dataset.name
    const index = contacts.indexOf(contact => { return contact.name == name })
    
    // remove dom node and array obj
    this.parentNode.remove()
    contacts.splice(index, 1)

    console.log(contacts)
}

export { 
    buildContactList,
    submitNewContact,
    form
}