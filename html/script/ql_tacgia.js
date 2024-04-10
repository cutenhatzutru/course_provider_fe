function show(){
    window.location.href="themtacgia.html";
}
function getAuthor() {
   
    fetch('http://localhost:8080/authors/getall')
    .then(response => response.json()) // Chuyển đổi response thành JSON
    .then(data => {
        let html = "";
        let course_conn=document.getElementById('app_con');
        data.forEach(element => {
            html += `<tr>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.email}</td>
            <td>
               <div class="flex align-items-center list-user-action">
                     <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="suatacgia.html?data=${element.id}"><i class="ri-pencil-line"></i></a>
                  <a onclick="remove(${element.id})" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" ><i class="ri-delete-bin-line"></i></a>
               </div>
            </td>
         </tr>`;
        });
        app_conn.innerHTML=html;
    })
    .catch(error => {
    console.error('Có lỗi xảy ra:', error);
});
}

function remove(data1) {
    const url = 'http://localhost:8080/authors/delete?id=' + data1;
  
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
       getAuthor();
    } else {
        console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
  }
document.addEventListener('DOMContentLoaded',getAuthor);

