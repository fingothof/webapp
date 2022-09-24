import * as React from "react";
import Month from "./Month";
import {ReactNode, useEffect,useState} from 'react'

//TEMP VARS
let url = "http://localhost:3000"
let year = 2022

//TYPES
type Data = Map<Object, Array<Array<string>>>

//VARS
let today = new Date()
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
                            currArr.push(["empty"])
            }
            calData.set(year.toString() + i.toString(),currArr)
        }
    }
    console.log(calData)
    return calData
}

let fetchedData: Data | null = null

let fetchData = (async () => {
    let res = await fetch(url + '/api/events')
    let data = await res.json()
    fetchedData = setData(data)
    return setData(data)
})().then((val) => val)

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

let CalendarBG = () =>{
    let [month,setMonth] = useState(-1) 
    let [component,setComponent] = useState<ReactNode>(<div/>) 

    useEffect(() => {
        if(month == -1){
            setMonth(today.getMonth())
        }
        //dubious, without checking for month, this is infinitely called
        //temp data for month <=>
        if(fetchedData && month >= 0){
            let year = (2022 + Math.floor(month/12))
            let currentMonth = (month%12)
            let currentData = fetchedData.get(year.toString()+currentMonth.toString())
            let component = createMonthsComp(year,currentMonth, currentData)
            setComponent(component)
        }
    },[month])

    //min and max months to be displayed
    let upperBound = ((bounds.max.year - bounds.min.year) * 12 + bounds.max.month)
    let lowerBound = 0

    return(
        <div>
            <button onClick={() => setMonth(month-1)} > 
                {month > lowerBound ? <p> &lt; </p> : <p></p>}
            </button>
            { year + Math.floor(month/12) }  {formatMonth(month)} 
            <button onClick={() => setMonth(month+1)} > 
                {month < (upperBound) ? <p> &gt; </p> : <p></p>}
            </button>
            {component}
        </div>
    )
}

export default CalendarBG;
