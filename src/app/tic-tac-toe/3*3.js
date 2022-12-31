
/*
圈圈叉叉ＯＯＸＸ：

三成三的方格，
方格 Ｏ與Ｘ與 空白

最多九輪
每一輪皆需改變方格內容
改變內容的下輪 結果與上輪相反

若方格內容符合勝利條件 則判斷符合條件者為Ｏ或Ｘ
若不符合則判斷為平手

勝利條件：共8種
    123     1=2=3 4=5=6 7=8=9 橫
    456     1=4=7 2=5=8 3=6=9 直
    789     1=5=9 3=5=7 斜

需顯示下一輪
*/


let playerO="O"
let playerX="x"

//let round=""

function switchPlayer(round) {
    for ( i = 0 ; i < round ; i++ ) {
        if (round%2==0) {
            console.log("X's turn");
        }else{
            console.log("O's turn");
        }
    }
}

switchPlayer(3)

