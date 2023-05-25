// employee popup add
document.querySelector("#add-employee").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
});

// employee popup remove
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

// Remove Add Employee Popup after Pressing Add
document.querySelector("#Add").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

// DOM Elements
const empDetailsDisplayContainer = document.getElementById('emp-details-display-container');

const errorMessage = document.createElement("p");

// Buttons
let addBtn = document.getElementById('Add');

// Form Fields
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let email = document.getElementById('email');
let jobTitle = document.getElementById('job-title');
let office = document.getElementById('office');
let department = document.getElementById('department');
let phNumber = document.getElementById('ph-number');
let skypeId = document.getElementById('skype-id');

addBtn.addEventListener("click", addemployeeToDirectory);

// Storage Array
function getEmpListFromLocalStorage() {

    // Returns value from localStorage using key (empData).
    let strEmpList = localStorage.getItem("empData");
    let parsedEmpList = JSON.parse(strEmpList);

    if (parsedEmpList === null) {
        return [];
    }
    else {
        return parsedEmpList;
    }
}

let employeeDirectory = getEmpListFromLocalStorage();
let empCount = employeeDirectory.length;

if (empCount == 0) {
    errorMessage.textContent = "Employee Details Not Found...!";
    empDetailsDisplayContainer.appendChild(errorMessage);
}



// Constructor
function jsonStructure(firstName, lastName, email, jobTitle, office, department, phNumber, skypeId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.preferredName = firstName + ' ' + lastName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.office = office;
    this.department = department;
    this.phNumber = phNumber;
    this.skypeId = skypeId;
    this.uniqueId = empCount + 1;
}

function addemployeeToDirectory() {

    if (authenticateAddEmpForm()) {

        var obj = new jsonStructure(firstName.value, lastName.value, email.value, jobTitle.value, office.value, department.value, phNumber.value, skypeId.value);

        empCount = empCount + 1;

        employeeDirectory.push(obj);

        // Stores values in localStorage.
        localStorage.setItem("empData", JSON.stringify(employeeDirectory));

        addEmployeeToCard(obj);

        location.reload();

        clearForm();

    }
}

function clearForm() {
    var formFields = document.querySelectorAll('.formFields');
    // Will access all the text fields of the form and remove data.
    for (var i in formFields) {
        formFields[i].value = '';
    }
}

// Validations of forms
function authenticateAddEmpForm() {

    return !(!authenticateFirstName() || !authenticateLastName() || !authenticateEmail() || !authenticateJobTitle() || !authenticateOffice() || !authenticateDepartment() || !authenticatePhone() || !authenticateSkypeId()) 
       

    // return false;

}

function authenticateFirstName() {

    if (firstName.value.length == 0) {
        document.getElementById("error-msg-for-first-name").innerHTML = "First Name is required.";
        return false;
    } else if (!firstName.value.match(/^[A-Za-z]+$/)) {
        document.getElementById("error-msg-for-first-name").innerHTML = "Use characters only.";
        return false;
    } else {
        document.getElementById("error-msg-for-first-name").innerHTML = "";
        return true;
    }

}

function authenticateLastName() {

    if (lastName.value.length == 0) {
        document.getElementById("error-msg-for-last-name").innerHTML = "Last Name is required.";
        return false;
    } else if (!lastName.value.match(/^[A-Za-z]+$/)) {
        document.getElementById("error-msg-for-last-name").innerHTML = "Use characters only.";
        return false;
    } else {
        document.getElementById("error-msg-for-last-name").innerHTML = "";
        return true;
    }
}

function authenticateEmail() {

    if (email.value.length == 0) {
        document.getElementById("error-msg-for-email").innerHTML = "Email is required.";
        return false;
    } else if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        document.getElementById("error-msg-for-email").innerHTML = "Invalid Email.";
        return false;
    } else {
        document.getElementById("error-msg-for-email").innerHTML = "";
        return true;
    }

}

function authenticateJobTitle() {

    if (jobTitle.value.length == 0) {
        document.getElementById("error-msg-for-job-title").innerHTML = "Job Title is required.";
        return false;
    } else if (!jobTitle.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-job-title").innerHTML = "Invalid Job Title.";
        return false;
    } else {
        document.getElementById("error-msg-for-job-title").innerHTML = "";
        return true;
    }

}

