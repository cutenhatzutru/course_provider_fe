var urlParams = new URLSearchParams(window.location.search);
   var data = urlParams.get('data');
   const jwt = localStorage.getItem('jwt');
function getChapter() {
   
   fetch('http://localhost:8080/download/course/getcoursebyid?id='+data,{
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
  })
       .then(response => response.json())
       .then(data => {
           let courseinfo = document.getElementById("courseinfo");
           let course = `<div class="iq-card">
               <div class="iq-card-header d-flex justify-content-between">
                   <div class="iq-header-title">
                       <h4 class="card-title">${data.title}</h4>
                   </div>
               </div>
               <div class="iq-card-body">
                   <form>
                       <div class="form-group">
                           <div class="add-img-user profile-img-edit">
                               <img class="profile-pic img-fluid" src="${data.imageUrl}" alt="profile-pic">
                           </div>
                           <p class="card-text">${data.description}</p>
                       </div>
                   </form>
               </div>
           </div>`;

           courseinfo.innerHTML = course;

           let lstchapter = '';
           let listchapter = document.getElementById('listchapter');
           data.chapters.forEach(element => {
               lstchapter += `<tr>
                               <td contenteditable="true">${element.id}</td>
                               <td contenteditable="true">${element.title}</td>
                               <td contenteditable="true">${element.description}</td>
                               <td>
                                   <span class="table-down">
                                       <a href="ql_baihoc.html?data=${element.id}" class="indigo-text">
                                           <i class="ri-bill-fill" aria-hidden="true"></i>
                                       </a>
                                   </span>
                               </td>
                               <td>
                                   <span class="#">
                                       <a href="suachuong.html?data=${element.id}" class="indigo-text">
                                           <i class="las la-edit" aria-hidden="true"></i>
                                       </a>
                                   </span>
                               </td>
                               <td>
                                   <span class="table-up">
                                       <a href="#!" class="indigo-text">
                                           <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
                                       </a>
                                   </span>
                                   <span class="table-down">
                                       <a href="#!" class="indigo-text">
                                           <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                                       </a>
                                   </span>
                               </td>
                               <td>
                                   <span class="table-remove">
                                       <button onclick="remove(${element.id})" type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button>
                                   </span>
                               </td>
                           </tr>`;
           });

           listchapter.querySelector('tbody').innerHTML = lstchapter;
       })
       .catch(error => {
           console.error('Có lỗi xảy ra:', error);
       });
}


function getID(){
    window.location.href="themchuong.html?data="+data;
}


function remove(data) {
    const url = 'http://localhost:8080/upload/chapter/delete?id=' + data;
  
    fetch(url, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
    })
    .then(response => {
      if (response.ok) {
        getChapter();
    } else {
        console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
  }
document.addEventListener('DOMContentLoaded', getChapter);