var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');

function getappbyid(){
  fetch('http://localhost:8080/authors/getbyid?id='+data1)
  .then(response => response.json())
  .then(data =>{
    document.getElementById('appName').value= data.name;
    document.getElementById('Address').value = data.description;
    document.getElementById('Email').value= data.email;
  })
  .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
  
}


function updateApp() {

    const title = document.getElementById('appName').value;
    const address = document.getElementById('Address').value;
    const email = document.getElementById('Email').value;
    const id=data1;
    const data = {
      "id":id,
      "name":title ,
      "description":address ,
      "email": email
    };
  
    fetch('http://localhost:8080/authors/update', {
      method: 'PUT',
      headers: {
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
  document.addEventListener('DOMContentLoaded', getappbyid);

