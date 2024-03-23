// API 엔드포인트(URL)
const apiEndpoint = 'http://34.64.213.235:8000/hi'; // URL 형식 오류 수정

// API 호출
fetch(apiEndpoint, {
    method: 'GET', // HTTP 메소드를 GET으로 설정
    headers: {
        'Content-Type': 'application/json',
        // GET 요청에서는 body를 보낼 수 없으므로, Content-Type 헤더도 필요하지 않을 수 있습니다.
        // 하지만 서버가 이를 요구한다면 그대로 둡니다.
    },
    // body 속성은 GET 요청에서 사용할 수 없으므로 제거합니다.
})
.then(response => {
    if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    return response.json(); // 응답을 JSON 형태로 변환
})
.then(data => {
    console.log(data); // 콘솔에 데이터 출력
    // 응답 데이터를 활용하는 코드를 여기에 작성합니다.
})
.catch(error => console.error('API 호출에 실패했습니다.', error));
