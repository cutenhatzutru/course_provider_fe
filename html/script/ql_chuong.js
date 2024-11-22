var urlParams = new URLSearchParams(window.location.search);
var data = urlParams.get('data');
const jwt = localStorage.getItem('jwt');

function getChapter() {
    if (!data) {
        console.error('Không tìm thấy dữ liệu trong URL!');
        return;
    }

    fetch('http://localhost:8081/chapter/getchapterbycourse/' + data, {
        headers: {
            'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data1 => {
        data = data1.data;
        console.log(data);

        let courseinfo = document.getElementById("courseinfo");
        if (!courseinfo) {
            console.error('Không tìm thấy phần tử HTML với ID "courseinfo"!');
            return;
        }

        // let course = `<div class="iq-card">
        //     <div class="iq-card-header d-flex justify-content-between">
        //         <div class="iq-header-title">
        //             <h4 class="card-title">${data.title}</h4>
        //         </div>
        //     </div>
        //     <div class="iq-card-body">
        //         <form>
        //             <div class="form-group">
        //                 <div class="add-img-user profile-img-edit">
        //                     <img class="profile-pic img-fluid" src="${data.imageUrl}" alt="profile-pic">
        //                 </div>
        //                 <p class="card-text">${data.description}</p>
        //             </div>
        //         </form>
        //     </div>
        // </div>`;

        // courseinfo.innerHTML = course;

        let listchapter = document.getElementById('listchapter');
        if (!listchapter) {
            console.error('Không tìm thấy phần tử HTML với ID "listchapter"!');
            return;
        }

        let lstchapter = '';
        data.forEach(element => {
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

function getID() {
    window.location.href = "themchuong.html?data=" + data;
}

function remove(data) {
    const url = 'http://localhost:8081/chapter/getchapterbycourse/' + data;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}` // Thêm JWT vào header Authorization
        }
    })
    .then(response => {
        if (response.ok) {
            getChapter(); // Gọi lại để làm mới danh sách chương
        } else {
            console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
        }
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
    });
}

document.addEventListener('DOMContentLoaded', getChapter);