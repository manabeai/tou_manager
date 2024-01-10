// 現在の学期を判定する関数
// #日付部分は変更しやすくしたい
function getCurrentTerm(year = new Date().getFullYear(), month = new Date().getMonth() + 1, day = new Date().getDate()) {
  const currentDate = new Date(year, month - 1, day);

  const startOf1stTerm = new Date(year, 3, 1);
  const endOf1stTerm = new Date(year, 5, 20);

  const startOf2ndTerm = new Date(year, 5, 21);
  const endOf2ndTerm = new Date(year, 8, 19);

  const startOf3rdTerm = new Date(year, 8, 20);
  const endOf3rdTerm = new Date(year, 11, 12);

  const startOf4thTerm = new Date(year, 11, 13);
  const endOf4thTerm = new Date(year, 11, 31);

  const startOfNextYear = new Date(year, 0, 1);
  const endOfMarch = new Date(year, 2, 31);

  if (currentDate >= startOf1stTerm && currentDate <= endOf1stTerm) {
    return `${year}_term1`;
  } else if (currentDate >= startOf2ndTerm && currentDate <= endOf2ndTerm) {
    return `${year}_term2`;
  } else if (currentDate >= startOf3rdTerm && currentDate <= endOf3rdTerm) {
    return `${year}_term3`;
  } else if (currentDate >= startOf4thTerm && currentDate <= endOf4thTerm) {
    return `${year}_term4`;
  } else if (currentDate >= startOfNextYear && currentDate <= endOfMarch) {
    return `${year-1}_term4`;
  }
}

// IDをkeyとして初期化
function generateInitialJSON(inputDict) {
  const outputJSON = {};

  
  for (const [id, subject] of Object.entries(inputDict)) {
    const entry = {
      "subjectName": subject,
      "totalTimes": 8,
      "eachLectureInformation": []
    };

    // 8回の講義情報を追加
    for (let i = 1; i <= entry.totalTimes; i++) {
      const lectureInfo = {
        "session": i,
        "maxScore": 0,
        "attendanceCount": 0,
        "examTaken": false
      };
      entry["eachLectureInformation"].push(lectureInfo);
    }

    // 生成したエントリをoutputJSONに追加
    outputJSON[id] = entry;
  }

  return outputJSON;
}

const current_term = getCurrentTerm();

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.message === 'open_progress') {
      console.log('contentがprogressを開いた');

      // もしまだ取得してない学期だったら取得してもらう
      chrome.storage.local.get(current_term,function(data) {
        if (data[current_term] === undefined) {

          let subject_JSON = generateInitialJSON(request.subjectDict);
          console.log(JSON.stringify(subject_JSON, null, 2));

          // chrome.storageに保存する
          chrome.storage.local.set({[current_term]: subject_JSON}, function() {
            console.log('提出状況を初期化して保存した');
          });

        } else {
          console.log('キーがあるからなにもしない');
        }
      });
    
    // 最新の得点を受け取って最高得点と比較し更新
    } else if (request.message === 'finished_quiz') {
      const currentSession = request.currentSession;
      const correctPoint = request.correctPoint;
      const subject_ID = request.subject_ID;

      chrome.storage.local.get(current_term,function(data) {
        const subjectData = data[current_term][subject_ID];
        const sessionData = subjectData['eachLectureInformation'].find(session => session.session === currentSession);

        sessionData['maxScore'] = Math.max(sessionData['maxScore'] || 0, correctPoint);

        chrome.storage.local.set({[current_term]: data[current_term]}, function() {
          console.log('第' + currentSession + '回。最大得点を' + sessionData['maxScore'] + 'に');
      });
    });
  }
});