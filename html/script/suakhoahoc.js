var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');

function getcoursebyid(){
  fetch('http://localhost:8080/download/course/getcoursebyid?id='+data1)
  .then(response => response.json())
  .then(data =>{
    document.getElementById('imageC').src = data.imageUrl;
    document.getElementById('lblCourseName').value = data.title;
    document.getElementById('lblCourseDescription').value = data.description;
    document.getElementById('lblSwitch').checked = data.isPublished;
    console.log(data)
  })
  .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
  
}

function updatecourse() {
  // Lấy reference đến form HTML
  
  // Xử lý sự kiện submit của form
  const formData = new FormData(); // Tạo đối tượng FormData


  formData.append('id', data1);

  // Lấy giá trị từ các trường input text và thêm vào FormData
  const title = document.getElementById('lblCourseName').value;
  formData.append('title', title);

  const description = document.getElementById('lblCourseDescription').value;
  console.log(description)
  formData.append('description', description);

  const isPublished = document.getElementById('lblSwitch').checked ? 1 : 0;
  console.log(isPublished);

  formData.append('isPublished', isPublished);

  // Lấy giá trị từ trường input file và thêm vào FormData
  const inputFile = document.getElementById('imageD').files[0];
  formData.append('multipartFile', inputFile);

  // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
  fetch('http://localhost:8080/upload/course/update', {
    method: 'PUT',
    body: formData
  })
    .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
    .then(data => {
      console.log(data); // Log data được trả về từ server
      //window.location.href = "./ql_khoahoc.html";
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}
    // Gửi yêu cầu PUT/PATCH đến API để cập nhật thông tin khóa học


document.addEventListener('DOMContentLoaded', getcoursebyid);