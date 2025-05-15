"use strict";

let globalEmail;
window.onload = function() {
    fetch('/api/student-email')
        .then(response => response.json())
        .then(data => {
           globalEmail = data.email;
        })
        .catch(error => console.error('Error fetching email:', error));
};

function updateCourses() {
    const faculty = document.getElementById('Faculty').value;
    const courseSelect = document.getElementById('Course');

    courseSelect.innerHTML = '';

    let courses = [];

    switch (faculty) {
        case 'Applied Science':
            courses = ['Diploma in agricultural management', 'Diploma in biology', 'Diploma in analytical sciences',
                'Diploma in nature conservation', 'Diploma in marine science', "Diploma in mathematical science",
                'Diploma in environmental health', 'Bachelor of food science & technology', 'Diploma in analytical chemistry'];
            break;
        case 'Business and Management Science':
            courses = ['Diploma in accountancy', 'Diploma in event management', 'Diploma in public administration',
                'Diploma in banking', 'Diploma in marketing', 'Diploma in hospitality and food hotel management', 'Diploma in real estate',
                'Diploma in business & information administration', 'Diploma in sport and leisure management', 'Diploma in human and resource management'];
            break;
        case 'Education':
            courses = ['BEd senior phases and further education & training', 'General education & training (GET)', 'BEd foundation phase teaching',
                'BEd intermediate phase teaching', 'Postgraduate certificate education'];
            break;
        case 'Health and Wellness Science':
            courses = ['Higher certificate in emergency medical care', 'Higher certificate in dental assisting', 'Bachelor of health science in dental technology',
                'Bachelor in health science (BHs) in medical laboratory science', 'Bachelor of health science in opticianry', 'Bachelor in nursing',
                'Bachelor of science in medical imaging and therapeutic science', 'Diploma in somatology'];
            break;
        case 'Informatics and Design':
            courses = ['Diploma in architectural technology', 'Diploma in fashion', 'Diploma in film production', 'Diploma in information and communication technology',
                'Higher certificate in information and communication technology', 'Diploma in interior design', 'Diploma in jewellery design & manufacturing',
                'Diploma in journalism', 'Diploma in photography', 'Diploma in product design'];
            break;
        case 'Engineering & the Built Environment':
            courses = ['Bachelor in geomatics', 'Diploma in construction', 'Bachelor of engineering technology in chemical engineering', 'Bachelor of engineering technology in civil engineering',
                'Diploma in clothing and textile technology', 'Bachelor of engineering technology in computer engineering', 'Diploma in industrial engineering', 'Bachelor of natural science',
                'Diploma in mechanical engineering', 'Bachelor of marine engineering'];
            break;
        default:
            courses = ['Select a course'];
    }

    courses.forEach(function (course) {
        let option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });
}