function authenticateOffice() {

    if (office.value.length == 0) {
        document.getElementById("error-msg-for-office").innerHTML = "Office location is required.";
        return false;
    } else if (!office.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-office").innerHTML = "Invalid Office Location.";
        return false;
    } else {
        document.getElementById("error-msg-for-office").innerHTML = "";
        return true;
    }
}

function authenticateDepartment() {

    if (department.value.length == 0) {
        document.getElementById("error-msg-for-department").innerHTML = "Department is required.";
        return false;
    } else if (!department.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-department").innerHTML = "Invalid department.";
        return false;
    } else {
        document.getElementById("error-msg-for-department").innerHTML = "";
        return true;
    }

}

function authenticatePhone() {

    if (phNumber.value.length == 0) {
        document.getElementById("error-msg-for-ph-number").innerHTML = "Phone number is required.";
        return false;
    } else if (!phNumber.value.match(/^[0-9]{10}$/)) {
        document.getElementById("error-msg-for-ph-number").innerHTML = "Invalid Phone Number.";
        return false;
    } else {
        document.getElementById("error-msg-for-ph-number").innerHTML = "";
        return true;
    }

}

function authenticateSkypeId() {

    if (skypeId.value.length == 0) {
        document.getElementById("error-msg-for-skype-id").innerHTML = "Skype id is required.";
        return false;
    } else if (!skypeId.value.match(/^[A-Za-z0-9]*$/)) {
        document.getElementById("error-msg-for-skype-id").innerHTML = "Invalid skype id.";
        return false;
    } else {
        document.getElementById("error-msg-for-skype-id").innerHTML = "";
        return true;
    }

}

function addEmployeeToCard(obj) {

    // console.log(obj.empCount);

    // console.log(JSON.stringify(employeeDirectory));

    let eachEmpId = obj.uniqueId;

    errorMessage.textContent = "";

    // user-info-card div
    const userInfoCardDiv = document.createElement("div");
    userInfoCardDiv.classList.add("user-info-card");
    userInfoCardDiv.setAttribute("id", obj.uniqueId);
    userInfoCardDiv.id = eachEmpId;

    // user-photo div
    const userPhotoDiv = document.createElement("div");
    userPhotoDiv.classList.add("user-photo");

    empImg = document.createElement("img");
    empImg.classList.add("emp-photo");
    empImg.setAttribute("src", "./images/emp-photo.png");
    userPhotoDiv.appendChild(empImg);
    userInfoCardDiv.appendChild(userPhotoDiv);

    // emp-details div
    const empDetailsDiv = document.createElement("div");
    empDetailsDiv.classList.add("emp-details");

    const empName = document.createElement("label");
    empName.classList.add("emp-name", "font-open-sans");
    empName.textContent = obj.preferredName;
    empName.style.fontWeight = "bold";
    empDetailsDiv.appendChild(empName);

    // emp-designation-and-dept div
    const empDesignationAndDept = document.createElement("div");
    empDesignationAndDept.classList.add("emp-designation-and-dept");

    const empDesignation = document.createElement("p");
    empDesignation.classList.add("emp-designation", "font-open-sans");
    empDesignation.textContent = obj.jobTitle;
    empDesignationAndDept.appendChild(empDesignation);

    const empDept = document.createElement("p");
    empDept.classList.add("emp-department", "font-open-sans");
    empDept.textContent = obj.department;
    empDesignationAndDept.appendChild(empDept);

    empDetailsDiv.appendChild(empDesignationAndDept);

    // emp-details-icons div
    const empDetailsIcons = document.createElement("div");
    empDetailsIcons.classList.add("emp-details-icons");

    const phoneIcon = document.createElement("i");
    phoneIcon.classList.add("fa-solid", "fa-square-phone", "fa-lg");
    phoneIcon.style.color = '#969595';
    empDetailsIcons.appendChild(phoneIcon);

    const envelopeIcon = document.createElement("i");
    envelopeIcon.classList.add("fa-solid", "fa-square-envelope", "fa-lg");
    envelopeIcon.style.color = '#969595';
    empDetailsIcons.appendChild(envelopeIcon);

    const commentIcon = document.createElement("i");
    commentIcon.classList.add("fa-solid", "fa-comment", "fa-lg");
    commentIcon.style.color = '#969595';
    empDetailsIcons.appendChild(commentIcon);

    const starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star", "fa-lg");
    starIcon.style.color = '#969595';
    empDetailsIcons.appendChild(starIcon);

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart", "fa-lg");
    heartIcon.style.color = '#969595';
    empDetailsIcons.appendChild(heartIcon);

    // Edit Icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "fa-sm", "edit-icon");
    editIcon.setAttribute("id", "edit-emp-form-popup");
    editIcon.style.color = '#969595';
    editIcon.onclick = function () {
        // console.log(eachEmpId);
        editEmpCard(eachEmpId);
    }
    empDetailsDiv.appendChild(editIcon);

    // Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-alt", "fa-sm", "delete-icon");
    deleteIcon.style.color = '#969595';
    deleteIcon.onclick = function () {
        // deleteEmployeeCard(eachEmpId);
        deleteEmployeeCardConfirm(eachEmpId);
    }
    empDetailsDiv.appendChild(deleteIcon);

    empDetailsDiv.appendChild(empDetailsIcons);

    userInfoCardDiv.appendChild(empDetailsDiv);

    empDetailsDisplayContainer.appendChild(userInfoCardDiv);

}

