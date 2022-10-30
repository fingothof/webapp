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

    let date = Object.keys(newData)[0]

    let qry =`insert into events(name,date) values('${newData[date]}',STR_TO_DATE('${date}','%Y.%m.%d'))`

    connection.promise().query(qry).then( () => {
        console.log('all is good')
        res.status(200)
    })
    .catch( (err) => {
        console.log(err)
        res.status(500)
    })
}

function getEvents(res: NextApiResponse){
}
