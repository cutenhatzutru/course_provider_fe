function addApp() {

    const title = document.getElementById('appName').value;
const address = document.getElementById('Address').value;
const email = document.getElementById('Email').value;

    const data = {
      "appName":title ,
      "appAddress":address ,
      "email": email
    };
  
    fetch('http://localhost:8080/tpa/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "./ql_ungdung.html";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  