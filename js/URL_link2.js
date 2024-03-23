function addMessageToChatBox(message, type, isHtml = false) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type + '-message');
    
    const textElement = document.createElement('div');
    textElement.classList.add('text');
    if (isHtml) {
        textElement.innerHTML = message; // HTML로 처리
    } else {
        textElement.textContent = message; // 텍스트로 처리
    }
    
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
};

// 페이지 로딩 시 기본 메시지 추가
window.onload = function() {
    addMessageToChatBox('안녕하세요!', 'assistant');
    addMessageToChatBox('댓글을 보고싶은 웹툰의 URL을 입력해주세요.', 'assistant');
};

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // 토큰을 사용하여 원하는 작업을 수행
    console.log(token);
    
document.getElementById('fetchButton').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value;
    if (!urlInput) {
        alert('URL을 입력해주세요.');
        return;
    }

    //사용자가 입력한 URL을 사용자의 말풍선으로 표시
    addMessageToChatBox(urlInput, 'user');

    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    const apiEndpoint = 'https://decalcomanie-dev-yebvymrbqa-du.a.run.app/chat'; //URL보내주고 OpenAI로 연결 후 답변받는 앤드포인트
    const data = {
        url: urlInput
    };
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            // accessToken값에 로컬스토리지의 token값을 넣고 
            'Content-Type': 'application/json',
            // 토큰 값 전달 
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const feedbackWithLineBreaks = data.feedback.replace(/(?<!^)(\d+\.\s)/g, '\n<br>$1');
        // API 호출 결과 중 "feedback" 키에 해당하는 값만 사용자에게 표시
        addMessageToChatBox(feedbackWithLineBreaks, 'assistant', true);
    })
    .catch(error => {
        console.error('API 호출에 실패했습니다.', error);
        // 에러 메시지를 사용자에게 표시
        addMessageToChatBox('API 호출에 실패했습니다: ' + error, 'user');
    });
});
});