// cards are not disapper after refresh 
for (const eachEmp of employeeDirectory) {
    addEmployeeToCard(eachEmp);
}

// Close the edit employee popup.
document.querySelector(".edit-emp-popup .close-btn").addEventListener("click", function () {
    document.querySelector(".edit-emp-popup").classList.remove("active");
});

function editEmpCard(eachEmpId) {

    console.log("Edit button pressed...!");

    // document.querySelector(".user-info-card").addEventListener("click", function () {
    document.querySelector(".edit-emp-popup").classList.add("active");
    // });

    // Finding emp index.
    let editEmpIndex = employeeDirectory.findIndex(function (eachCard) {
        let employeeId = eachCard.uniqueId;
        if (employeeId === eachEmpId) {
            return true;
        } else {
            return false;
        }
    });
      

    
    employeeDetails = employeeDirectory[editEmpIndex];
    // console.log(employeeDetails);

    // Displays html on the uniqueId
    let employeeCard = document.getElementById(eachEmpId);
    console.log(employeeCard);

    let firstNameEdit = document.getElementById('first-name-edit');
    let lastNameEdit = document.getElementById('last-name-edit');
    let emailEdit = document.getElementById('email-edit');
    let jobTitleEdit = document.getElementById('job-title-edit');
    let officeEdit = document.getElementById('office-edit');
    let departmentEdit = document.getElementById('department-edit');
    let phNumberEdit = document.getElementById('ph-number-edit');
    let skypeIDEdit = document.getElementById('skype-id-edit');

    firstNameEdit.value = employeeDetails.firstName;
    lastNameEdit.value = employeeDetails.lastName;
    emailEdit.value = employeeDetails.email;
    jobTitleEdit.value = employeeDetails.jobTitle;
    officeEdit.value = employeeDetails.office;
    departmentEdit.value = employeeDetails.department;
    phNumberEdit.value = employeeDetails.phNumber;
    skypeIDEdit.value = employeeDetails.skypeId;

    let onChangeEmpBtn = document.getElementById("onChangeEmpBtn");
    onChangeEmpBtn.onclick = function () {
        const firstName = firstNameEdit.value;
        const lastName = lastNameEdit.value;
        const preferredName = firstName + " " + lastName;
        const email = emailEdit.value;
        const jobTitle = jobTitleEdit.value;
        const office = officeEdit.value;
        const department = departmentEdit.value;
        const phNumber = phNumberEdit.value;
        const skypeId = skypeIDEdit.value;

        let editedEmpDetails = {
            "firstName": firstName,
            "lastName": lastName,
            "preferredName": preferredName,
            "email": email,
            "jobTitle": jobTitle,
            "office": office,
            "department": department,
            "phNumber": phNumber,
            "skypeId": skypeId,
            "uniqueId": eachEmpId,
        }

        employeeDirectory[editEmpIndex] = editedEmpDetails;

        empDetailsDisplayContainer.innerHTML = "";

        localStorage.setItem("empData", JSON.stringify(employeeDirectory));

        console.log(employeeDirectory[editEmpIndex]);

        for (const eachEmp of employeeDirectory) {
            addEmployeeToCard(eachEmp);
        }

        closeEditForm();
        location.reload();

    };
}


