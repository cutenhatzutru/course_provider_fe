var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');

function getchapterbyid(){
  fetch('http://localhost:8080/download/chapter/getchapterbyid?id='+data1)
  .then(response => response.json())
  .then(data =>{
    
    document.getElementById('chaptername').value = data.title;
    document.getElementById('chapterdescription').value = data.description;
    
  })
  .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
  
}

function updatechapter() {


  // Lấy giá trị từ các trường input text và thêm vào FormData
  const title = document.getElementById('chaptername').value;

  const description = document.getElementById('chapterdescription').value;

  let body_data ={
    "id":data1,
    "title":title,
    "description":description
  }


  // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
  fetch('http://localhost:8080/upload/chapter/update', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
        'charset': 'utf-8'
      },
    body: JSON.stringify(body_data)
  })
    .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
    .then(data => {
      console.log(data)
      window.location.href = "ql_chuong.html?data="+data.course_id;
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}



document.addEventListener('DOMContentLoaded', getchapterbyid);