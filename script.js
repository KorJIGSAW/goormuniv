// API 엔드포인트(URL)
const apiEndpoint = 'http://34.64.213.235:8000/crawl';

// 전달하고자 하는 데이터
const data = {
    url: 'https://comic.naver.com/webtoon/detail?titleId=648419&no=426&week=mon' // 'name' 변수에 입력할 값
};

// API 호출
fetch(apiEndpoint, {
    method: 'POST', // HTTP 메소드를 POST로 설정
    headers: {
        'Content-Type': 'application/json',
        // API 키(authentication) 방식이 필요 없으므로, 여기에 API 키 관련 헤더는 추가하지 않습니다.
    },
    body: JSON.stringify(data) // JavaScript 객체를 JSON 문자열로 변환
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