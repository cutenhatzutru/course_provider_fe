var urlParams = new URLSearchParams(window.location.search);
var chapter_id = urlParams.get('data');
let preview_btn = 1;
const jwt = localStorage.getItem('jwt');

function getLesson() {
   var urlParams = new URLSearchParams(window.location.search);
   var data = urlParams.get('data');
   console.log(data);
 
   fetch('http://localhost:8080/download/chapter/getchapterbyid?id='+ data,{
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
  })
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
           <span class="#"><button onclick="previewLesson(${element.id})" type="button" class="btn btn-outline-primary">Preview</button></span>
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
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
    }
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

function previewLesson(id){
  let frame = document.getElementById("previewframe")
  if(preview_btn === 1){
    fetch("http://localhost:8080/download/lesson/getlessonbyid?id="+id,{
      headers: {
        'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
      }
    })
    .then(response => response.json())
    .then(data =>{
      frame.style.display = "block"
      
      document.getElementById("lessonName").innerText = data.title;
      if(data.videoUrl!=null){
        document.getElementById("videoContainer").innerHTML = `<iframe class="embed-responsive-item" src="${data.videoUrl}" allowfullscreen=""></iframe>`
      }
      document.getElementById("lessonContent").innerText = data.content
    })
    preview_btn = 0 ;
  }
  else{
    frame.style.setProperty('display', 'none', 'important');
    document.getElementById("videoContainer").innerHTML = "";
    preview_btn = 1;
  }

  console.log(preview_btn)

}

 document.addEventListener('DOMContentLoaded', getLesson);