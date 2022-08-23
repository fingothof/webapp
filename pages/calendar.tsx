import type { NextPage } from 'next'
import Month from '../components/Month'

const Calendar: NextPage = () => {
  return (
		<div>
			<Month days={31}/>
    </div>
  )
}

export default Calendar
