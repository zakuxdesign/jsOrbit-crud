// Crud App

// CLASS 1: Array of Employees
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
class AllEmployees {
  constructor() {
    this.AllEmployees = [];
    this.counter = 0;
  }

  // METHOD: Add to Array ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  addToArray(employee) {
    this.AllEmployees.push(employee);
  }

  // METHOD: Save ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  save(tempEmployeeForChecking) {
    let position = parseInt(tempEmployeeForChecking.employeeId);

    this.AllEmployees.splice(position, 1, tempEmployeeForChecking);
    UIElementTable.removeTable();
    UIElementTable.renderTable(mainAllEmployees.AllEmployees);
  }

  // METHOD: Delete ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  delete(indexInMainArray) {
    this.AllEmployees.splice(indexInMainArray, 1);
    UIElementTable.removeTable();
    UIElementTable.renderTable(mainAllEmployees.AllEmployees);
    UIElementFields.renderOptionsInDropdown(
      "field--input-manager-id",
      "manager-dropdown"
    );
  }
}

// this needs to be initialized still, but only once.
let mainAllEmployees = new AllEmployees();

// CLASS 2: Single Employee
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
class Employee {
  constructor(
    employeeFirstName,
    employeeLastName,
    employeeId,
    employeeManagerId,
    employeeSalary,
    employeePeopleManaged,
    deleteEmployee
  ) {
    this.employeeFirstName = employeeFirstName;
    this.employeeLastName = employeeLastName;
    this.employeeId = employeeId;
    this.employeeManagerId = employeeManagerId;
    this.employeeSalary = employeeSalary;
    this.employeePeopleManaged = employeePeopleManaged.split(", ");
    this.deleteEmployee = deleteEmployee;
  }
}

// CLASS 3: Actions for Left Panel Fields
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
class UIElementFields {
  constructor() {
    this.optionInDropdown = optionInDropdown;
  }

  // METHOD: Render Options in Dropdown ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static renderOptionsInDropdown(inputField, fieldLocation) {
    //
    // remove old dropdown
    document.getElementById(inputField).remove();

    //
    // create a new dropdown
    let newManagerDropdown = document.createElement("select");

    //
    // set id
    newManagerDropdown.setAttribute("id", inputField);

    //
    // append the new dropdown
    document.getElementById(fieldLocation).appendChild(newManagerDropdown);

    //
    // append blank and none option to new dropdown
    let blankOption = document.createElement("option");
    document.getElementById(inputField).appendChild(blankOption);
    blankOption.innerHTML = "";
    let noneOption = document.createElement("option");
    document.getElementById(inputField).appendChild(noneOption);
    noneOption.innerHTML = "None";

    //
    // append options to new dropdown
    for (let eachEmployee of mainAllEmployees.AllEmployees) {
      let newOption = document.createElement("option");
      newOption.setAttribute("id", "option-" + eachEmployee.employeeId);
      newOption.innerHTML =
        eachEmployee.employeeFirstName + " " + eachEmployee.employeeLastName;
      document.getElementById(inputField).appendChild(newOption);
    }
  }

  // METHOD: Clear Inputs ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static clearInputs() {
    let inputs = document.getElementsByClassName("field-input");
    let editInputs = document.getElementsByClassName("fields-edit");
    for (let x = 0; x < inputs.length; x++) {
      inputs[x].value = null;
      if (document.getElementById("panel-block").style.display == "block") {
        editInputs[x].value = null;
      }
    }
  }
}

// CLASS 4: Single Row of Table
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
class UIElementRow {
  constructor(cellLink) {
    this.cellLink = cellLink;
  }