// Delete Employee Card Confirmation
function deleteEmployeeCardConfirm(eachEmpId) {
    console.log("Delete Button Clicked!!!");
    document.querySelector(".confirm-delete-popup-container").classList.add("active");

    document.getElementById("delete-popup-btn").addEventListener('click', function() {
        deleteEmployeeCard(eachEmpId);
        // console.log("Selected Emp Deleted");
        document.querySelector(".confirm-delete-popup-container").classList.remove("active");
        location.reload();
    })

    document.getElementById("cancel-delete-popup-btn").addEventListener('click', function() {
        document.querySelector(".confirm-delete-popup-container").classList.remove("active");
    })
}

// Delete Employee Card
function deleteEmployeeCard(eachEmpId) {
    let employeeCard = document.getElementById(eachEmpId);
    empDetailsDisplayContainer.removeChild(employeeCard);

    let deleteEmpIndex = employeeDirectory.findIndex(function (eachCard) {
        let employeeId = eachCard.uniqueId
        if (employeeId === eachEmpId) {
            return true
        } else {
            return false
        }
    });
    employeeDirectory.splice(deleteEmpIndex, 1);
    localStorage.setItem("empData", JSON.stringify(employeeDirectory));
}

function closeEditForm() {
    document.getElementById("edit-emp-popup").style.display = "none";
}

// Alphabet Search Filter.
const searchFilterButtons = document.querySelectorAll("#search-buttons button");
searchFilterButtons.forEach(function (alphabet) {
    alphabet.addEventListener('click', function () {
        let searchedValue = alphabet.textContent;
        // console.log(searchedValue);
        let existingEmp = employeeDirectory.filter(function (emp) {
            return (
                emp.firstName.toLowerCase().startsWith(searchedValue.toLowerCase())
            )
        });

        empDetailsDisplayContainer.innerHTML = "";
        existingEmp.forEach(function (eachEmp) {
            addEmployeeToCard(eachEmp);
        })

    });
});


// Text Search Filter.
const inputTextFilter = document.getElementById("search-input-text");
inputTextFilter.addEventListener('change', function (event) {
    let searchedValue = event.target.value;
    console.log(searchedValue);
    let selectedFilterBy = getFilterBy();
    console.log(selectedFilterBy);

    let inputTextFilteredEmps = employeeDirectory.filter(function (emp) {
        return (
            emp[selectedFilterBy].toLowerCase().includes(searchedValue.toLowerCase())
        )
    })

    empDetailsDisplayContainer.innerHTML = '';
    inputTextFilteredEmps.forEach(function (eachEmp) {
        addEmployeeToCard(eachEmp);
    })
})

function getFilterBy() {
    const filterBy = document.getElementById("filter-by");
    return filterBy.value;
}

// Clear Button.
const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', function () {
    inputTextFilter.innerText = '';
    empDetailsDisplayContainer.innerHTML = '';
    employeeDirectory.forEach(function (eachEmp) {
        addEmployeeToCard(eachEmp);
    })
})

// Department options.
const deptOptions= document.querySelectorAll('#departments-options li');
deptOptions.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        employeeDirectory.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.department).toLowerCase()) {
                addEmployeeToCard(emp);
            }
        })
    })
})

//  Office options
const officesOptions = document.querySelectorAll('#office-options li');
officesOptions.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        employeeDirectory.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.office).toLowerCase()) {
                addEmployeeToCard(emp);
            }
        })
    })
})


//  JobTitle options
const jobTitlesOptions = document.querySelectorAll('#job-title-options li');
jobTitlesOptions.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        employeeDirectory.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.jobTitle).toLowerCase()) {
                addEmployeeToCard(emp);
            }
        })
    })
});                                       



