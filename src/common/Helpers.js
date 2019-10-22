const Swal = require('sweetalert2');
const Config = require('../../config.js');

class Helpers {

    static async post(query) {
        const url = Config.urls.api;
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        let result = await fetch(url, opts).catch(err => {
            console.error(`Method Helpers.post Error -> ${err}`);
            return {
                status: false,
                message: Config.messages.genericError
            };
        });
        if (!result.status) {
            return {
                status: false,
                message: Config.messages.genericError
            };
        }
        result = await result.json();
        return {
            status: true,
            data: result.data
        };
    }

    static isNullOrEmpty(obj) {
        let type = typeof obj;
        if (Array.isArray(obj)) {
            return obj.length === 0;
        } else if (type === 'object') {
            if (obj === null || obj === undefined) return true;
            return Object.keys(obj).length === 0;
        } else {
            return (obj === undefined || obj === 'undefined' || obj === null || obj === '');
        }
    }

    static mapObjects(firstObject, secondObject, keyField, nameFieldResult) {
        let result = [];
        firstObject.forEach(e => {
            for (let i = 0; i < secondObject.length; i++) {
                if (e[keyField] === secondObject[i][keyField]) {
                    result.push({
                        ...e,
                        [nameFieldResult]: secondObject[i]
                    });
                    break;
                }
            }
        });
        return result;
    }

    static dateDiff(date1, date2) {
        // The number of milliseconds in one day
        let ONEDAY = 1000 * 60 * 60 * 24;
        // Convert both dates to milliseconds
        let date1_ms = new Date(date1).getTime();
        let date2_ms = new Date(date2).getTime();
        // Calculate the difference in milliseconds
        let difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        return Math.round(difference_ms / ONEDAY);
    }

    static getValue(id) {
        let element = document.getElementById(id);
        switch (element.type) {
            case 'select-one':
                return element.options[element.selectedIndex].value;
            case 'checkbox':
                return element.checked;
            default:
                return element.value;
        }
    }

    static setDdlIndex(element, value) {
        for (let i in element.options) {
            if (element.options[i].value === value.toString()) {
                element.options.selectedIndex = i;
                break;
            }
        }
    }

    static showAlertError(message) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: message
        });
    }

    static showAlertUpdated() {
        Swal.fire(
            'Updated',
            'Register was updated successfully',
            'success'
        );
    }

    static showAlertAdd() {
        Swal.fire(
            'Add',
            'Register was added successfully',
            'success'
        );
    }

    static showAlertConfirm(message, callback) {
        Swal.fire({
            title: 'Confirm continue?',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                callback();
            }
        })
    }

    static validateObject(obj, args) {
        try {
            let keys = Helpers.isNullOrEmpty(args) ? Object.keys(obj) : args
            for (let i in keys) {
                if (Helpers.isNullOrEmpty(obj[keys[i]])) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static validateFields(fields) {
        if (Helpers.isNullOrEmpty(fields) || fields.length === 0)
            return false;

        let emptyFields = new Array();
        for (let i in fields) {
            if (Helpers.isNullOrEmpty(Helpers.getValue(fields[i])))
                emptyFields.push(document.getElementById(fields[i]).name);
        }

        if (emptyFields.length > 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${Config.messages.emptyFields}: 
                ${JSON.stringify(emptyFields)}`
            });
            return false
        }
        return true;
    }

    static setStartTime(date) {
        date.setDate(date.getDate() + 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    static setEndTime(date) {
        date.setDate(date.getDate() + 1);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        return date;
    }
}

export default Helpers;