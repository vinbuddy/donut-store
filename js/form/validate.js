const validator = {
    isRequired: function (value = "Please enter this field") {
        return value === '' ? false : true;
    },
    isEmail: function (value) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        
        return regex.test(value) ? true : false;
    },
    isPhone: function(value) {
        // Vietnamese phone number
        const regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
        return regex.test(value) ? true : false;
    },
    isMin: function(value) {
        let min = 8;
        return value.length < min ? false : true;
    },
    isConfirmed: function(value, password) {
        return value === password ? true : false
    }
}

function getErrorElement(currentElement) {
    const parentElement = currentElement.parentElement
    const errorElement = parentElement.querySelector('.form__error')

    return errorElement
}

function removeError(element) {
    const errorElement = getErrorElement(element)
    errorElement.innerText = ''
}

function showError(element, errorMessage) {
    const errorElement = getErrorElement(element)
    errorElement.innerText = errorMessage
}


function validateSignUp (formElement ,onSubmit) {
    const fields = formElement.querySelectorAll('.form__input')
    let isValid = true
    
    function validate(fieldName, element, value) {

        switch (fieldName) {
            case 'name':
                if(!validator.isRequired(value)) {
                    showError(element, "Please enter user name")
                    isValid = false;
                }
                break;

            case 'email':
                if (!validator.isRequired(value)) {
                    showError(element, "Please enter email address")
                    isValid = false;
                    
                } else {
                    removeError(element)
                    
                    if (!validator.isEmail(value)) {
                        showError(element, "Please enter a valid email address")
                        isValid = false;
                    } 
                }
                break;

            case 'phone':
                if (!validator.isRequired(value)) {
                    showError(element, "Please enter phone number")
                    isValid = false;

                }
                else {
                    removeError(element)
                    if (!validator.isPhone(value)) {
                        showError(element, "Please enter valid phone number")
                        isValid = false;;
                    }
                }
                break;

            case 'password':
                if (!validator.isRequired(value)) {
                    showError(element, "Please enter phone number")
                    isValid = false;

                }
                else {
                    removeError(element)
                    if(!validator.isMin(value)) {
                        showError(element, "Please enter password at least 8 characters")
                        isValid = false;;
                    }
            
                }
                break;

            case 'confirm-password':
                let password = formElement.querySelector('#password').value.trimStart()
                if (!validator.isRequired(value)) {
                    showError(element, "Please confirm password")
                    isValid = false;
                }
                else {
                    removeError(element)
                    if(!validator.isConfirmed(value, password)) {
                        showError(element, "The password confirmation does not match")
                        isValid = false;
                    } 
                }
                break;
        
            default:
                break;
        }

        return isValid;
    }

    function validateWhileTyping(fieldName, element, value) {
        switch (fieldName) {
            case 'name':
                if (validator.isRequired(value)) {
                    removeError(element)
                    isValid = true;
                }

                break;

            case 'email':
                if(validator.isEmail(value)) {
                    removeError(element)
                    isValid = true
                }
                    
                break;

            case 'phone':
                if(validator.isPhone(value)) {
                    removeError(element)
                    isValid = true
                }
                    
                break;

            case 'password':
                if(validator.isMin(value)) {
                    removeError(element)
                    isValid = true
                }
                    
                break;

            case 'confirm-password':
                let password = formElement.querySelector('#password').value.trimStart()
                if(validator.isConfirmed(value, password)) {
                    removeError(element)
                    isValid = true
                }
                    
                break;
        
            default:
                break;
        }
    }   


    fields.forEach(field => {
        field.onblur = function (e) {
            validate(field.name, field, e.target.value.trimStart())
        }

        field.oninput = function (e) {
            validateWhileTyping(field.name, field, e.target.value.trimStart())
        }
    })


    formElement.onsubmit = function(e) {
        e.preventDefault()

        fields.forEach(field => {
            validate(field.name, field, field.value.trimStart())
        })
        
        if (isValid) {
            let formData = {}
            
            fields.forEach(field => {
                formData[field.name] = field.value
            })

            onSubmit(formData)
        }
    }

}

function validateSignIn () {
    
}

export { validateSignUp, validateSignIn}