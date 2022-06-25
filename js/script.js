let tip_5 = document.querySelector('.select-tip-btns__wrapper [type="button"][value="5%"]');
let tip_10 = document.querySelector('.select-tip-btns__wrapper [type="button"][value="10%"]');
let tip_15 = document.querySelector('.select-tip-btns__wrapper [type="button"][value="15%"]');
let tip_25 = document.querySelector('.select-tip-btns__wrapper [type="button"][value="25%"]');
let tip_50 = document.querySelector('.select-tip-btns__wrapper [type="button"][value="50%"]');
let tip_custom = document.querySelector('.select-tip-btns__wrapper .custom');
let tip_amount = document.querySelector('.tip-amount-pp__text h2');
let total_amount = document.querySelector('.total-amount-pp__text h2');
let bill_input = document.querySelector('.bill-input');
let people_num = document.querySelector('.npeople-input');
let error_text_bill = document.querySelector('.error-text-bill');
let error_text_people = document.querySelector('.error-text-people');
let reset_button = document.querySelector('.btn-reset');

let tip_amount_calc, cost_per_person, total_cost_per_person;
let invalid_value = false;

//assign all input elements to an array
let input_array = [tip_custom, bill_input, people_num];
//assign button elements to an array
let tip_buttons_array = [tip_5, tip_10, tip_15, tip_25, tip_50];


//Add event listeners to all tip buttons
tip_5.addEventListener('click', function() {
    calcByValue(0.05, true);
    toggle_active(tip_5);
})
tip_10.addEventListener('click', function() {
    calcByValue(0.10, true);
    toggle_active(tip_10);
})
tip_15.addEventListener('click', function() {
    calcByValue(0.15, true);
    toggle_active(tip_15);
})
tip_50.addEventListener('click', function() {
    calcByValue(0.50, true);
    toggle_active(tip_50);
})
tip_25.addEventListener('click', function() {
    calcByValue(0.25, true);
    toggle_active(tip_25);
})

tip_custom.addEventListener('input', function() {
    calcByValue(tip_custom.value / 100);
})
tip_custom.addEventListener('click', function() {
    toggle_active("");
    calcByValue(tip_custom.value / 100);
    toggle_reset_button();
})
people_num.addEventListener('input', function() {
    validateUserInput(people_num.value);
    toggle_reset_button();
})
bill_input.addEventListener('input', function() {
    validateBillInput(bill_input.value);
    toggle_reset_button();
})

reset_button.addEventListener('click', function() {
    toggle_active("");
    clear_all();
})


//helper message function clear error message indicators
function clear_error_msg() {
    input_array.forEach(function(input, i) {
        input.classList.remove("error-input");
        input.classList.remove("valid-input");
    })
    error_text_bill.innerHTML = "";
    error_text_people.innerHTML = "";
}

//helper message function clear all input fields and error message
function clear_all() {
    tip_amount.innerHTML = "$" + "0.00";
    total_amount.innerHTML = "$" + "0.00";
    bill_input.value = "";
    people_num.value = "";
    tip_custom.value = "";

    clear_error_msg();
    toggle_reset_button();
}

//main function to calculate tip and set values
function calcByValue(value = 0.05, resetCustom) {
    //validate all inputs to ensure entry is valid before proceeding.Else do nothing
    if (tip_custom.value) {
        validateTipInput(tip_custom.value);
    }
    validateBillInput(bill_input.value);
    validateUserInput(people_num.value);

    //if there a no errrors/invalid values run tip calc
    if (invalid_value === false) {
        //reset custom arg to clear the custom tip box when a defined tip button is clicked
        if (resetCustom == true) {
            tip_custom.value = "";
        }
        //this second if statment is hack to fix bug with validating custom tip input
        //when it tip value is less than zero
        if (value < 0) {
            value *= 0;
        }
        cost_per_person = bill_input.value / people_num.value;
        tip_amount_calc = bill_input.value * value;
        total_cost_per_person = tip_amount_calc + cost_per_person;
        setValues(tip_amount_calc.toFixed(2), total_cost_per_person.toFixed(2))
    }

}

//## Helper function to set the value of tip and total payment
function setValues(tip_amount_value, total_amount_value) {
    tip_amount.innerHTML = "$" + tip_amount_value;
    total_amount.innerHTML = "$" + total_amount_value;
}


//## Helper function to validate user input and display error messages
function validateUserInput(params) {
    if (parseInt(params) < 0) {
        error_text_people.innerHTML = "Invalid input";
        people_num.classList.add("error-input");
        people_num.value = 0;
        invalid_value = true;

    } else if (params === "0" || parseInt(params) * 1 === 0) {
        error_text_people.innerHTML = "Can't be zero";
        people_num.classList.add("error-input");
        invalid_value = true;
    }
    //regExp to ensure params is an Int
    else if (!(/^\d+$/.test(params))) {
        error_text_people.innerHTML = "Invalid input";
        people_num.classList.add("error-input");
        invalid_value = true;
    } else {
        invalid_value = false;
        error_text_people.innerHTML = "";
        people_num.classList.remove("error-input");
        people_num.classList.add("valid-input");
    }
    toggle_active("");

}

//## Helper function to validate bill input and display error messages
function validateBillInput(params) {
    if (parseFloat(params) < 0) {
        error_text_bill.innerHTML = "Can't be less than 0";
        bill_input.classList.add("error-input");
        bill_input.value = 0;
        invalid_value = true;
    } else if (params === "0" || parseFloat(params) * 1 === 0) {
        error_text_bill.innerHTML = "Can't be zero";
        bill_input.classList.add("error-input");
        invalid_value = true;
    }
    //regExp to ensure params is a Float Val
    else if (!(/^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g.test(params))) {
        error_text_bill.innerHTML = "Invalid input";
        bill_input.classList.add("error-input");
        invalid_value = true;
    } else {
        invalid_value = false;
        error_text_bill.innerHTML = "";
        bill_input.classList.remove("error-input");
        bill_input.classList.add("valid-input");
    }
    toggle_active("");
}

//## Helper function to validate custom tip input and display error messages
function validateTipInput(params) {
    if (parseInt(params) < 0) {
        tip_custom.value = 0;
        invalid_value = true;
        tip_custom.classList.add("error-input");
    }
    //custom tip value can be zero
    else if (params === "0" || parseInt(params) * 1 === 0) {
        tip_custom.value = 0;
        invalid_value = false;
        tip_custom.classList.add("valid-input");
    }
    //regExp to ensure params is an Int
    else if (!(/^\d+$/.test(params))) {
        invalid_value = true;
        tip_custom.classList.add("error-input");
    } else {
        invalid_value = false;
        tip_custom.classList.remove("error-input");
        tip_custom.classList.add("valid-input");
    }
    toggle_active("");
}

//## Helper function to add active class when a tip button is clicked
function toggle_active(params) {
    if (invalid_value == false) {
        tip_buttons_array.forEach(function(tip_btn, i) {
            if (params != tip_btn) {
                tip_btn.classList.remove("active");
            } else {
                tip_btn.classList.add("active");
            }
        })
    } else if (invalid_value == true) {
        tip_buttons_array.forEach(function(tip_btn, i) {
            tip_btn.classList.remove("active");
        })
    }

}

function toggle_reset_button() {
    if (tip_amount.innerHTML == "$0.00" && total_amount.innerHTML == "$0.00" && bill_input.value == "" && people_num.value == "" && tip_custom.value == "") {
        reset_button.setAttribute("disabled", "");
    } else {
        reset_button.removeAttribute("disabled")
    }
}

toggle_reset_button();