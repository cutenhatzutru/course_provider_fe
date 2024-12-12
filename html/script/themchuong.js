var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');
const jwt = localStorage.getItem('jwt');

// Hàm để lấy thông tin khóa học
function getCourse(courseId) {
    return fetch("http://localhost:8083/course/" + 1, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể lấy thông tin khóa học.');
            }
            return response.json();
        })
        .then(data => {
            return data.data; // Giả sử dữ liệu trả về nằm trong trường `data`
        })
        .catch(error => {
            console.error('Lỗi khi lấy khóa học:', error);
            alert('Không thể lấy thông tin khóa học.');
            throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
        });
}

function addchapter() {
    const formData = new FormData();

    const title = document.getElementById('chapterName').value;
    const description = document.getElementById('descriptionC').value;
    const position = document.getElementById('position').value;

    // Kiểm tra các trường đầu vào
    if (!title || !description || !position) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Lấy thông tin khóa học trước khi thêm chương
    getCourse(1) // Gọi hàm để lấy khóa học có ID = 1
        .then(course => {
            // Nếu khóa học tồn tại, thêm thông tin vào formData
            data = {
                "title": title,
                "description": description,
                "position": position,
                "course_id": course.id
            };

            console.log(data)
            return fetch('http://localhost:8083/chapter/addtocourse', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data1 => {
            console.log(data1.data); // Log data được trả về từ server
            window.location.href = "./ql_chuong.html?data=1";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi: ' + error.message); // Hiển thị thông báo lỗi
        });
}

// Gọi hàm addchapter khi cần