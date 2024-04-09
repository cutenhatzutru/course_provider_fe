var urlParams = new URLSearchParams(window.location.search);
var data = urlParams.get('data');
function getCourse(){
   
    fetch('http://localhost:8080/download/course/getallcourse')
        .then(response => response.json()) // Chuyển đổi response thành JSON
        .then(data => {
            let html = "";
            let course_conn=document.getElementById('course_con');
            data.forEach(element => {
                html += `<div class="col-sm-4">
                <div class="card iq-mb-3">
                   <img src="${element.imageUrl}" class="card-img-top" alt="#">
                   <div class="card-body">
                      <h4 id="txtCourseName" class="card-title">${element.title}</h4>
                      <p class="card-text">${element.description}</p>
                        <div class="card-body">
                         <button id="btnManageCourse" class="btn btnFullscreen"><i class="ri-bill-fill"></i><a href="ql_chuong.html?data=${element.id}" class="card-link">Manage</a></button>
                         <button id="btnEditCourse" class="btn btnFullscreen"><i class="las la-edit" ></i><a href="suakhoahoc.html?data=${element.id}" class="card-link">Edit</a></button>
                         <button id="btnDeleteCourse" class="btn btnFullscreen" onclick="xoakhoahoc(${element.id})"><i class="fa fa-trash"></i>Delete</button>
                      </div>
                   </div>
                </div>
             </div>`;
            });
            course_conn.innerHTML=html;
        })
        .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
      
}
function xoakhoahoc(id){
    const url = 'http://localhost:8080/upload/course/delete?id=' + id;
  
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        getCourse();
    } else {
        console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
      
}



document.addEventListener('DOMContentLoaded',getCourse);

