import type { NextPage } from 'next'
import { AppContext } from 'next/app';
import Month from '../components/Month'
import { GetServerSideProps } from 'next';
import mysql from 'mysql2';
import CalendarBG from '../components/CalendarBG'

interface Props {
  userAgent?: string;
}

const Calendar: NextPage<Props> = ({userAgent}) => {
  
  return (
		<div>
      <div>{userAgent}</div>
			<Month days={31}></Month>
			<CalendarBG />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var connection = mysql.createConnection({
    connectionLimit: 4,
    host     : process.env.DB_HOST,
    user     : process.env.MYSQLDB_USER,
    password : process.env.MYSQLDB_ROOT_PASSWORD,
    database : process.env.MYSQLDB_DATABASE
  });

  let [rows] = await connection.promise().query('SELECT * FROM Users');
  let temp: any = rows;
  
  return {
    props: {
      userAgent: temp[0].Username
    }

  };
} 

export default Calendar
