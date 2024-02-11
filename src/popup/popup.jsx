import React from 'react';
import * as ReactDOM from 'react-dom/client';

// 現在の学期を判定する関数
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

const CurrentTerm = getCurrentTerm();
let SubjectData;

// 一回の得点状況を示すマス
function Square(props) {
  return <button className="square"> {props.score} </button>;
}

// 一つの科目と全8回の講義をまとめたもの
function Check_list(props) {
  
  const maxScores = SubjectData[props.subjectKey]['eachLectureInformation'].map(info => info.maxScore);
  const subjectName = SubjectData[props.subjectKey]['subjectName'];

  return (
    <div>
      <div>
        <h1>{subjectName}</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        {maxScores.map((score,index) => (
          <Square key={index} score={score} />
        ))}
      </div>
    </div>
  );
}

// すべての科目をまとめる
function Subjects() {
  const subjectKeys = Object.keys(SubjectData);

  return (
    <>
      {subjectKeys.map((subjectKey) => (
        <div key={subjectKey}>
          <Check_list subjectKey={subjectKey}/>
        </div>
      ))}
    </>
  );
}

// storageからデータを取得する
async function getSubjectData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(CurrentTerm, function(result) {
      if (chrome.runtime.lastError) {

        reject(chrome.runtime.lastError);
      } else {

        // 成功したら返り値として渡す
        resolve(result[CurrentTerm]);
      }
    });
  });
}

// レンダリング処理
async function main() {
  try {

    // storageからデータを取得した後にレンダリングするためawait
    SubjectData = await getSubjectData();

    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);

    root.render(<Subjects />);

  } catch (error) {
    console.error('読み込み失敗:', error);
  }
}

main();