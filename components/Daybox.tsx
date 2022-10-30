import * as React from 'react'
import {useEffect,useState} from 'react'

type AppProp = {
	year:number,
	month: number,
	day: number,
    data:Array<Object>
}

let sendData = (body) =>{
    let url = "http://localhost:3000"
    //months/days are from 0 in data and from 1 in display
    fetch(url + '/api/events',{
        method:'POST',
        body: body
    })
    .then((response) => response.json())
}

let Daybox = ({year,month,day,data} : AppProp) => {
    let [currentText, setCurrentText] = useState("")
    let [display, setDisplay] = useState(false);
    let [content, setContent] = useState([]);

    //Text box to add new lines
	let textArea = (
		<div> 
			<textarea style={{width:"120px",height:"25px"}} onChange={(e) => setCurrentText(e.target.value)}/> 
			<button onClick={() =>{
				if(currentText != ""){
                    setContent([...content,currentText])
                    let key = year.toString() + "." + (month+1).toString() + "." + (day+1).toString() 
                    let body = JSON.stringify({[key]: currentText})
                    sendData(body)
				}
				setDisplay(!display)
			}}>
				add
			</button>
		</div>
	) 

    useEffect(() => {
        if(!display){
            setCurrentText("")
        }
    })

    return (
        <div style={{float:"left",border:"solid",width:"170px",height:"100px"}}>
            <div>
                {day+1}
                <br/>
                {
                    //displays lines from db
                    data.map((value) => {
                        return (<p key={value.id}> { value.name } </p>)
                    })
                }
                {
                    //displays newly added lines
                    content.length != 0 ? 
                    content.map((value) => {
                        return (<p key={value}> { value } </p>)
                    })
                    : <div/>
                }
                {display ? textArea : <div/>}
            </div>
            <button onClick={() => setDisplay(!display)}> + </button>
        </div>
    );
};

export default Daybox;
