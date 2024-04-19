const jwt = localStorage.getItem('jwt');
function getApp() {

    fetch('http://localhost:8080/tpa/getall',{
      headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
      }
    })
    .then(response => response.json()) // Chuyển đổi response thành JSON
    .then(data => {
      console.log(data)
        let html = "";
        let appSelect=document.getElementById('app');
        data.forEach(element => {
            html += `
            <option value="${element.id}">${element.appName}</option>    
            `;
        }
      
      );
       appSelect.innerHTML+=html;
       
    })
    .catch(error => {
    console.error('Có lỗi xảy ra:', error);
});
}


function getCourse() {

    fetch('http://localhost:8080/download/course/getallcourse',{
      headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
      }
    })
    .then(response => response.json()) // Chuyển đổi response thành JSON
    .then(data => {
      console.log(data)
        let html = "";
        let courseSelect=document.getElementById('course');
        data.forEach(element => {
            html += `
            <option value="${element.id}">${element.title}</option>    
            `;
        }
      
      );
       courseSelect.innerHTML+=html;
       
    })
    .catch(error => {
    console.error('Có lỗi xảy ra:', error);
});
}

function getData(){
    getApp();
    getCourse();
}


function addlienket() {

    const tpa_id = document.getElementById('app').value;
  
    const course_id = document .getElementById('course').value;

    const start_date = document.getElementById("startdate").value;

    const end_date = document.getElementById("enddate").value;

    const body = {
      "tpa_id":tpa_id,
      "course_id":course_id,
      "start_date": start_date,
      "end_date": end_date
    }


    // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
    fetch('http://localhost:8080/tpa/addtpacourse', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json', 
          'charset': 'utf-8'
        },
      body: JSON.stringify(body)
    })
      .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
      .then(data => {
        console.log(data); // Log data được trả về từ server
        window.location.href = "./ql_lienket.html";
      })
      .catch(error => {
        console.error('Error:', error); // Log lỗi nếu có
      });
  }

document.addEventListener('DOMContentLoaded',getData);