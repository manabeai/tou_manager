
// 履修科目の辞書を作成する関数 key=ID value=科目名
function createSubjectDict() {
  var elements = Array.from(document.getElementsByClassName('progressCircle'));
  var subjects = elements.filter(element => element.textContent.trim() === '1');
  var subjectDict = {};

  subjects.forEach((subject) => {
    const urlParts = subject.href.split('/');
    const subject_ID = urlParts[5];
    const subject_name = subject.parentElement.parentElement.parentElement.querySelector('.progressPage__progressTitle').textContent;
    subjectDict[subject_ID] = subject_name;
  });
  
  console.log('subjectDict作成');
  return subjectDict;
}

function extractNumberFromString(str) {
  const numberPattern = /\d+/;
  const numberMatch = str.match(numberPattern);
  if (numberMatch) {
    return parseInt(numberMatch[0], 10);
  }
  return null;
}

const urlPattern = /https:\/\/room\.internet\.ac\.jp\/#\/courses\/\d+\/sections\/\d+\/lectures\/\d+\/quiz\/result/;
const resultPage = /https:\/\/room\.internet\.ac\.jp\/#\/courses\/(\d+)\/sections\/\d+\/lectures\/\d+\/quiz\/result/;

// progress画面を開いた際に科目名とIDを取得する
window.onpopstate = function(event) {
  if (window.location.href === 'https://room.internet.ac.jp/#/progress') {

      // loadが完了しても完全に表示されないので5秒ほど待つ
      setTimeout(function() {
        const subjectDict = createSubjectDict();
        console.log(subjectDict);

        // 講義情報の初期化はbackgroundにわたす
        chrome.runtime.sendMessage({message: 'open_progress', subjectDict: subjectDict}, 
          function(response) {
            if (response && response.message === 'initialized_score') {
              alert('得点状況を初期化しました')
            }
          }
        );
      }, 7000);
    
    // 結果画面が出た時に得点、回数、科目IDを取得
    } else if (urlPattern.test(window.location.href)){

      setTimeout(function() {

      console.log('得点を更新します');
      const currentURL = window.location.href
      const subject_ID = resultPage.exec(currentURL)[1];
      
      // 回を取得
      const titleElement = document.querySelector('.tou-title');
      const titleText = titleElement.textContent;
      const currentSession = extractNumberFromString(titleText);
      console.log(currentSession);
      
      // 得点を取得
      const correctPointElement = document.querySelector('.correct-num span');
      const correctPointText = correctPointElement.textContent;
      const correctPoint = parseInt(correctPointText, 10);
      console.log(correctPoint); 
      
      // 最大得点の更新はバックグラウンドに渡す
      chrome.runtime.sendMessage({
        message: 'finished_quiz',
        currentSession: currentSession,
        correctPoint: correctPoint,
        subject_ID: subject_ID
      },
      
      function(response) {
        if (response) {
          alert('得点状況を更新しました');
        }
      });
    }, 5000);
  }
};

