const fs = require('fs').promises;
const path = require('path');
const { serialize, generateId } = require('./utils');

const contactsPath = path.resolve('./db/contacts.json');

/**
 * gets all contacts stored in target file
 * @param {{ logger: boolean }} params configure extra params, like whether results should be logged
 * @returns { Promise<Contact[]> | Promise<[]> | Promise<Error> } Promise with parsed array of contacts | Error | []
 */
async function listContacts({ logger} = { logger: false }) {
    try {
        const contactsRaw = await fs.readFile(contactsPath, 'utf8');
        const serialized = await serialize.parse(contactsRaw);

        if(logger) console.table(serialized);

        return serialized;
    } catch (error) {
        console.error(error);
        return error;
    }
}
/**
 * gets one contact from contact list by provided id
 * @param {string} contactId contact's id
 * @returns {Promise<Contact | undefined>} Promise with one object
 */
async function getContactById(contactId) {
    const contacts = await listContacts();
    const found = contacts.find(({ id }) => id === contactId);

    console.log(found);

    return found;
}

/**
 * deletes one contact from contact list by provided id
 * @param {string} contactId contact's id
 * @return {void} this func return nothing 
 */
async function removeContact(contactId) {
    const contacts = await listContacts();
    const filtered = contacts.filter(({ id }) => id !== contactId.toString());

    fs.writeFile(contactsPath, serialize.toJSON(filtered), 'utf8');  
}

/**
 * adds contact to existing contacts list
 * @param {string} name contact name
 * @param {string} email contact email
 * @param {string} phone contact phone
 * @return {void} this func return nothing
 */
async function addContact(name, email, phone) {
    const contacts = await listContacts();

    const id = generateId(contacts);
    const newContact = { id, name, email, phone };

    contacts.push(newContact);

    fs.writeFile(contactsPath, serialize.toJSON(contacts), 'utf8');
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}