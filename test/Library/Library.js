// 現在の学期を判定する関数
function getCurrentTerm(year, month, day) {
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


// テスト
const year = 2023;
const month = 1;
const day = 1;

console.log(getCurrentTerm(year, month, day));

// テスト
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // 月は0から始まるため、+1する
const currentDay = today.getDate();

console.log(getCurrentTerm(currentYear, currentMonth, currentDay));



module.exports = getCurrentTerm;