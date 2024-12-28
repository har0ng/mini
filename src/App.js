//Component (리엑트에서 활용하는 js이며, 리엑트는 js에서 html을 만들어냄.)
import { Component, useState  } from "react"; //리엑트에 있는 component 사용 선언
import "./App.css"; //css import 하는 방법
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import { BiFontSize } from "react-icons/bi";

const App = () => { //파일명을 class 이름으로 함
  /*
  props(): 컴포넌트간 데이터 전달 코드
  */
  // initialExpense = [ //컴포넌트 데이터 넘기는 코드
  
  // ]
  // constructor(props){ //생성자
  //   super(props);
  //   this.state = {
  //     expense : [
  //       {id:1, charge:"렌트비", amount:1600},
  //       {id:2, charge:"교통비", amount:400},
  //       {id:3, charge:"식비"  , amount:1200}
  //     ]
  //   }
  // }
  //항목
  const [charge,setcharge] = useState("");
  //비용
  const [amount,setAmount] = useState(0);
  //지출리스트
  const [expense,setExpenses] = useState([]);
  //알림
  const [alert,setAlert] = useState({show:false});
  //수정할 항목
  const [id,setId] = useState('');
  //수정상태
  const [edit,setEdit] = useState(false);

  const handleCharge = (e) => {
    setcharge(e.target.value);
    console.log(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
    console.log(e.target.valueAsNumber);
  }

  const handleDelete = (id) =>{
    const newExpense = expense.filter(expense => expense.id != id);
    console.log(newExpense);
    setExpenses(newExpense); 
    handleAlert({type:"delete",text:"항목을 삭제했습니다."});
    // this.setState({expense:newExpense});
    /*React State : 리엑트에서 데이터가 변할 때 화면을 다시 렌더링 해줌 */     
  }

  const handleSubmit = (e) =>{ 
     e.preventDefault();
    if(charge !== "" && amount >= 0){ 
      if(edit){
        //수정
        const newExpenses = expense.map (item =>{
        return item.id === id ? {...item,charge,amount} :item
      })
      setExpenses(newExpenses);
      setEdit(false);
      setAmount(0);
      setcharge("");
      handleAlert({type:"success",text:"수정되었습니다."});
      }else{
        //추가
        const newExpense = {id:crypto.randomUUID(),charge,amount};
        const newExpenses = [...expense,newExpense] //...은 기존에 있던이란 의미
        setExpenses(newExpenses);
        setcharge("");
        setAmount(0);
        handleAlert({type:"success",text:"항목이 추가되었습니다."});
      }
    }else{
      console.log("ERROR");
      handleAlert({type:"danger", text:"항목을 기입해주세요."});
    }
  }
  const handleAlert = ({type,text}) =>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false});
    },5000);
  }
  //수정
  const handleEdit =(id) =>{
    const exp = expense.find(item => item.id == id);
    console.log(exp);
    setId(exp.id);
    setcharge(exp.charge);
    setAmount(exp.amount);
    setEdit(true);
  } 

  const clearItem = () =>{
    setExpenses([]);
    handleAlert({type:"danger",text:"초기화되었습니다."});
  }
  // render(){ //java의 method느낌임.
  return( //return 하는 값이 많아 ()를 사용
    <div className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/>:null}
        <h1>예산계산기</h1>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>{/*예산 추가 입력폼*/}
          <ExpenseForm  handleCharge={handleCharge} 
                        charge={charge}
                        handleAmount={handleAmount}
                        amount={amount}
                        handleSubmit={handleSubmit}
                        edit={edit}
                        />    
        </div>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>{/*추가한 예산 리스트*/}
          <ExpenseList  initialExpense={expense} 
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        clearItem={clearItem}
                        />
        </div>
        <div style={{display:'flex', justifyContent:'end', marginTop:'1rem'}}>{/*react의 js에선 top의 t가 대문자로 쓰임*/}
          <p style={{fontSize:'2rem'}}>
            총지출:
            <span>
              {/*/reduce() 배열의 각 요소에 대해 주어진 
              reducer 함수를 실행하고 하나의 결과값을 반환
              acc:누산기 , cur: 현재값, idx: 현재 인덱스, src : 원본배열
              */}
              {expense.reduce((acc,cur) =>{
                return(
                  acc += cur.amount
                )
              },0)}원
            </span>
          </p>
        </div>  
    </div> //react에선 div가 아니라 main 써도 됌
  )
} 

export default App; //App라는 디폴트 값을 내보내겠다는 의미
/*index.js 파일에서
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 중 <App />이 app method를 사용하겠다는 의미 이며 export default 가 app의 새롭게 설정한 defalut 값을 index.js로 보내주는 거임.
*/