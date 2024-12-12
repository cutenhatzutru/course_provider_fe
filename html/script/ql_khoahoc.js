const jwt = localStorage.getItem('jwt');

function getCourse(id) {
    // if (!jwt) {
    //     alert('Bạn cần đăng nhập để xem khóa học.');
    //     return;
    // }

    fetch('http://localhost:8083/course/provider/' + 1, {
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
        const data = data1.data;
        console.log(data);
        let html = "";
        let course_conn = document.getElementById('course_con');
        const numberFormat = new Intl.NumberFormat('vi-VN'); // Vietnamese locale

        data.forEach(element => {
            console.log(element);
            const imageUrl = element.imageUrl || 'path/to/default-image.jpg';
            const formattedPrice = numberFormat.format(element.price); // Format the price

            html += `<div class="col-sm-3 mb-4">
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${element.title}">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="price">${formattedPrice} VNĐ</p>               
                    <p class="card-text">${element.description}</p>
                    <div class="d-flex justify-content-between">
                        <a href="ql_chuong.html?data=${element.id}" class="btn btn-primary">
                            <i class="fas fa-cogs"></i> Manage
                        </a>
                        <a href="suakhoahoc.html?data=${element.id}" class="btn btn-warning">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <button class="btn btn-danger" onclick="xoakhoahoc(${element.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
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
    const url = 'http://localhost:8083/course/delete/' + id;

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

document.querySelectorAll('.iq-menu a[data-toggle="collapse"]').forEach((element) => {
    element.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        submenu.classList.toggle('collapse'); // Toggle the collapse class
        this.classList.toggle('collapsed'); // Toggle the collapsed class
    });
});