const jwt = localStorage.getItem('jwt');
function getTPA(status){
   
    fetch('http://localhost:8080/tpa/getbystatus?status='+status,{
        headers: {
          'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
        }
      })
        .then(response => response.json()) // Chuyển đổi response thành JSON
        .then(data => {
            console.log(data)
            let html = "";
            let tpa=document.getElementById('tpa');
            let statusColor;
            if(status == 1) statusColor = '<div class="badge badge-pill badge-success">Valid</div>'
            else if(status == 2 )statusColor = '<div class="badge badge-pill badge-warning">Pending</div>'
            else statusColor = '<div class="badge badge-pill badge-danger">Invalid</div>'
            data.forEach(element => {
                html += `<tr>
                <td>${element.thirdPartyApplication.appName}</td>
                <td>${element.startDate}</td>
                <td>${element.endDate}</td>
                <td>
                   ${statusColor}
                </td>
                <td>${element.course.title}</td>`;
                if(status == 1 || status ==2) html+=`<td>
                  <button onclick="sendtoken(${element.id})" type="button" class="btn mb-3 btn-primary"><i class="ri-mail-send-line"></i></button>
                  
                </td>`

                html += `<td>
                  <span class="table-remove"><button onclick="remove()" type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">X</button></span>
                </td>
             </tr>`;
            });
            tpa.innerHTML=html;
        })
        .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
      
}

function sendtoken(id){
    fetch('http://localhost:8080/tpa/sendtoken?id='+id,{
        headers: {
          'Authorization': `Bearer ${jwt}` 
        }
      })
    .then(response => {
        if(response.status == 200){
            alert("SENDED TOKEN")
        }
    })
    .catch(error => {
      console.error('Error:', error); // Log lỗi nếu có
    });
}


document.addEventListener('DOMContentLoaded', ()=>{getTPA(1)});