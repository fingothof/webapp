import type { NextPage } from 'next'
import { AppContext } from 'next/app';
import Month from '../components/Month'
import { GetServerSideProps } from 'next';
import mysql from 'mysql2';
import Redis from 'ioredis';

interface Props {
  userAgent?: string;
}

const Calendar: NextPage<Props> = ({userAgent}) => {
  
  return (
		<div>
      <div>{userAgent}</div>
			<Month days={31}></Month>
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

  // send cookie id to redis.
  console.log('starting redis');
  let redis = new Redis({
    host: 'redis-store',
    password: process.env.REDIS_PASSWORD
  });
  // If present and session is valid return username.
  let res = await redis.get('key1');
  console.log(res);
  console.log('test redis');
  let [rows] = await connection.promise().query('SELECT * FROM Users');
  let temp: any = rows;
  
  return {
    props: {
      userAgent: temp[0].Username
    }

  };
} 

export default Calendar
