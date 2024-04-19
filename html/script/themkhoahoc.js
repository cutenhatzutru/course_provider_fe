const jwt = localStorage.getItem('jwt');
function addcourse() {
  // Lấy reference đến form HTML
  
  // Xử lý sự kiện submit của form
  const formData = new FormData(); // Tạo đối tượng FormData

  // Lấy giá trị từ các trường input text và thêm vào FormData
  const title = document.getElementById('textNameC').value;
  formData.append('title', title);

  const description = document.getElementById('textDescriptionC').value;
  formData.append('description', description);

  const isPublished = document.getElementById('customSwitch1').checked ? 1 : 0;
  console.log(isPublished);

  formData.append('isPublished', isPublished);

  const author_id=document.getElementById('app_conn').value;
  formData.append('author_id',author_id);

  // Lấy giá trị từ trường input file và thêm vào FormData
  const inputFile = document.getElementById('imageC').files[0];
  formData.append('multipartFile', inputFile);

  // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
  fetch('http://localhost:8080/upload/course/add', {
    method: 'POST',
    headers:{'Authorization': `Bearer ${jwt}`,},
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


function getAuthor() {

    fetch('http://localhost:8080/authors/getall',{
      headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
      }
    })
    .then(response => response.json()) // Chuyển đổi response thành JSON
    .then(data => {
      console.log(data)
        let html = "";
        let authorSelect=document.getElementById('app_conn');
        data.forEach(element => {
            html += `
            <option value="${element.id}">${element.name}</option>    
            `;
        }
      
      );
       authorSelect.innerHTML+=html;
       
    })
    .catch(error => {
    console.error('Có lỗi xảy ra:', error);
});
}


document.addEventListener('DOMContentLoaded',getAuthor);
