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
}

// 페이지 로딩 시 기본 메시지 추가
window.onload = function () {
    addMessageToChatBox('안녕하세요!', 'assistant');
    addMessageToChatBox('댓글을 보고싶은 웹툰의 URL을 입력해주세요.', 'assistant');
};
    // 버튼 요소를 찾고, 클릭 이벤트 리스너를 추가합니다.
    /*document.getElementById('fetchButton').addEventListener('click', function () {
        const urlInput = document.getElementById('urlInput').value;
        if (!urlInput) {
            alert('URL을 입력해주세요.');
            return;
        }
        // 이제 필요한 작업을 수행할 수 있습니다.
    });*/

    //사용자가 입력한 URL을 사용자의 말풍선으로 표시
    addMessageToChatBox(urlInput, 'user');

    const apiEndpoint = 'https://decalcomanie-yebvymrbqa-du.a.run.app/chat';
    const data = {
        url: urlInput
    };
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            return response.json();
        })
        // .then(data => {
        //     console.log(data);
        //     // API 호출 결과를 사용자에게 표시
        //     addMessageToChatBox(JSON.stringify(data, null, 2), 'assistant');
        // })
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