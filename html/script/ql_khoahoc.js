const jwt = localStorage.getItem('jwt');

function getCourse(id) {
    // if (!jwt) {
    //     alert('Bạn cần đăng nhập để xem khóa học.');
    //     return;
    // }

    fetch('http://localhost:8081/course/provider/'+1, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data1 => {
        data = data1.data;
        console.log(data)
        let html = "";
        let course_conn = document.getElementById('course_con');
        data.forEach(element => {
            console.log(element)
            const imageUrl = element.imageUrl || 'path/to/default-image.jpg';
            html += `<div class="col-sm-4 mb-3">
                        <div class="card">
                            <img src="${imageUrl}" class="card-img-top" alt="${element.title}">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">Price : ${element.price} VNĐ</p>
                                <p class="card-text">${element.description}</p>
                                <div class="d-flex justify-content-between">
                                    <a href="ql_chuong.html?data=${element.id}" class="btn btn-primary">Manage</a>
                                    <a href="suakhoahoc.html?data=${element.id}" class="btn btn-warning">Edit</a>
                                    <button class="btn btn-danger" onclick="xoakhoahoc(${element.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                     </div>`;
        });
        course_conn.innerHTML = html;
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
        alert('Không thể tải khóa học. Vui lòng kiểm tra kết nối và thử lại.');
    });
}

function xoakhoahoc(id) {
    const url = 'http://localhost:8081/course/delete/' + id;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
    .then(response => {
        if (response.ok) {
            getCourse();
        } else {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        alert('Không thể xóa khóa học. Vui lòng kiểm tra và thử lại.');
    });
}

document.addEventListener('DOMContentLoaded', getCourse);