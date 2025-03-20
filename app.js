const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite');


/*
    테이블 하나 생성

    ? 1. serialize
    * 사용 이유 : 
    * 스키마 변경과 데이터 변경을 혼합하여 처리 할때 필수적
    * 이점 : 
    * 1.1 데이터 무결성 : 동시에 처리 할 때 발생되는 데이터 충돌 방지
    * 1.2 순서 예측 가능 : 순서대로 실행되므로 동작 예측이 쉬움
    * 미사용 시 문제점 :
    * 1.1 데이터베이스 손상 가능성 : 예측되지 않은 결과가 발생 할 수 있음
    * 1.2 예측 불가능 동작 : 순서를 보장하지 않아 예측하기 어려움
    
    ? 2. each
    * 사용 이유 : 
    * SELECT의 쿼리를 한 줄 씩 처리 할때 사용
    * 이점 : 
    * 1.1 메모리 효율성 : 한번에 처리하지 않고 한 줄씩 처리하여 메모리 사용량 줄임
    * 1.2 코드 가독성 : 콜백 함수를 사용하여 처리 로직을 명확하게 표현하기 좋음
    * 미사용 시 문제점 :
    * 1.1 all로 처리 할 수 있으나 모든 결과를 출력하는 문제점. 데이터 양이 많을때는 메모리 문제 발생.
    
    ? 3. close
    * 사용 이유 : 
    * 데이터베이스를 연결 종료하는데 사용. 쓰기 작업이 완료됨을 보장함.
    * 이점 : 
    * 1.1 리소스 관리 : 불필요한 연결을 종료하여 효율적 관리 가능
    * 1.2 데이터 안정성 : 쓰기 작업 완료됨을 보장하여 데이터 손실 방지
    * 미사용 시 문제점 :
    * 1.1 리소스 낭비 : 데이터베이스 연결이 계속 유지되어 낭비가 됨
    * 1.2 데이터베이스 잠금 : 다른 프로그램에서 사용 할 수 없음
    * 1.3 데이터손실 가능성 : 데이터베이스 작업이 완료 되기 전에 종료가 되면 손실 가능성 발생

*/
db.serialize(() => {
    // 테이블 생성 (Create)
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    tickerName TEXT,
    closePrice INTEGER)`);

    const stockList = [
        { name: "APPLE", tickerName: "AAPL", closePrice: 220 },
        { name: "MicroSoft", tickerName: "MSFT", closePrice: 150 },
        { name: "Nvidia", tickerName: "NVDA", closePrice: 300 },
        { name: "Amazon", tickerName: "AMZN", closePrice: 380 },
    ]

    for (let index = 0; index < stockList.length; index++) {
        db.run(`INSERT INTO users (name, tickerName, closePrice) VALUES ("${stockList[index].name}", "${stockList[index].tickerName}", ${stockList[index].closePrice})`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('데이터 추가 성공');
            }
        });

    }
    // 데이터 추가 (Create)

    // 데이터 조회 (Read)
    db.each(`SELECT id, name, tickerName, closePrice FROM users where name = "${stockList[0].name}" `, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(row)
        }
    });

    //   // 데이터 수정 (Update)
    //   db.run(`UPDATE users SET age = 31 WHERE name = 'Alice'`, (err) => {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       console.log('데이터 수정 성공');
    //     }
    //   });

    //   // 데이터 삭제 (Delete)
    //   db.run(`DELETE FROM users WHERE name = 'Alice'`, (err) => {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       console.log('데이터 삭제 성공');
    //     }
    //   });
});

db.close();

