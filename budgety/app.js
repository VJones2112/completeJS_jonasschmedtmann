// IIFE gives privacy. The variables can't be accessed from outside function.
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }   
    }

})();




var UIController = (function() {
    // Code to be added
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings; // exposing it publicly
        }
    };
})();


// This controller will connect the budget app with the UI
// AKA Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress' , function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    

    var ctrlAddItem = function() {
        // Get the input data
        var input = UICtrl.getInput();
        console.log(input);
        // Add item to the budget controller
        // Add new item to UI
        // Calculate budget
        // Display budget on UI
        // console.log('It works!')
    };

    return {
        init: function() {
            setupEventListeners();
        }
    };
    

})(budgetController, UIController);

controller.init();

