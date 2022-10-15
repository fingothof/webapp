import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

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
	//Not sure opening connections in each API endpoint is correct
    var connection = mysql.createConnection({
        connectionLimit: 4,
        port : process.env.MYSQLDB_LOCAL_PORT,
        user     : process.env.MYSQLDB_USER,
        password : process.env.MYSQLDB_ROOT_PASSWORD,
        database : process.env.MYSQLDB_DATABASE
    });
    let newData = JSON.parse(req.body)

    console.log(newData)
    let date = Object.keys(newData)[0]

    let qry =`insert into events(name,date) values('${newData[date]}',STR_TO_DATE('${date}','%Y.%m.%d')`
    console.log(qry)

    connection.promise().query(qry).then( () => {
        res.status(200)
    })
    .catch( (err) => {
        console.log(err)
        res.status(500)
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
