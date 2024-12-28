import { Component } from "react";
import "./Expense.css";

import {MdSend} from 'react-icons/md'; //아이콘 추가 문구 

{/*props(): 컴포넌트간 데이터 전달 코드 */}
//xport class ExpenseForm extends Component{
const ExpenseForm = ({handleCharge , charge , handleAmount , amount , handleSubmit , edit}) => {  
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <label htmlFor="charge">지출항목</label> 
                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    id="charge" 
                    name="charge" 
                    value={charge}
                    placeholder="예)식비"
                    onChange={handleCharge}/>
                </div>
                <label htmlFor="amount">비용</label> {/*htmlFor로 id와 연결 하는 것*/}
                <div className="form-group">
                    <input type="Number" 
                    className="form-control" 
                    id="amount" 
                    name="amount" 
                    value={amount}
                    placeholder="예)100"
                    onChange={handleAmount}/>
                </div>
            </div>
            <button type="submit" className="btn"> 
                {edit?"수정":"제출"}<MdSend className="btn-icon"/>
            </button>
        </form>
    )
}
export default ExpenseForm;