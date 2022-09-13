// THIS IS LOOKING REAL USELESS RIGHT NOW (REDUNDANT PERHAPS)

import * as React from "react";
import Daybox from "./Daybox";

type AppProps = {
    year:number,
    month: number,
    data: Array<string>,
};

let Month = ({ year,month,data }: AppProps) => {
	let makeDays = () =>{
		let comps = []
		for(let i=0;i<data.length;i++){
			comps.push(<Daybox year={year} month={month} day={i} data={data[i]}/>)
		}
		return comps
	}

    return (
    <div id="Month" >
        {makeDays()}
    </div>
    );
};

export default Month
