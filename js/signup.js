    // modal
    function openSignUpModal() {
        document.getElementById('loginmodal').style.display = 'block';
        document.getElementById('signupModal').style.display = 'none';
    }
    
 // 회원가입 함수
 function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch('https://decalcomanie-dev-yebvymrbqa-du.a.run.app/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            alert('회원가입 성공: ' + data.message);
        })
        .catch((error) => {
            console.error('회원가입 실패:', error);
        });
}

// 로그인 함수
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('https://decalcomanie-dev-yebvymrbqa-du.a.run.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.accessToken;
            localStorage.setItem('token', accessToken); // 로컬 스토리지에 토큰 저장
            console.log(accessToken);
            window.location.href = 'URL_link2.html?token=' + accessToken;
        })
        .catch((error) => {
            console.error('로그인 실패:', error);
        });
}



// 접근하기 버튼 클릭 이벤트
/* document.getElementById('fetchDataButton').addEventListener('click', function() {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    if (!token) {
        alert('로그인이 필요합니다.');
        return;
    }
    console.log(token);

    fetch('http://34.64.213.235:8000/hi', {
        method: 'GET',
        headers: {
            'accessToken': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('요청 중 에러 발생:', error);
        });
}); */