  // METHOD: Close Panel ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static closePanel() {
    document.getElementById("panel-background").style.display = "none";
    document.getElementById("panel-block").style.display = "none";
    document.getElementById("section--main-content").style.filter = "blur(0px)";
  }

  // METHOD: Render Row ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  renderRow(num) {
    // render the cells to the row
    let newRow = document.createElement("tr");
    //
    // for each key in num (which is the nested employee object) create a row
    // // create conditions for each key value pair to say how to display that information in a cell
    for (const key in num) {
      //
      // create the row itself
      // // set the row id to the employees id
      document.getElementById("section--employee-table").appendChild(newRow);
      newRow.setAttribute("class", "table-row");
      newRow.setAttribute("id", "table-row--" + num.employeeId);
      //
      // create first name cell and first name
      if (key == "employeeFirstName") {
        //
        // create new cell
        // get the row with employees id and add new cell
        let newCell = document.createElement("td");
        document
          .getElementById("table-row--" + num.employeeId)
          .appendChild(newCell);
        //
        // set the cell id to employee id
        newCell.setAttribute("id", "table-row-cell--" + num.employeeId);
        //
        // create link to open modal
        // create the link in the cell with the instance of the thing being passed to the class
        this.cellLink = document.createElement("a");
        newCell.appendChild(this.cellLink);
        this.cellLink.innerHTML = num.employeeFirstName;
        this.cellLink.setAttribute("id", "employee-link--" + num.employeeId);
        this.cellLink.addEventListener("click", () => {
          UIElementRow.openPanel(num);
        });
      }
      //
      // appending the last name to the first name in cell 1 of that row
      else if (key == "employeeLastName") {
        let firstCellInRow = document.getElementById(
          "employee-link--" + num.employeeId
        );
        firstCellInRow.innerHTML += " " + num.employeeLastName;
        //
        // everything else create a normal cell
      } else if (key == "deleteEmployee") {
        //
        // creates the delete button cell
        // append the cell
        let newCell = document.createElement("td");
        newCell.setAttribute("id", "delete-" + num.employeeId);
        document
          .getElementById("table-row--" + num.employeeId)
          .appendChild(newCell);
        //
        // creates the delete button in the cell
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "button--delete-in-row");
        deleteButton.setAttribute("id", "this-deletes-" + num.employeeId);
        deleteButton.innerHTML = "Delete";
        //
        // appends the delete button
        document
          .getElementById("delete-" + num.employeeId)
          .appendChild(deleteButton);
        //
        // event listener clicking on the button
        // // 1. deletes from the main array
        // // 2. removes the table from UI
        // // 3. renders table with the updated main array
        deleteButton.addEventListener("click", () => {
          let thisEmployee = num;
          for (let eachEmployee in mainAllEmployees.AllEmployees) {
            if (
              mainAllEmployees.AllEmployees[eachEmployee].employeeId ==
              thisEmployee.employeeId
            ) {
              console.log("index in main array is " + eachEmployee);
              mainAllEmployees.delete(eachEmployee);
            }
          }
          UIElementTable.removeTable();
          UIElementTable.renderTable(mainAllEmployees.AllEmployees);
          if (document.getElementById("filter-input").value != null) {
            document.getElementById("filter-input").value = null;
          }
        });
      } else {
        // create the cell
        let newCell = document.createElement("td");
        document
          .getElementById("table-row--" + num.employeeId)
          .appendChild(newCell);
        newCell.setAttribute("id", "table-row-cell--" + num[key]);
        let text = document.createElement("p");
        newCell.appendChild(text);
        text.innerHTML = num[key];
      }
    }
  }

  // METHOD: Open Panel ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static openPanel(cellLink) {
    document.getElementById("panel-background").style.display = "block";
    document.getElementById("panel-block").style.display = "block";
    document.getElementById("section--main-content").style.filter = "blur(2px)";
    UIElementFields.renderOptionsInDropdown(
      "employeeManagerId",
      "manager-dropdown--panel"
    );
    let editinputs = document.getElementsByClassName("field-edit");
    // for each editinput
    for (const key in cellLink) {
      if (editinputs[key] != undefined) {
        editinputs[key].value = cellLink[key];
      }
    }
    // save button
    document
      .getElementById("panel-block--save-button")
      .addEventListener("click", () => {
        let tempEmployeeForChecking = new Employee(
          document.getElementById("employeeFirstName").value,
          document.getElementById("employeeLastName").value,
          document.getElementById("employeeId").value,
          document.getElementById("employeeManagerId").value,
          document.getElementById("employeeSalary").value,
          document.getElementById("employeePeopleManaged").value
        );
        mainAllEmployees.save(tempEmployeeForChecking);
        UIElementRow.closePanel();
      });

    // cancel button
    document
      .getElementById("panel-block--close-button")
      .addEventListener("click", () => {
        UIElementRow.closePanel();
      });
  }
}

// CLASS 5: Create Table
// Note: This calling for row creation and header creation
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
class UIElementTable {
  static removeTable() {
    document.getElementById("section--employee-table").remove();
  }

  static removeFilter() {
    document.getElementById("section--filter").remove();
  }

  // METHOD: Render Table Header ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static renderTableHeader() {
    // create table header row
    let headerRow = document.createElement("tr");
    document.getElementById("section--employee-table").appendChild(headerRow);
    headerRow.setAttribute("id", "table-row--header");
    const tableHeaders = [
      "Name",
      "Employee ID",
      "Manager",
      "Salary",
      "People Managed",
      " "
    ];
    // Create the header content
    for (let x = 0; x < tableHeaders.length; x++) {
      let tableHeader = document.createElement("th");
      document.getElementById("table-row--header").appendChild(tableHeader);
      tableHeader.setAttribute("class", "table-row--header");
      tableHeader.setAttribute("id", "table-header--" + tableHeaders[x]);
      tableHeader.innerHTML = tableHeaders[x];
    }

