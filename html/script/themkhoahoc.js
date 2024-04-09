function addcourse() {
  // Lấy reference đến form HTML
  
  // Xử lý sự kiện submit của form
  const formData = new FormData(); // Tạo đối tượng FormData

  // Lấy giá trị từ các trường input text và thêm vào FormData
  const title = document.getElementById('textNameC').value;
  formData.append('title', title);

  const description = document.getElementById('textDescriptionC').value;
  console.log(description)
  formData.append('description', description);

  const isPublished = document.getElementById('customSwitch1').checked ? 1 : 0;
  console.log(isPublished);

  formData.append('isPublished', isPublished);

  // Lấy giá trị từ trường input file và thêm vào FormData
  const inputFile = document.getElementById('imageC').files[0];
  formData.append('multipartFile', inputFile);

  // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
  fetch('http://localhost:8080/upload/course/add', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
    .then(data => {
      console.log(data); // Log data được trả về từ server
      window.location.href = "./ql_khoahoc.html";
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}