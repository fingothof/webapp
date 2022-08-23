import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	if(req.method == 'GET'){
		getEvents(res)
	}
	if(req.method == 'POST'){
		setEvent(req,res)
	}
	else{
		res.status(500)
	}
}

async function setEvent(req: NextApiRequest, res: NextApiResponse){
	//in the meantime just writing to a file
	fs.readFile("data/events.json", (err, file) => {
		let data = JSON.parse(file.toString())
		let newData = JSON.parse(req.body)
		let key = Object.keys(newData)[0]
		if(data[key]){
			data[key].push(newData[key])
		}
		else{
			data[key] = [newData[key]]
		}
		fs.writeFile('data/events.json', JSON.stringify(data), () =>{
			res.status(200)
		})
	})
}

function getEvents(res: NextApiResponse){
	console.log("getting events")
	fs.readFile('data/events.json',(err, data) => {
		if(err) {
			console.log(err)
			res.status(500)	
		}		
		else{
			//do we need to parse or is it redundant?
			console.log(data)
			res.status(200).send(data)
		}
	})
}
