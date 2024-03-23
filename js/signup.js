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
    
        // API 엔드포인트로 POST 요청 보내기
        //fetch('https://decalcomanie-yebvymrbqa-du.a.run.app/signup', {
        fetch('http://34.64.213.235:8000/signup', {
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
    
        // API 엔드포인트로 POST 요청 보내기
        //   fetch('https://decalcomanie-yebvymrbqa-du.a.run.app/login', {
        fetch('http://34.64.213.235:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(response => response.json()) //수정 코드
            // .then(response => {
            //     return response.json();
            // })
            .then(data => {
                const accessToken = data.accessToken;
                //console.log(accessToken);
                //수정 코드
                if (accessToken) {
                    console.log('로그인 성공! Access Token:', accessToken);
                    // 여기서부터는 access token을 활용하여 필요한 작업을 수행할 수 있습니다.
                } else {
                    console.error('로그인 실패: access token이 없습니다.');
                }
            })
    
            .catch((error) => {
                console.error('로그인 실패:', error);
            });
    }