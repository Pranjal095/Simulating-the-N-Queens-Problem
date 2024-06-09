const grid=document.getElementById("grid");
const Nstring=prompt("Enter the value of N below: ");
const N=Number(Nstring);
grid.style.paddingBottom=`${0.35+0.225*N}%`;
let colorDeterminer=0;          //0-->black    1--> white
for(let i=0;i<N*N;i++){
    let box=document.createElement("div");
    box.style.width=`${100/N}%`;
    box.style.height=`${100/N}%`;
    box.style.display="inline-block";
    box.classList.add(`box${i}`);
    let queen=document.createElement("img");
    if(!colorDeterminer){
        queen.src="Untitled.png";
        box.style.backgroundColor="black";
        box.style.color="black";
        colorDeterminer=1;
    }else{
        queen.src="Untitled1.png";
        box.style.backgroundColor="white";
        box.style.color="white";
        colorDeterminer=0;
    }
    box.appendChild(queen);
    if(N%2==0) if(i%N==N-1) colorDeterminer=!colorDeterminer; 
    grid.appendChild(box);
}
let chessBoard=[];
for(let i=0;i<N;i++){
    chessBoard[i]=[];
    for(let j=0;j<N;j++){
        chessBoard[i][j]=0;
    }
}
const validPlace=(row,column)=>{
    for(let i=0;i<column;i++){
        if(chessBoard[row][i]) return 0;
    }
    for(let i=1;row-i>=0 && column-i>=0;i++){
        if(chessBoard[row-i][column-i]) return 0;
    }
    for(let i=1;row+i<N && column-i>=0;i++){
        if(chessBoard[row+i][column-i]) return 0;
    }
    return 1;
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const displaySolution = async () => {
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            let selectedBox = document.getElementsByClassName(`box${N * i + j}`)[0];  
            if(chessBoard[i][j]) 
                selectedBox.children[0].style.display = "inline-block";
            else 
                selectedBox.children[0].style.display = "none";
        }
    }
    await sleep(10000); //wait for 5000ms
};
const displayPlace=async()=>{
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            let selectedBox = document.getElementsByClassName(`box${N * i + j}`)[0];  
            if(chessBoard[i][j]) 
                selectedBox.children[0].style.display = "inline-block";
            else 
                selectedBox.children[0].style.display = "none";
        }
    }
    await sleep(100); //wait for 1000ms
};
const NQueening = async (column) => {
    let placed = 0;
    if (column == N) {
        await displaySolution();
        totalWays += 1;  
        console.log(totalWays);
        return;
    }
    for (let r = 0; r < N; r++) {
        chessBoard[r][column] = 1;
        await displayPlace();
        if (validPlace(r, column)) {
            placed = 1;
            await NQueening(column + 1);
        }
        chessBoard[r][column] = 0;
    }
    if (!placed) {
        totalWays += 0;
        return;
    }
};
let totalWays=0;
NQueening(0);
