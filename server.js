const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

const dbPath = path.join(__dirname, 'Public', 'Database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

  }
});
let globalEmail;

app.post('/StudentLogin', (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  db.get(`SELECT * FROM StudentDetails WHERE StdEmail = ? AND StdPassword = ?`, [loginEmail, loginPassword], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ valid: false, message: 'Internal server error' });
    } else if (results) {
      globalEmail = loginEmail;
      res.json({ valid: true });
    } else {
      res.json({ valid: false, message: 'Invalid email or password' });
    }
  });
});

app.get('/api/student-email', (req, res) => {
  res.json({ email: globalEmail });
});


app.post('/Registration', (req, res) => {
  const { name, email, password, telphone, } = req.body;

  const StudentDetails = `
    INSERT INTO StudentDetails (
      StdEmail, StdName, StdPassword, Number
    ) VALUES (?, ?, ?, ?)
  `;

  db.run(StudentDetails, [email, name, password, telphone], function (err) {
    if (err) {
      console.error('Error registering student:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Registered successfully' });
  });
});

app.post('/submit-application', (req, res) => {
  const { faculty, course, year, studyType, gender, type, race, payment, kinCell, kinEmail, kinName, kinSurname, IDnumber, schoolName, schoolAddress, fileResults, stdEmail, disability, medical_aid } = req.body;

  const Application = `
    INSERT INTO Application (
      ApplicationID, ApplicationType, Faculty, Course, Year, stdType, Gender, Race, Payment, StdEmail, Results
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(Application, [IDnumber, type, faculty, course, year, studyType, gender, race, payment, stdEmail, fileResults], function (err) {
    if (err) {
      console.error('Error registering student:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Application submitted successfully', ApplicationID: IDnumber });
  });

  const ApplicationStatus = `
  INSERT INTO ApplicationStatus (
   StdEmail, ApplicationReceived, EvaluationProgress, PlacingProcess, AcceptedRejected
  ) VALUES (?, ?, ?, ?, ?)
`;

  db.run(ApplicationStatus, [stdEmail, '0%', '0%', '0%', 'pending'], function (err) {

  });

  const kinDetails = `
  INSERT INTO KinDetails (
    KinEmail, KinName, KinSurname, KinCell
  ) VALUES (?, ?, ?, ?)
`;

  db.run(kinDetails, [kinEmail, kinName, kinSurname, kinCell], function (err) { });

  const School = `
  INSERT INTO School (
    SchoolName, SchoolAddress
  ) VALUES (?, ?)
`;

  db.run(School, [schoolName, schoolAddress], function (err) { });

  const Student_School = `
  INSERT INTO Student_School (
    StdEmail, SchoolName
  ) VALUES (?, ?)
`;

  db.run(Student_School, [stdEmail, schoolName], function (err) { });

  const updateStudent = `
UPDATE StudentDetails
SET Disability = ?, MedicalAid = ?, Race = ?
WHERE StdEmail = ?
`;

  db.run(updateStudent, [disability, medical_aid, race, stdEmail], (err) => {
    if (err) {
      console.error('Error updating profile:', err);
      // return res.status(500).json({ error: err.message });
    }
  });

  const Student_Kin = `
  INSERT INTO Student_Kin (
    StdEmail, KinEmail
  ) VALUES (?, ?)
`;

  db.run(Student_Kin, [stdEmail, kinEmail], function (err) { });

});


app.post('/login', (req, res) => {
  const { Name, Email, Password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?  AND  name = ? AND password = ?`, [Email, Name, Password], (err, results) => {
    if (results) {
      res.json({ valid: true });
    } else if (err) {
      console.error(err);
      res.status(500).json({ valid: true });
    }
    else {
      res.json({ valid: false });
    }
  });
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const SubscribeEmail = `
      UPDATE StudentDetails
      SET SubEmail = ?
      WHERE StdEmail = ?
  `;

  db.run(SubscribeEmail, [email, email], function (err) {
    if (err) {
      console.error('Error subscribing:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Subscribed successfully' });
  });
});

