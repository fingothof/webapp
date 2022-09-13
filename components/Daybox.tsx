import * as React from 'react'
import {useEffect,useState} from 'react'

type AppProp = {
	year:number,
	month: number,
	day: number,
    data:Array<string>
}

let Daybox = ({year,month,day,data} : AppProp) => {
    let [content, setContent] = useState([""]);
    let [currentText, setCurrentText] = useState("")
    let [display, setDisplay] = useState(false);


	//proper way to do this? unsure.
	let textArea = (
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
            //months/days are from 0 in data and from 1 in display
			let key = year.toString() + "." + (month+1).toString() + "." + (day+1).toString() 
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
				{day+1}
                <br/>
                {
                    data.map((value) => {
                        return (<p> { value } </p>)
                    })
                }
				{content.map((value) => (
					<div> {value} </div>
				))}
				{display ? textArea : <div/>}
			</div>
			<button onClick={() => setDisplay(!display)}> + </button>

    </div>
  );
};

export default Daybox;
