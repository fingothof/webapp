import * as React from "react";
import Month from "./Month";
import {ReactNode, useEffect,useState} from 'react'
import { stat } from "fs";

//TEMP VARS
let url = "http://localhost:3000"

//TYPES
type Data = Map<Object, Array<Array<string>>>

//VARS
let bounds = {
    min: { year:2022, month:0},
    max: { year:2024, month:11}
}

//Creates the days and months
let setData = (data:any) : Data => {
    //maybe rethink the data struct here
    let calData: Data= new Map()
    for (let year=bounds.min.year;year<=bounds.max.year;year++){
        for(let i=0;i<12;i++){
            let days = new Date(year,i+1,0).getDate()
            let currArr : Array<any> = []
            for(let j=0;j<days;j++){
                //Keep in mind that months are 0-11 in code and 1-12 in db data
                let tag = year+'.'+(i+1).toString()+'.'+(j+1).toString()
                data[tag] ? currArr.push(data[tag]):
                            currArr.push([])
            }
            calData.set(year.toString() + i.toString(),currArr)
        }
    }
    return calData
}

//seems redundant
let createMonthsComp = (year:number, month:number, data: Array<string>|undefined) : ReactNode =>{
    let monthComponents: ReactNode
    if(data){
         monthComponents = <Month year={year} month={month} data={data} />
    }
    return monthComponents
}

let formatMonth = (month: number) => {
    let months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
    return months[month%12]
}

let setupData = async (stateUpdate: Function) => {
    let res = await fetch(url + '/api/events')
    let data = await res.json()
    let dateData = setData(data)
    let today = new Date()
    let month = (bounds.min.year - (today.getFullYear())) * 12 + (today.getMonth())
    setupMonth(dateData, month, stateUpdate)
}

let setupMonth = (data: Data, month: number, stateUpdate: Function) => {
    let year = (bounds.min.year + Math.floor(month/12))
    let currentMonth = (month%12)
    let currentData = data.get(year.toString()+currentMonth.toString())
    let component = createMonthsComp(year,currentMonth, currentData)
    console.log(component)
    stateUpdate(component)
}

let CalendarBG = () =>{
    let [month,setMonth] = useState(-1) 
    let [component,setComponent] = useState<ReactNode>(<div/>) 

    //min and max months to be displayed
    let upperBound = ((bounds.max.year - bounds.min.year) * 12 + bounds.max.month)
    let lowerBound = 0

    return(
        <div>
            <button onClick={() => setMonth(month-1)} > 
                {month > lowerBound ? <p> &lt; </p> : <p></p>}
            </button>
            { bounds.min.year + Math.floor(month/12) }  {formatMonth(month)} 
            <button onClick={() => setMonth(month+1)} > 
                {month < (upperBound) ? <p> &gt; </p> : <p></p>}
            </button>
            {component}
        </div>
    )
}

export default CalendarBG;