function PushEnter() {
    let faculty = document.getElementById('Faculty').value;
    let course = document.getElementById('Course').value;
    let year = document.getElementById('Year').value;
    let studyType = document.getElementById('type').value;
    let gender = document.getElementById('Gender').value;
    let race = document.getElementById('Race').value;
    let payment = document.getElementById('Payment').value;
    let kinName = document.getElementById('KinName').value;
    let kinSurname = document.getElementById('KinSurname').value;
    let kinCell = document.getElementById('KinCell').value;
    let kinEmail = document.getElementById('KinEmail').value;
    let IDnumber = document.getElementById('IDnumber').value;
    let stdEmail = globalEmail;
    let schoolAddress = document.getElementById('SchoolAddress').value;
    let schoolName = document.getElementById('SchoolName').value;
    let results = document.getElementById('Results');
    let disability = document.querySelector('input[name="disability"]:checked');
    let medical_aid = document.querySelector('input[name="medical_aid"]:checked');

    disability = disability ? disability.value : null;
    medical_aid = medical_aid ? medical_aid.value : null;

    document.querySelectorAll('.error').forEach(function (el) {
        el.textContent = '';
    });

    let isValid = true;

    if (faculty === "Select Faculty") {
        document.getElementById('facultyError').textContent = 'Please select a faculty.';
        isValid = false;
    }

    if (stdEmail === '') {
        document.getElementById('StdEmailError').textContent = 'Please enter Student Email.';
        isValid = false;
    }

    if (schoolName === '') {
        document.getElementById('SchoolNameError').textContent = 'Please enter HighSchool Name.';
        isValid = false;
    }

    if (schoolAddress === '') {
        document.getElementById('SchoolAddressError').textContent = 'Please enter HighSchool Address.';
        isValid = false;
    }

    if (IDnumber === '') {
        document.getElementById('IDnumberError').textContent = 'Please enter ID / Passport number';
        isValid = false;
    }

    if (course === "Select a Course") {
        document.getElementById('courseError').textContent = 'Please select a course.';
        isValid = false;
    }

    if (year === "Select Year") {
        document.getElementById('yearError').textContent = 'Please select a year.';
        isValid = false;
    }

    if (studyType === "Select Type") {
        document.getElementById('typeError').textContent = 'Please select a study type.';
        isValid = false;
    }

    if (gender === "Select Gender") {
        document.getElementById('genderError').textContent = 'Please select a gender.';
        isValid = false;
    }

    if (race === 'Select Race') {
        document.getElementById('raceError').textContent = 'Please select a race.';
        isValid = false;
    }

    if (payment === "Select Payment") {
        document.getElementById('paymentError').textContent = 'Please select a form of payment.';
        isValid = false;
    }

    if (kinName === '') {
        document.getElementById('kinNameError').textContent = 'Please enter the next of kin\'s name.';
        isValid = false;
    }

    if (kinSurname === '') {
        document.getElementById('kinSurnameError').textContent = 'Please enter the next of kin\'s surname.';
        isValid = false;
    }

    if (kinCell === '') {
        document.getElementById('kinCellError').textContent = 'Please enter the next of kin\'s cellphone number.';
        isValid = false;
    }

    if (kinEmail === '') {
        document.getElementById('kinEmailError').textContent = 'Please enter the next of kin\'s email.';
        isValid = false;
    }

    if (!disability) {
        document.getElementById('disabilityError').textContent = 'Please select if you have a disability.';
        isValid = false;
    }

    if (!medical_aid) {
        document.getElementById('medicalError').textContent = 'Please select if you have medical aid.';
        isValid = false;
    }
    if (results.files.length === 0) {
        document.getElementById('ResultsError').textContent = 'Please upload a document.';
        isValid = false;
    }

    if (isValid) {
        let type = "Residence Application";

        const fileResults = results;
        const file = fileResults.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const binaryString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
                const applicationData = {
                    faculty: faculty,
                    course: course,
                    year: year,
                    studyType: studyType,
                    gender: gender,
                    race: race,
                    payment: payment,
                    kinCell: kinCell, 
                    kinEmail: kinEmail,
                    kinName: kinName,
                    kinSurname: kinSurname,
                    IDnumber: IDnumber,
                    stdEmail: stdEmail,
                    fileResults: binaryString,
                    schoolName: schoolName,
                    schoolAddress: schoolAddress,
                    medical_aid: medical_aid,
                    disability: disability,
                    type: type

                };

                fetch('/submit-application', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(applicationData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.error('Error:', data.error);
                            alert('An error occurred while submitting the application.');
                        } else {
                            console.log('Success:', data.message);
                            alert('Application submitted successfully. Your Application ID is: ' + data.ApplicationID);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred while submitting the application.');
                    });
            
          }
          reader.readAsArrayBuffer(file);
         }
        window.alert("Application sent successfully! Please check your status on the Tracking page.");
        document.getElementById('CompleteError').textContent = 'NOTE!! this step has been completed once and reApplying is not ideal. You can track your status in the Tracking page.';
        document.getElementById('Faculty').value = 'Select Faculty';
        document.getElementById('Course').innerHTML = '<option value="">Select a course</option>';
        document.getElementById('Year').value = 'Select Year';
        document.getElementById('type').value = 'Select Type';
        document.getElementById('Gender').value = 'Select Gender';
        document.getElementById('Race').value = 'Select Race';
        document.getElementById('Payment').value = 'Select Payment';
        document.getElementById('KinName').value = '';
        document.getElementById('KinSurname').value = '';
        document.getElementById('KinCell').value = '';
        document.getElementById('KinEmail').value = '';
        document.getElementById('IDnumber').value = '';
        document.getElementById('StdEmail').value = '';
        document.getElementById('SchoolAddress').value = '';
        document.getElementById('SchoolName').value = '';
        document.getElementById('Results').value = '';
        document.querySelectorAll('input[name="disability"]').forEach(el => el.checked = false);
        document.querySelectorAll('input[name="medical_aid"]').forEach(el => el.checked = false);
    }
       
}

function PushClear() {
    document.getElementById('Faculty').value = 'Select Faculty';
    document.getElementById('Course').innerHTML = '<option value="">Select a course</option>';
    document.getElementById('Year').value = 'Select Year';
    document.getElementById('type').value = 'Select Type';
    document.getElementById('Gender').value = 'Select Gender';
    document.getElementById('Race').value = 'Select Race';
    document.getElementById('Payment').value = 'Select Payment';
    document.getElementById('KinName').value = '';
    document.getElementById('KinSurname').value = '';
    document.getElementById('KinCell').value = '';
    document.getElementById('KinEmail').value = '';
    document.getElementById('IDnumber').value = '';
    document.getElementById('StdEmail').value = '';
    document.getElementById('SchoolAddress').value = '';
    document.getElementById('SchoolName').value = '';
    document.getElementById('Results').value = '';
    document.querySelectorAll('input[name="disability"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="medical_aid"]').forEach(el => el.checked = false);
}

function PushSubscription() {
    let email = document.getElementById('Email').value;
  
    if (email == "") {
        SubscribeMessage.textContent = 'Please enter your email address';
        return;
        }

        if (!email.endsWith("@mycput.ac.za")) {
            SubscribeMessage.textContent = 'Please enter a valid student email address';
        return;
        }
        SubscribeMessage.textContent = 'Thank you for your subscription!';
    
    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }