function show(){
    window.location.href="themungdung.html";
}
function getApp() {
   
    fetch('http://localhost:8080/tpa/getall')
    .then(response => response.json()) // Chuyển đổi response thành JSON
    .then(data => {
        let html = "";
        let course_conn=document.getElementById('app_con');
        data.forEach(element => {
            html += `<tr>
            <td>${element.appName}</td>
            <td>${element.appAddress}</td>
            <td>${element.email}</td>
            <td>
               <div class="flex align-items-center list-user-action">
                     <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="suaungdung.html?data=${element.id}"><i class="ri-pencil-line"></i></a>
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
    const url = 'http://localhost:8080/tpa/del?id=' + data1;
  
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
       getApp();
    } else {
        console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi:', error);
    });
  }
document.addEventListener('DOMContentLoaded',getApp);