    let dataContent = document.createElement("tbody");
    document.getElementById("section--employee-table").appendChild(dataContent);
    dataContent.setAttribute("id", "table-data");
  }

  // METHOD: Render Table ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static renderTable(arrayToRender) {
    let table = document.createElement("table");
    document
      .getElementById("section--employee-table-container")
      .appendChild(table);
    table.setAttribute("id", "section--employee-table");
    UIElementTable.renderTableHeader();
    //
    // Create the rows
    for (const x in arrayToRender) {
      //
      // creates a new row instance
      let ElementRow = new UIElementRow();
      //
      // creates each thing that should be in the row
      ElementRow.renderRow(arrayToRender[x]);
    }
  }

  static filter() {
    let filter = document.getElementById("filter-input");
    let tempArrayForFilter = [];
    //
    filter.addEventListener("keyup", () => {
      //
      // on key up it removes everything from the temporary filter array
      // removes the table form the UI
      // for employee in the main array it will
      // // check if what's in filter is in the main array
      // // if so
      // // // push to temporary array
      tempArrayForFilter.splice(0, tempArrayForFilter.length);
      mainAllEmployees.AllEmployees.forEach(function(employee) {
        if (
          employee.employeeFirstName.includes(filter.value) ||
          employee.employeeLastName.includes(filter.value)
        ) {
          //
          let noMatchesError = document.getElementById("no-matches-error");
          if (noMatchesError != undefined) {
            noMatchesError.remove();
          }
          // push the matches to the temporary array
          tempArrayForFilter.push(employee);
          // remove the old table from the UI
          UIElementTable.removeTable();
          // append the updated temporary array to the UI
          UIElementTable.renderTable(tempArrayForFilter);
        } else {
          let noMatchesError = document.getElementById("no-matches-error");
          if (noMatchesError == undefined) {
            let noMatchesError = document.createElement("p");
            noMatchesError.setAttribute("id", "no-matches-error");
            noMatchesError.innerHTML = "There are no matches for this search.";
            document
              .getElementById("section--filter")
              .appendChild(noMatchesError);
          }
        }
      });
    });
  }

  // METHOD: Render Filter ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  static renderFilter() {
    // create filter label
    let filterLabel = document.createElement("label");
    document.getElementById("section--filter").appendChild(filterLabel);
    filterLabel.innerText = "Show All Containing:  ";
    // create filter input
    let filterInput = document.createElement("input");
    filterInput.setAttribute("id", "filter-input");
    document.getElementById("section--filter").appendChild(filterInput);
    //
    UIElementTable.filter();
  }
}

let ElementTable = new UIElementTable();

const checkIfFieldsAreFilled = () => {
  let temporaryArrayOfErrors = [];

  let fields = document.getElementsByClassName("field-input");
  for (let field of fields) {
    let fieldValue = field.value;
    if (fieldValue == "") {
      temporaryArrayOfErrors.push(field);
    }
  }

  if (temporaryArrayOfErrors.length > 0) {
    for (let index of temporaryArrayOfErrors) {
      index.style.border = "1px solid #ff0000cc";
    }
  } else {
    // do this if all is good
    for (let field of fields) {
      temporaryArrayOfErrors.length = 0;
      field.style.border = "none";
    }
    let employee = new Employee(
      document.getElementById("field--input-first-name").value,
      document.getElementById("field--input-last-name").value,
      mainAllEmployees.counter,
      document.getElementById("field--input-manager-id").value,
      document.getElementById("field--input-salary").value,
      document.getElementById("field--input-who-they-manage").value,
      "Delete"
    );
    mainAllEmployees.counter++;
    // call method to add employee to the array
    mainAllEmployees.addToArray(employee);
    UIElementTable.removeTable();
    UIElementTable.renderTable(mainAllEmployees.AllEmployees);
    if (document.getElementById("filter-input") == undefined) {
      UIElementTable.renderFilter();
    }
    UIElementFields.clearInputs();
    UIElementFields.renderOptionsInDropdown(
      "field--input-manager-id",
      "manager-dropdown"
    );
  }
};

// EVENT LISTENER: Add button
// ---------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------- //
document.getElementById("button--save").addEventListener("click", () => {
  // this will be initialized each time the user clicks the save button
  let fields = document.getElementsByClassName("field-input");
  for (let field in fields) {
    if (fields[field].style != undefined) {
      if (fields[field].style.border != "") {
        fields[field].style.border = "none";
      }
    }
  }
  checkIfFieldsAreFilled();
});
