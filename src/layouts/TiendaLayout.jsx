import { Outlet } from 'react-router-dom'
import Cabecera from '../components/Cabecera'
import Pie from '../components/Pie'

function TiendaLayout() {
  return (
    <>
      <Cabecera />
      <main>
        <Outlet />
      </main>
      <Pie />
    </>
  )
}
export default TiendaLayout