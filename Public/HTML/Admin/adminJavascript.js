document.getElementById('status-form').addEventListener('submit',function(event){
   event.preventDefault();

   const applicationId = document.getElementById('application-id').value;
   const status = document.getElementById('status').value;
   const report = document.getElementById('report').value;

   fetch('/update-status', {
    method: 'post', headers: {
        'content-Type': 'application/json',
    },
    body: JSON.stringify({
        applicationId, status, report
    })
   })
   .then(tesponse =>Response.json())
   .then(data=>{
    if(data.success){
    alert('status updated successfuly!');
   } else{
    alert('Failed to update status.');
     }
   })
   .catch(error =>{
   console.error('Error:',error);

   });
   
});

document.getElementById('login-form').addEventListener('submit',function(event){
    event.preventDefault();
    
    const username= document.getElementById('username').value;
    const password= document.getElementById('password').value;

    fetch('http://localhost:300/ligin',{
        method: 'POST', headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({username,password})
    })
    .then(response=> response.text())
    .then(data =>{
        if(data==='Loggen in successfully'){
            alert('Login successful!');
            window.localStorage.href='adminPage.html';
        }
        else{
            alert('Login failed');
        }
    })
    .catch(error=> console.error('Error:',error));
});



