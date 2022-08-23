import * as React from 'react'
import {useEffect,useState} from 'react'

type AppProp = {
	year:number,
	month: string,
	day: number
}

let Daybox = ({year,month,day} : AppProp) => {
	let [content, setContent] = useState([""]);
	let [currentText, setCurrentText] = useState("")
  let [display, setDisplay] = useState(false);

	//proper way to do this? unsure.
	let tarea = (
		<div> 
			<textarea style={{width:"120px",height:"25px"}} onChange={(e) => setCurrentText(e.target.value)}/> 
			<button onClick={() =>{
				if(currentText != ""){
					setContent([...content,currentText])
				}
				setDisplay(!display)
			}}>
				add
			</button>
		</div>
	) 

	useEffect(() => {
		if(content[content.length-1] != ""){
			let url = "http://localhost:3000"
			let key = year.toString() + "." + month.toString() + "." + day.toString() 
			fetch(url + '/api/events',{
				method:'POST',
				body: JSON.stringify({[key]: content[content.length-1]})
			})
			.then((response) => response.json())
			.then((data) => console.log(data))
		}
	},[content])

  return (
    <div style={{float:"left",border:"solid",width:"170px",height:"100px"}}>
			<div>
				{day}
				{content.map((value) => (
					<div> {value} </div>
				))}
				{display ? tarea : <div/>}
			</div>
			<button onClick={() => setDisplay(!display)}> + </button>

    </div>
  );
};

export default Daybox;