app.post('/updateStudentDetails', (req, res) => {
  const { cell, email } = req.body;

  const StudentCellUpdate = `
    UPDATE StudentDetails
    SET Number = ?
    WHERE StdEmail = ?
  `;

  db.run(StudentCellUpdate, [cell, email], function (err) {
    if (err) {
      console.error('Error updating student details:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Student details updated successfully' });
  });
});

app.post('/updatePassword', (req, res) => {
  const { email, npassword } = req.body;

  const updateQuery = `
    UPDATE StudentDetails
    SET StdPassword = ?
    WHERE StdEmail = ?
  `;

  db.run(updateQuery, [npassword, email], function (err) {
    if (err) {
      console.error('Error updating password:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Password updated successfully' });
  });
});

app.get('/admin/students', (req, res) => {
  const query = `
      SELECT StdEmail, ApplicationID, ApplicationType, Gender
      FROM Application
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Failed to fetch students' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/admin/student/:stdEmail', (req, res) => {
  const stdEmail = req.params.stdEmail;

  const query = `
    SELECT a.*, s.SchoolName, s.SchoolAddress, appStatus.ApplicationReceived, appStatus.EvaluationProgress, appStatus.PlacingProcess, appStatus.AcceptedRejected
    FROM Application a
    LEFT JOIN Student_School ss ON a.StdEmail = ss.StdEmail
    LEFT JOIN School s ON ss.SchoolName = s.SchoolName
    LEFT JOIN ApplicationStatus appStatus ON a.StdEmail = appStatus.StdEmail
    WHERE a.StdEmail = ?
  `;

  db.get(query, [stdEmail], (err, row) => {
    if (err) {
      console.error('Error fetching student info:', err);
      res.status(500).json({ error: 'Failed to fetch student info' });
    } else if (!row) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      const studentInfo = {
        ApplicationID: row.ApplicationID,
        ApplicationType: row.ApplicationType,
        StdName: row.StdName,
        StdSurname: row.StdSurname,
        Faculty: row.Faculty,
        Course: row.Course,
        Year: row.Year,
        StdType: row.StdType,
        Gender: row.Gender,
        Race: row.Race,
        Payment: row.Payment,
        StdEmail: row.StdEmail,
        SchoolName: row.SchoolName,
        SchoolAddress: row.SchoolAddress,
        ApplicationSent: row.column1 || 100,
        ApplicationReceived: row.ApplicationReceived,
        EvaluationProgress: row.EvaluationProgress,
        PlacingProcess: row.PlacingProcess,
        AcceptedRejected: row.AcceptedRejected
      };

      res.json(studentInfo);
    }
  });
});




app.get('/api/student-status/:stdEmail', (req, res) => {
  const stdEmail = req.params.stdEmail;
  const query = `SELECT AcceptedRejected, PlacingProcess, EvaluationProgress, ApplicationReceived, ApplicationSent FROM ApplicationStatus WHERE StdEmail = ?`;
  db.query(query, [stdEmail], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving data' });
    } else {
      res.send(results[0]);
    }
  });
});



app.post('/admin/add-residence', (req, res) => {
  const { resName, resLocation, resCost, resCapacity, sharing, faculty, residencetype } = req.body;

  const query = `
INSERT INTO Residence (ResType, ResName,  ResLocation, ResCost, ResCapacity, Sharing, Faculty)
    VALUES (?, ?, ?, ?, ?, ? ,?)
`;

  db.run(query, [residencetype, resName, resLocation, resCost, resCapacity, sharing, faculty], (err) => {
    if (err) {
      console.error('Error adding residence:', err);
      res.status(500).json({ error: 'Failed to add residence' });
    } else {
      res.json({ message: 'Residence added successfully' });
    }
  });

  const ResAssignCapacity = `
INSERT INTO ResAssignCapacity (ResName, ResCapacity)
    VALUES (?, ?)
`;

  db.run(ResAssignCapacity, [resName, resCapacity], (err) => {
    if (err) {
      console.error('Error adding residence:', err);
    } else {
      res.json({ message: 'Residence added successfully' });
    }

  });

});

app.post('/admin/update-progress', (req, res) => {
  const { StdEmail, applicationReceived, evaluationProgress, placingProcess, acceptedRejected } = req.body;

  const query = `
UPDATE ApplicationStatus
    SET ApplicationReceived = ?, EvaluationProgress = ?, PlacingProcess = ?, AcceptedRejected = ?
    WHERE StdEmail = ?
  `;

  db.run(query, [applicationReceived, evaluationProgress, placingProcess, acceptedRejected, StdEmail], (err) => {
    if (err) {
      console.error('Error updating progress:', err);
      res.status(500).json({ error: 'Failed to update progress' });
    } else {
      res.json({ message: 'Progress updated successfully' });
    }
  });
});

app.get('/admin/residences/:faculty', (req, res) => {
  const faculty = req.params.faculty;
  const query = `
    SELECT *
    FROM Residence
    WHERE Faculty = ?
  `;

  db.all(query, faculty, (err, rows) => {
    if (err) {
      console.error('Error fetching residences:', err);
      res.status(500).json({ error: 'Failed to fetch residences' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/admin/assign-residence', (req, res) => {
  const { studentEmail, selectedResidence, SelectedGender } = req.body;

  const query = `
    INSERT INTO Student_Residence (StdEmail, ResName, Gender)
    VALUES (?, ?, ?)
  `;

  db.run(query, [studentEmail, selectedResidence, SelectedGender], function (err) {
    if (err) {
      console.error('Error assigning residence:', err);
      return res.status(500).json({ error: 'Failed to assign residence' });
    }

    const UpdateCapacity = `
      UPDATE ResAssignCapacity SET ResCapacity = ResCapacity - 1 WHERE ResName = ?
    `;

    db.run(UpdateCapacity, [selectedResidence], function (err) {
      if (err) {
        console.error('Error updating capacity:', err);
        return res.status(500).json({ error: 'Failed to update residence capacity' });
      }

      res.json({ message: 'Residence assigned and capacity updated successfully' });
    });
  });
});


app.get('/student-progress/:stdEmail', (req, res) => {
  const stdEmail = req.params.stdEmail;

  const queryApplicationStatus = `
    SELECT ApplicationReceived, EvaluationProgress, PlacingProcess, AcceptedRejected
    FROM ApplicationStatus
    WHERE StdEmail = ?
  `;

  const queryStudentResidence = `
    SELECT StdEmail, ResName
    FROM Student_Residence
    WHERE StdEmail = ?
  `;

  Promise.all([
    new Promise((resolve, reject) => {
      db.get(queryApplicationStatus, [stdEmail], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.get(queryStudentResidence, [stdEmail], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    })
  ])
  .then(([applicationStatusRow, studentResidenceRow]) => {
    if (!applicationStatusRow || !studentResidenceRow) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentProgress = {
      submitted: 100,
      received: applicationStatusRow.ApplicationReceived,
      processing: applicationStatusRow.EvaluationProgress,
      evaluation: applicationStatusRow.EvaluationProgress,
      placing: applicationStatusRow.PlacingProcess,
      finalStatus: applicationStatusRow.AcceptedRejected,
      email: studentResidenceRow.StdEmail,
      Res: studentResidenceRow.ResName,
    };

    res.json(studentProgress);
  })
  .catch(err => {
    console.error('Error fetching student progress:', err);
    res.status(500).json({ error: 'Failed to fetch student progress' });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'HomePage.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'Landingpage.html'));
});

app.get('/tracking', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'TrackingPage.html'));
});

app.get('/resiapply', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'ResiApply.html'));
});

app.get('/AdminVerify', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'AdminLogIn.html'));
});

app.get('/AdminDashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'Administrator.html'));
});

app.get('/applyassist', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'ResiAssist.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'login.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'Aboutpage.html'));
});

app.get('/aboutus', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'About.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'Profile.html'));
});

app.get('/verify', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'index.html'));
});

app.get('/profile/messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'messages.html'));
});

app.get('/profile/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'settings.html'));
});

app.get('/profile/updatedetails', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'updateDetails.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
