import { Component } from "react";
import "./Expense.css";
import ExpenseItem from "./ExpenseItem";
import {MdDelete} from 'react-icons/md';

const ExpenseList = (props) => {
    console.log(props.initialExpense);
    return(
        <>
            <ul className="list">
                {/*ExpenseItem*/}
                
                {props.initialExpense.map(expense => {
                    return(
                        <ExpenseItem 
                        expense={expense}
                        key={expense.id}
                        handleDelete={props.handleDelete}
                        handleEdit={props.handleEdit}
                        clearItem = {props.clearItem}
                        />
                    )
                })}
            </ul>
            {
            props.initialExpense.length >0 &&(
                <button className="btn"
                onClick={props.clearItem}>목록지우기
                <MdDelete className="btn-icon"/>
                </button>
            )
            }
            
        </>
    )
}

export default ExpenseList;