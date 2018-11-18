
const form = document.querySelector("#orders-form");
const necklaceTextInput = document.querySelector("#necklaceText");
const customerNameInput = document.querySelector("#customerName");
const customerAddressInput = document.querySelector("#customerAddress");
const customerEmailInput = document.querySelector("#customerEmail");
const selectNecklaceType = document.querySelector("#necklaceType");
const itemsNecklace = document.querySelector(".items");
//const total = document.querySelector("#total");
const tr = document.querySelector(".items");
const deliveryType = document.querySelector("#deliveryType");

(function() {
    // These are the constraints used to validate the form
    var constraints = {
      email: {
        // Email is required
        presence: true,
        // and must be an email (duh)
        email: true
      },
      necklaceText: {
        // The custome need to pick a necklaceText too
        presence: true,
        // Necklace Text should be 8 digits or less
        length: {
          minimum: 1,
          maximum: 8
        }
    },
    customerName: {
        // Customer name
        presence: true,
    },
    customerAddress: {
        // Address
        presence: true,
  
    },

    };

    var form = document.querySelector("#orders-form");
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      handleFormSubmit(form);
      addTotalToOrder();
      addTotalDeleveryToOreder();
      totalSumToOrder();
      clearInputs();

    });
    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("input, select")
    for (var i = 0; i < inputs.length; ++i) {
      inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
      });
    }
    function handleFormSubmit(form, input) {
      // validate the form aainst the constraints
      var errors = validate(form, constraints);
      // then we update the form to reflect the results
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    }
    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
      // We loop through all the inputs and show the errors for that input
      _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }
    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
      // This is the root of the input
      var formGroup = closestParent(input.parentNode, "form-group")
        // Find where the error messages will be insert into
        , messages = formGroup.querySelector(".messages");
      // First we remove any old messages and resets the classes
      resetFormGroup(formGroup);
      // If we have errors
      if (errors) {
        // we first mark the group has having errors
        formGroup.classList.add("has-error");
        // then we append all the errors
        _.each(errors, function(error) {
          addError(messages, error);
        });
      } else {
        // otherwise we simply mark it as success
        formGroup.classList.add("has-success");
      }
    }
    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
      if (!child || child == document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }
    function resetFormGroup(formGroup) {
      // Remove the success and error classes
      formGroup.classList.remove("has-error");
      formGroup.classList.remove("has-success");
      // and remove any old messages
      _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
        el.parentNode.removeChild(el);
      });
    }
    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
      var block = document.createElement("p");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = error;
      messages.appendChild(block);
    }


    function addTotalToOrder() { 
        var addTotalToOrdertd = document.createElement("td");
        addTotalToOrdertd.setAttribute('id','total');

        if(selectNecklaceType.value === 1 ){
            itemsNecklace.value = "10"; 
        }else if (selectNecklaceType.value === 2) {
            itemsNecklace.value = "20";
        }else if (selectNecklaceType.value === 3){
            itemsNecklace.value = "30";
        }
        addTotalToOrdertd.appendChild(document.createTextNode(selectNecklaceType.value  * 10));
        tr.appendChild(addTotalToOrdertd);      
      }

      function addTotalDeleveryToOreder(){
        var totalDeleveryTd = document.createElement("td");
        totalDeleveryTd.setAttribute('id','totalDelevery');
        
        if(deliveryType.value === "0"){
          totalDeleveryTd.textContent = "0";
           
        }else{
          totalDeleveryTd.textContent = "15";
        }
        tr.appendChild(totalDeleveryTd); 
      }

      function totalSumToOrder(){
        var td = document.createElement("td");
        td.setAttribute('id','totalSum');
        var sum;
        var sum = parseInt(addTotalDeleveryToOreder()) + parseInt(selectNecklaceType.value  * 10);
        td.appendChild(document.createTextNode(sum));
        tr.appendChild(td);
      }

      function clearInputs(){
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
          if (elements[i].type === "text" || elements[i].type === "email" ) {
            elements[i].value = "";
          }
        }
      }

      function showSuccess() {
        // We made it \:D/
        alert("Success!");
        
      }


  })();



