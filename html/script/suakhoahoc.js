var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');
const jwt = localStorage.getItem('jwt');
function getcoursebyid(){
  fetch('http://localhost:8081/course/'+data1,{
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
  })
  .then(response => response.json())
  .then(data2 =>{
    data1=data2.data;
    document.getElementById('imageC').src = data1.imageUrl;
    document.getElementById('lblCourseName').value = data1.title;
    document.getElementById('lblCourseDescription').value = data1.description;
    document.getElementById('lblSwitch').checked = data1.isPublished;
    console.log(data1)
  })
  .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
  
}

function updatecourse() {
  const formData = new FormData(); // Tạo đối tượng FormData


  formData.append('id', data1.id);

  const title = document.getElementById('lblCourseName').value;
  formData.append('title', title);

  const description = document.getElementById('lblCourseDescription').value;
  formData.append('description', description);

  const isPublished = document.getElementById('lblSwitch').checked ? 1 : 0;

  formData.append('isPublished', isPublished);

  // Lấy giá trị từ trường input file và thêm vào FormData
  
  const inputFile = document.getElementById('imageD').files[0];
  if(inputFile!=null) formData.append('multipartFile', inputFile);


  fetch('http://localhost:8081/course/update', {
    method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
      },
    
    body: formData
  })
    .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
    .then(data => {
      console.log(data); // Log data được trả về từ server
     // window.location.href = "./ql_khoahoc.html";
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}
    // Gửi yêu cầu PUT/PATCH đến API để cập nhật thông tin khóa học


document.addEventListener('DOMContentLoaded', getcoursebyid);