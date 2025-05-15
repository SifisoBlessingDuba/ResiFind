"use strict";

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

    courses.forEach(function(course) {
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
    let disability = document.querySelector('input[name="disability"]:checked');
    let medical_aid = document.querySelector('input[name="medical_aid"]:checked');

    disability = disability ? disability.value : null;
    medical_aid = medical_aid ? medical_aid.value : null;

    document.querySelectorAll('.error').forEach(function(el) {
        el.textContent = '';
    });

    let isValid = true;

    if (faculty === "Select Faculty") {
        document.getElementById('facultyError').textContent = 'Please select a faculty.';
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

    if (isValid) {
        console.log(faculty, course, year, studyType, gender, race, payment, kinName, kinSurname, kinCell, kinEmail, disability, medical_aid);
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
        document.querySelectorAll('input[name="disability"]').forEach(el => el.checked = false);
        document.querySelectorAll('input[name="medical_aid"]').forEach(el => el.checked = false);
        isValid = true;
    } else {
        window.alert('Please fill in all the required fields.');
    }
}
function PushClear(){
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
    document.querySelectorAll('input[name="disability"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="medical_aid"]').forEach(el => el.checked = false);
}
