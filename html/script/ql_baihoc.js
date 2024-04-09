var urlParams = new URLSearchParams(window.location.search);
var chapter_id = urlParams.get('data');

function getLesson() {
   var urlParams = new URLSearchParams(window.location.search);
   var data = urlParams.get('data');
   console.log(data);
 
   fetch('http://localhost:8080/download/chapter/getchapterbyid?id='+ data)
     .then(response => response.json())
     .then(data => {
       let chapterinfo = document.getElementById("chapterinfo");
       let chapter = `<div class="iq-card">
         <div class="iq-card-header d-flex justify-content-between">
           <div class="iq-header-title">
             <h4 class="card-title">${data.title}</h4>
           </div>
         </div>
         <div class="iq-card-body">
           <form>
             <div class="form-group">
               <p>${data.description}</p>
             </div>
           </form>
         </div>
       </div>`;
       chapterinfo.innerHTML = chapter;
 
       let lstlesson = '';
       let listlesson = document.getElementById('listlesson');
       data.lessons.forEach(element => {
         lstlesson += `<tr>
           <td contenteditable="true">${element.id}</td>
           <td contenteditable="true">${element.title}</td>
           <td contenteditable="true">${element.description}</td>
           <td>
             <span class="table-down"><a href="ql_baihoc.html" class="indigo-text"><i class="ri-bill-fill" aria-hidden="true"></i></a></span>
           </td>
           <td>
             <span class="#"><a href="suachuong.html" class="indigo-text"><i class="las la-edit" aria-hidden="true"></i></a></span>
           </td>
           <td>
             <span class="table-up"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a></span>
             <span class="table-down"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></a></span>
           </td>
           <td>
             <span class="table-remove"><button onclick="removelesson(${element.id})" type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
           </td>
         </tr>`;
       });
 
       listlesson.querySelector('tbody').innerHTML = lstlesson;
     })
     .catch(error => {
       console.error('Có lỗi xảy ra:', error);
     });
 }
 
 function removelesson(data){
  const url = 'http://localhost:8080/upload/lesson/delete' + data;
  
  fetch(url, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      getLesson();
  } else {
      console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
    }
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi:', error);
  });

 }


let addnewlesson = ()=>{
  window.location.href = "thembaihoc.html?data="+chapter_id;
}

 document.addEventListener('DOMContentLoaded', getLesson);