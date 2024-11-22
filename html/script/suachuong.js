var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');
const jwt = localStorage.getItem('jwt');
function getchapterbyid(){
  fetch('http://localhost:8081/chapter/'+data1,{
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
  })
  .then(response => response.json())
  .then(data1 =>{
    document.getElementById('chaptername').value = data1.data.title;
    document.getElementById('chapterdescription').value = data1.data.description;
    
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
  fetch('http://localhost:8081/chapter/update', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
        'charset': 'utf-8',
          'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
        
      },
    body: JSON.stringify(body_data)
  })
    .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
    .then(data2 => {
      data1=data2.data;
  
     // window.location.href = "ql_chuong.html?data="+data1.course_id;
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}



document.addEventListener('DOMContentLoaded', getchapterbyid);