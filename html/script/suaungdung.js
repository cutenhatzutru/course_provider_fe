var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');
const jwt = localStorage.getItem('jwt');
function getappbyid(){
  fetch('http://localhost:8080/tpa/getbyid?id='+data1,{
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
  })
  .then(response => response.json())
  .then(data =>{
    document.getElementById('appName').value= data.appName;
    document.getElementById('Address').value = data.appAddress;
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
      "appName":title ,
      "appAddress":address ,
      "email": email
    };
  
    fetch('http://localhost:8080/tpa/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`,
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
  document.addEventListener('DOMContentLoaded', getappbyid);

