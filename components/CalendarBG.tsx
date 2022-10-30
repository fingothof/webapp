import * as React from "react";
import Month from "./Month";
import {ReactNode, useEffect,useState} from 'react'

let url = process.env.WEBAPP_URL

//TYPES
type Data = Map<number, Map<number, Array<Array<string>>>>

//VARS
let bounds = {
    min: { year:2022, month:0},
    max: { year:2024, month:11}
}

//Creates the days and months
let formatData = (data:any) : Data => {
    //maybe rethink the data struct here
    let calData: Data= new Map()
    for (let year=bounds.min.year;year<=bounds.max.year;year++){
        let monthData = new Map()
        for(let i=0;i<12;i++){
            let days = new Date(year,i+1,0).getDate()
            let currArr : Array<any> = []
            for(let j=0;j<days;j++){
                //Keep in mind that months are 0-11 in code and 1-12 in db data
                let info = findDay(year,i,j+1,data)
                info ? currArr.push(info):
                            currArr.push([])
            }
            monthData.set(i,currArr)
        }
        calData.set(year,monthData)
    }
    return calData
}

//doubt it's the best way to insert data into the datastruct
let findDay = (year:number,month:number,day:number, rows: Array<any>): Array<any> | null => {
    let matches = [] 
    for (let line of rows){
        let dateStr = line.date
        let date = new Date(Date.parse(dateStr))
        if(date.getFullYear() == year && date.getMonth() == month && date.getDate() == day){
            matches.push(line) 
        }
    }
    return matches.length ? matches : null
}

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

interface Props{
    data?: string;
}

let CalendarBG = (props: Props) =>{
    let [month,setMonth] = useState(-1) 
    let [component,setComponent] = useState<ReactNode>(<div/>) 
    let [data, setData] = useState()

    useEffect(() => {
        if(!data){
            let jsonData = JSON.parse(props.data)
            setData(formatData(jsonData))
        }
        else{
            let year = new Date().getFullYear()
            let currentMonth = new Date().getMonth()
            let currentData = data.get(year).get(currentMonth)
            let comps = createMonthsComp(year,month,currentData)
            setMonth(currentMonth)
            setComponent(comps)
        }
    },[data])

    //min and max months to be displayed
    let upperBound = ((bounds.max.year - bounds.min.year) * 12 + bounds.max.month)
    let lowerBound = 0

    useEffect(() => {
        if(data){
            let year =  bounds.min.year + Math.floor(month/12)
            let currentMonth = month%12
            let currentData = data.get(year).get(currentMonth)
            let comps = createMonthsComp(year,month,currentData)
            setComponent(comps)
        }
    },[month])

    return(
        <div>
            <button onClick={() => setMonth(month-1)} > 
                {month > lowerBound ? <p> &lt; </p> : <p></p>}
            </button>
            { bounds.min.year + Math.floor(month/12) }  {formatMonth(month)} 
            <button onClick={() => setMonth(month+1)} > 
                {month < (upperBound) ? <p> &gt; </p> : <p></p>}
            </button>
            <br/>
            {component}
        </div>
    )
}

export default CalendarBG;
