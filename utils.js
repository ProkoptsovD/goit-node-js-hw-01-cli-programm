const serialize = {
    /**
     * transformes data to JSON and formats it into standart view
     * @param {any} data any data you want to be represented as JSON
     * @param {number} format configure the JSON view. By default value equals to two
     * @returns {JSON | Error} JSON or error
     */
    toJSON: (data, format = 2) => {
        try {
            const json = JSON.stringify(data, null, format);
            return json;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    /**
     * turns JSON to valid JS data types
     * @param {string} data any data in JSON format
     * @returns {any | Error} successfully parsed data or Error
     */
    parse: (data) => {
        try {
            const parsedData = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

/**
 * helper function creates new contact id based on the id of the last element in collection.
 * Fn accepts an array of contacts, gets the last element in collection,
 * extracts it's id value, increments the value by one. For example, prevId = 10 => nextId = prevId + 1;
 * @param {Array<Contact>} arr array of contacts 
 * @returns {string | Error} id based on prev element's id increased by one
 */
 function generateId(arr) {
    const isArray = Array.isArray(arr);
    
    if(!isArray) throw new Error('Passed argument must be a type of Array');

    const lastElementIndex = arr.length - 1;
    const [ lastElement ] = arr.slice(lastElementIndex);

    return String(+lastElement?.id + 1);
}

module.exports = {
    serialize,
    generateId
}