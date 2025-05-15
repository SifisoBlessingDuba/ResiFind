function getStudentProgress() {
  const stdEmail = document.getElementById('studentNumber').value;

  if (!stdEmail) {
    alert('Please enter a student number');
    return;
  }

  fetch(`/student-progress/${stdEmail}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch student progress');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('submitted-percentage').textContent = `${data.submitted}%`;
      document.getElementById('received-percentage').textContent = `${data.received}%`;
      document.getElementById('processing-percentage').textContent = `${data.processing}%`;
      document.getElementById('evaluation-percentage').textContent = `${data.evaluation}%`;
      document.getElementById('placing-percentage').textContent = `${data.placing}%`;
      document.getElementById('final-status-percentage').textContent = `${data.finalStatus}%`;
      console.log( `${data.submitted}%, ${data.received}, ${data.processing}, ${data.evaluation}, ${data.placing}, ${data.finalStatus}`)
    })
    .catch(error => console.error('Error fetching student progress:', error));
}