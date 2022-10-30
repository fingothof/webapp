import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import mysql from 'mysql2';
import CalendarBG from '../components/CalendarBG'

interface Props {
  data?: string;
}

const Calendar: NextPage<Props> = ({data}) => {
  
  return (
		<div>
      <div>TEST</div>
			<CalendarBG data={data}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var connection = mysql.createConnection({
    connectionLimit: 4,
    port : process.env.MYSQLDB_LOCAL_PORT,
    user     : process.env.MYSQLDB_USER,
    password : process.env.MYSQLDB_ROOT_PASSWORD,
    database : process.env.MYSQLDB_DATABASE
  });

  let [rows] = await connection.promise().query('SELECT * FROM events');

  //why does it need to be stringified?
  let data: any = JSON.stringify(rows);
  console.log(data)
  
  return {
    props: {
      data: data
    }

  };
} 

export default Calendar
