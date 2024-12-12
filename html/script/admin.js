document.addEventListener('DOMContentLoaded', function() {
    // Lấy 5 khóa học từ API
    fetch('http://localhost:8081/provider/get4course/1')
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
                        <td>${course.name}</td>
                        <td>${course.count}</td>
                    </tr>
                `;
                courseContainer.innerHTML += courseElement; // Thêm khóa học vào bảng
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Gọi hàm fetchData để lấy thống kê
    fetchData();
});

function formatNumber(value) {
    return value.toLocaleString('vi-VN');
}

function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function fetchData() {
    // Lấy tổng số khóa học
    fetch('http://localhost:8081/admin/getNumberCourse')
        .then(response => response.json())
        .then(courseData => {
            console.log(courseData)
            document.getElementById('totalCourses').textContent = formatNumber(courseData.data);
            document.getElementById('courseIncrease').textContent = '10%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching course data:', error));

    // Lấy tổng số người đăng ký
    fetch('http://localhost:8081/admin/getNumberEnroll')
        .then(response => response.json())
        .then(studentData => {
            document.getElementById('totalRegistrations').textContent = formatNumber(studentData.data);
            document.getElementById('studentIncrease').textContent = '20%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching student data:', error));

    // Lấy tổng số nhà cung cấp
    fetch('http://localhost:8081/admin/getNumberProvider')
        .then(response => response.json())
        .then(providerData => {
            document.getElementById('totalProviders').textContent = formatNumber(providerData.data);
        })
        .catch(error => console.error('Error fetching provider data:', error));

        fetch('http://localhost:8081/admin/getNumberLearner')
        .then(response => response.json())
        .then(learnerData => {
            document.getElementById('totalLearners').textContent = formatNumber(learnerData.data);
            document.getElementById('courseIncrease').textContent = '10%'; // Thay thế bằng giá trị thực tế
        })
        .catch(error => console.error('Error fetching course data:', error));
    // Lấy top 5 người học
    fetch('http://localhost:8081/admin/getTopLearners')
        .then(response => response.json())
        .then(learnerData => {
            const topLearnersList = document.getElementById('topLearnersList');
            topLearnersList.innerHTML = ''; // Xóa nội dung cũ

            learnerData.data.forEach(learner => {
                const learnerElement = `
                    <tr>
                        <td>${learner.name}</td>
                        <td>${learner.course_count}</td>
                    </tr>
                `;
                topLearnersList.insertAdjacentHTML('beforeend', learnerElement);
            });
        })
        .catch(error => console.error('Error fetching top learners:', error));

    // Lấy top 5 nhà cung cấp
    fetch('http://localhost:8081/admin/getTopProviders')
        .then(response => response.json())
        .then(providerData => {
            const topProvidersList = document.getElementById('topProvidersList');
            topProvidersList.innerHTML = ''; // Xóa nội dung cũ

            providerData.data.forEach(provider => {
                const providerElement = `
                    <tr>
                        <td>${provider.name}</td>
                        <td>${provider.course_count}</td>
                    </tr>
                `;
                topProvidersList.insertAdjacentHTML('beforeend', providerElement);
            });
        })
        .catch(error => console.error('Error fetching top providers:', error));
}