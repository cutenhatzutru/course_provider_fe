const jwt = localStorage.getItem('jwt');

function addAuthor() {

const title = document.getElementById('appName').value;
const address = document.getElementById('Address').value;
const email = document.getElementById('Email').value;

    const data = {
      "name":title ,
      "description":address ,
      "email": email
    };
  
    fetch('http://localhost:8080/authors/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "./ql_docgia.html";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  