var selectedRow = null

//Function onFormSubmit submit user input into table
function onFormSubmit() {
    if (validateAmount()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

//Function readFormatData read user input data values
function readFormData() {
    var formData = {};
    formData["vName"] = document.getElementById("vName").value;
    formData["item"] = document.getElementById("item").value;
    formData["amount"] = document.getElementById("amount").value;
    formData["date"] = document.getElementById("date").value;
    return formData;
}

//Function insertNewRecord insert record with edit and delete function
function insertNewRecord(data) {
    var table = document.getElementById("itemList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.vName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.item;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.amount;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.date;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//Function resetForm reset the form
function resetForm() {
    document.getElementById("vName").value = "";
    document.getElementById("item").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    selectedRow = null;
}

//Function onEdit allow user edit
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("vName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("item").value = selectedRow.cells[1].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
}

//Function that update edited record
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.vName;
    selectedRow.cells[1].innerHTML = formData.item;
    selectedRow.cells[2].innerHTML = formData.amount;
    selectedRow.cells[3].innerHTML = formData.date;
}

//Function that delete record
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("itemList").deleteRow(row.rowIndex);
        resetForm();
    }
}

//Function that validate necessary field is being filled
function validateAmount() {
    isValid = true;
    if (document.getElementById("amount").value == "") {
        isValid = false;
        document.getElementById("amountValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("amountValidationError").classList.contains("hide"))
            document.getElementById("amountValidationError").classList.add("hide");
    }
    return isValid;
}

//Function that calculate the result and output it into empty area
function calc(){
    var table = document.getElementById("itemList"), sumVal = 0;

    for (var i = 1; i<table.rows.length; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[2].innerHTML);
    }

    if (document.form.budget.value === ""){
        alert("Please input the budget amount.")
        return false;
    }else{
    var budgetVar = parseFloat(document.form.budget.value);
    var percent = sumVal / budgetVar * 100;


    if (document.getElementById("output").innerHTML != ""){
        document.getElementById("output").innerHTML = "";
    }

    document.getElementById("output").innerHTML += "Sum Value = $" + Math.round(sumVal * 100) / 100;
    document.getElementById("output").innerHTML += "<br>";
    document.getElementById("output").innerHTML += "Spending percentage = " + Math.round(percent) + "%";
    document.getElementById("output").innerHTML += "<br>";

    if (budgetVar > sumVal){
        var excess = budgetVar - sumVal;
        document.getElementById("output").innerHTML += "Excess = $" + Math.round(excess * 100) / 100;
    }else{
        var deficit = sumVal - budgetVar;
        document.getElementById("output").innerHTML += "Deficit = $" + Math.round(deficit * 100) / 100;
    }

    }
}