//department
let itCount = 0;
let hrCount = 0;
let mdCount = 0;
let salesCount = 0;

employeeDirectory.forEach(function(emp) {

    if (emp.department.toLowerCase() == 'it') {
        itCount++;
    } else if (emp.department.toLowerCase() == 'human resources') {
        hrCount++;
    } else if (emp.department.toLowerCase() == 'md') {
        mdCount++;
    } else if (emp.department.toLowerCase() == 'sales') {
        salesCount++;
    }

});

// employeeDirectory.filter((item)=> item.department == 'it' ).length     => 3
// employeeDirectory.filter((item)=> item['department'].toLowerCase() == 'it' ).length    => 3

let departmentScope = document.querySelectorAll("#departments-options span");
departmentScope.forEach(function(eachDeptScope) {
    if(eachDeptScope.id.toLowerCase().includes("it")) {
        eachDeptScope.textContent = itCount;
    } else if (eachDeptScope.id.toLowerCase().includes("hr")) {
        eachDeptScope.textContent = hrCount;
    } else if (eachDeptScope.id.toLowerCase().includes("md")) {
        eachDeptScope.textContent = mdCount;
    } else if (eachDeptScope.id.toLowerCase().includes("sales")) {
        eachDeptScope.textContent = salesCount;
    }
});

// 2. Offices options Count
let seattleOfficeCount = 0;
let indiaOfficeCount = 0;

employeeDirectory.forEach(function(emp) {

    if (emp.office.toLowerCase() == 'seattle') {
        seattleOfficeCount++;
    } else if (emp.office.toLowerCase() == 'india') {
        indiaOfficeCount++;
    }

});

let officeScope = document.querySelectorAll("#office-options span");
officeScope.forEach(function(eachOfficeScope) {
    if(eachOfficeScope.id.toLowerCase().includes("seattle")) {
        eachOfficeScope.textContent = seattleOfficeCount;
    } else if (eachOfficeScope.id.toLowerCase().includes("india")) {
        eachOfficeScope.textContent = indiaOfficeCount;
    }
});

// 3. Job Titles options count
let SharePointPracticeHeadCount = 0;
let dotNetDevelopmentHeadCount = 0;
let recruitingExpertCount = 0;
let biDeveloperCount = 0;
let businessAnalystCount = 0;
let fullStackDeveloperCount = 0;

employeeDirectory.forEach(function(emp) {

    if (emp.jobTitle.toLowerCase() == 'sharepoint practice head') {
        SharePointPracticeHeadCount++;
    } else if (emp.jobTitle.toLowerCase() == '.net development head') {
        dotNetDevelopmentHeadCount++;
    } else if (emp.jobTitle.toLowerCase() == 'recruiting expert') {
        recruitingExpertCount++;
    } else if (emp.jobTitle.toLowerCase() == 'bi developer') {
        biDeveloperCount++;
    } else if (emp.jobTitle.toLowerCase() == 'business analyst') {
        businessAnalystCount++;
    } else if (emp.jobTitle.toLowerCase() == 'full stack developer') {
        fullStackDeveloperCount++;
    }

});

let jobTitleScope= document.querySelectorAll("#job-title-options span");
jobTitleScope.forEach(function(eachJobTitleScope) {
    if(eachJobTitleScope.id.toLowerCase().includes("sharepoint-practice-head")) {
        eachJobTitleScope.textContent = SharePointPracticeHeadCount;
    } else if (eachJobTitleScope.id.toLowerCase().includes("dot-net-development-head")) {
        eachJobTitleScope.textContent = dotNetDevelopmentHeadCount;
    } else if (eachJobTitleScope.id.toLowerCase().includes("recruiting-expert")) {
        eachJobTitleScope.textContent = recruitingExpertCount;
    } else if (eachJobTitleScope.id.toLowerCase().includes("bi-developer")) {
        eachJobTitleScope.textContent = biDeveloperCount;
    } else if (eachJobTitleScope.id.toLowerCase().includes("business-analyst")) {
        eachJobTitleScope.textContent = businessAnalystCount;
    } else if (eachJobTitleScope.id.toLowerCase().includes("full-stack-developer")) {
        eachJobTitleScope.textContent = fullStackDeveloperCount;
    }
});

