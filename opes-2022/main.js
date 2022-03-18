var firstSubmit = true;
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function checkSubmitForm(e) {
    if (e.charCode === 13) {
        submitForm();
    }
}

function submitForm() {
    firstSubmit = false;
    if (!validateForm()) {
        document.getElementById('submit').disabled = true;
        submitDataToAPI();
    }

    // alert("https://prod-00.centralindia.logic.azure.com:443/workflows/283c3208a2fa49768702aca6dcca5197/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cvHUExI1TUnG6V65qHLrixZOS7uxwGmLCLHfRTMsuGI");
}

function validateForm() {
    var error = false;

    var name = document.getElementById('name').value;
    var emailID = document.getElementById('emailID').value;
    var organization = document.getElementById('organization').value;

    if (name.length == 0) {
        error = true;
        document.getElementById('name-error').style.display = 'block';
    }

    if (emailID.length == 0) {
        error = true;
        document.getElementById('emailID-error').style.display = 'block';
    } else if (!emailID.match(validRegex)) {
        error = true;
        document.getElementById('emailID-valid-error').style.display = 'block';
    }

    if (organization.length == 0) {
        error = true;
        document.getElementById('organization-error').style.display = 'block';
    }

    return error;
}

function submitDataToAPI() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Typical action to be performed when the document is ready:
                onSubmitSuccess();
            } else {
                onSubmitError();
            }
        }
    };

    var params = new Object();
    params.name = document.getElementById('name').value;
    params.emailID = document.getElementById('emailID').value;
    params.organization = document.getElementById('organization').value;

    xhttp.open(
        "POST",
        "https://prod-08.centralindia.logic.azure.com:443/workflows/af005e49b105473c9b84762b63be8cfa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pvZz7-ojb22TPzhYJKBZBl65FnS_BWcVa5BcwpfUUS8",
        true
    );

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(params));
}

function resetForm() {
    document.getElementById('name').value = "";
    document.getElementById('emailID').value = "";
    document.getElementById('organization').value = "";

    document.getElementById('name-error').style.display = 'none';
    document.getElementById('emailID-error').style.display = 'none';
    document.getElementById('organization-error').style.display = 'none';
    firstSubmit = true;
}

function onSubmitSuccess() {
    document.getElementsByClassName("success")[0].style.display = 'block';
    resetForm();
}

function onSubmitError() {
    document.getElementById('submit').disabled = false;
    document.getElementsByClassName("error")[0].style.display = 'block';
    setTimeout(
        function () {
            document.getElementsByClassName("error")[0].style.display = 'none';
        }, 5000
    );
    resetForm();
}

function nameEntered() {
    if (!firstSubmit) {
        var name = document.getElementById('name').value;

        if (name.length == 0) {
            document.getElementById('name-error').style.display = 'block';
        } else {
            document.getElementById('name-error').style.display = 'none';
        }
    }
}

function emailIDEntered() {
    if (!firstSubmit) {
        var emailID = document.getElementById('emailID').value;

        if (emailID.length == 0) {
            document.getElementById('emailID-error').style.display = 'block';
        } else {
            document.getElementById('emailID-error').style.display = 'none';
            if (!emailID.match(validRegex)) {
                document.getElementById('emailID-valid-error').style.display = 'block';
            } else {
                document.getElementById('emailID-valid-error').style.display = 'none';
            }
        }
    }
}

function organizationEntered() {
    if (!firstSubmit) {
        var organization = document.getElementById('organization').value;

        if (organization.length == 0) {
            document.getElementById('organization-error').style.display = 'block';
        } else {
            document.getElementById('organization-error').style.display = 'none';
        }
    }
}