document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8083/provider/get4course/1') // Thay đổi API để lấy 5 khóa học
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const courseContainer = document.getElementById('course-containernhe');
            courseContainer.innerHTML = ''; // Xóa nội dung cũ

            // Chỉ lấy 5 khóa học
            const coursesToShow = data.data.slice(0, 5);

            coursesToShow.forEach(course => {
                const courseElement = `
                    <tr>
                        <td>${course.title}</td>
                        <td>${course.count}</td>
                    </tr>
                `;
                courseContainer.innerHTML += courseElement; // Thêm khóa học vào bảng
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


function formatNumber(value) {
    return value.toLocaleString('vi-VN');
}

function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function fetchData() {
    fetch('http://localhost:8083/provider/countCourseByProvider/1')
        .then(response => response.json())
        .then(courseData => {
            document.getElementById('courseCount').textContent = formatNumber(courseData.data);
            document.getElementById('courseIncrease').textContent = '10%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching course data:', error));

    fetch('http://localhost:8083/provider/getStudentRegister/1')
        .then(response => response.json())
        .then(studentData => {
            document.getElementById('studentCount').textContent = formatNumber(studentData.data);
            document.getElementById('studentIncrease').textContent = '20%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching student data:', error));

    fetch('http://localhost:8083/provider/getTotalRevenue/1')
        .then(response => response.json())
        .then(revenueData => {
            document.getElementById('revenueCount').textContent = formatCurrency(revenueData.data);
            document.getElementById('revenueIncrease').textContent = '30%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching revenue data:', error));
}

// Gọi hàm fetchData khi trang được tải
document.addEventListener('DOMContentLoaded', fetchData);