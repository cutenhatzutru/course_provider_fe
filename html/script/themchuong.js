var urlParams = new URLSearchParams(window.location.search);
   var data1 = urlParams.get('data');

function addchapter() {

    console.log(data)
    
    // Xử lý sự kiện submit của form
    const formData = new FormData(); // Tạo đối tượng FormData
  
    // Lấy giá trị từ các trường input text và thêm vào FormData
    const title = document.getElementById('chapterName').value;
    formData.append('title', title);
  
    const description = document.getElementById('descriptionC').value;
    formData.append('description', description);
  
   formData.append('course_id',data1);
  
   
    // Gửi request POST đến URL 'http://localhost:8080/upload/course/add' với body là formData
    fetch('http://localhost:8080/upload/chapter/addtocourse', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json()) // Chuyển đổi response sang định dạng JSON
      .then(data => {
        window.location.href="ql_chuong.html?data="+data1; // Log data được trả về từ server
      })
      .catch(error => {
        console.error('Error:', error); // Log lỗi nếu có
      });
  }