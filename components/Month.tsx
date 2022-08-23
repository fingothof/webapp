import * as React from "react";
import Daybox from "./Daybox";
import {useState, useEffect} from 'react'

type AppProps = {
  days: number;
};

//let times = (years:number) =>{
	//let dates = new Map()
	//for(let i=0;i<years;i++){
		//let year = 2022 + i
		//dates.set(year, new Map())
		//for(let j=1;j<=12;j++){
			//let days = new Date(year,j,0).getDate()
			//dates.get(year).set(j,days)
		//}
	//}
	//console.log(dates)
//}


let Month = ({ days }: AppProps) => {
	let month = 'july'

	let makeDays = () =>{
		let comps = []
		for(let i=1;i<=days;i++){
			comps.push(<Daybox year={2022} month={month} day={i}/>)
		}
		console.log(comps)
		return comps
	}

  return (
    <div>
			{month}
      <div style={{width:"100%",border:"solid"}}></div>
				{makeDays()}
    </div>
  );
};

export default Month;
