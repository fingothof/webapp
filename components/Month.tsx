import * as React from "react";
import Daybox from "./Daybox";
import {useState, useEffect} from 'react'

type AppProps = {
    days: number,
    month: {name: sting,index: number},
    info: any
};

let x = () => {

}

export default Month = ({ days }: AppProps) => {
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

