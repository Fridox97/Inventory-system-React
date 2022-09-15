import React from 'react';
import Login from '../../pages/log in';
import Usuarios from '../../pages/usuarios';
import Equipos from '../../pages/equipos';
import Prestamos from '../../pages/prestamos'
import QR from '../../pages/QR';
import { AuthWrapper } from '../autenticar';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import '../../stylogeneral.css'

function App() {

  return (
    <>

      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/equipos' element={<Equipos />} />
          <Route path='/prestamos' element={<Prestamos />} />
          <Route path='/prestamos/:bytype/:id' element={<Prestamos />}/>
          <Route path='/QR' element={<QR />} />
          <Route path='/QR/:id' element={<QR />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  )
}

export default App;
