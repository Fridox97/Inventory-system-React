import React, { useState, useEffect } from "react";
import { users, borrar} from '../../util/fetchData'
import { Table, Dropdown, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Añadir from "../popup agregar";
import Confirmar from "../popupConfirmar";
import Modificar from "../modificar";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylogeneral.css'


export default function ListaDeUsuarios() {
  const [new_users, setUsers] = useState([])
  const [userID, setUserId] = useState('')
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModificar, setShowModificar] = useState(false)
  const [dataModificar, setDataModificar] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    users()
      .then(res => {
        setUsers(res)
      })
      .catch(err => console.error(err))

  }, [show, showConfirm, showModificar])

  function handleClick(ID, byType) {
    navigate(`/prestamos/${byType}/${ID}`)
  }

  function showModal(){
    setShow(true)
  }

  function hideModal(){
    setShow(false)
  }

  function showModalModificar(Data){
    setDataModificar(Data)
    setShowModificar(true)
  }

  function hideModalModificar(){
    setShowModificar(false)
  }

  function showModalConfirm(ID){
    setUserId(ID)
    setShowConfirm(true)
  }

  function hideModalConfirm(){
    setShowConfirm(false)
  }

  function eliminar() {
    const body = {
      _id: userID
    }
    borrar('users', body).then(() => {
      setShowConfirm(false)
    })
  }

  return (
    <Card className="cards">
      <Card.Header className="cards_header">
        <Card.Title>Usuarios</Card.Title>
        <Button onClick={() => showModal()}>Añadir usuario</Button>
      </Card.Header>
      <Card.Body>
        <Table className='tablas' striped size="sm" responsive='sm'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Departamento</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {new_users.map(data => {
              return (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.idDoc}</td>
                  <td>{data.department}</td>
                  <td>{data.mail}</td>
                  <td>{data.phoneNumber}</td>
                  <td>
                    <Dropdown drop="start">
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Menu
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="centrar_texto">
                        <Dropdown.Item onClick={() => handleClick(data._id, 'byUser')}>Prestamos</Dropdown.Item>
                        <Dropdown.Item onClick={() => showModalModificar(data)}>Modificar</Dropdown.Item>
                        <Dropdown.Item className="color_red" onClick={() => showModalConfirm(data._id)}>Eliminar</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table >
      </Card.Body>
      <Modificar data={dataModificar} show={showModificar} hide={hideModalModificar} tipo='usuario'/>
      <Confirmar show={showConfirm} function={eliminar} hide={hideModalConfirm} typeOfAction='borrarUsuario'/>
      <Añadir show={show} tipo={'usuario'} hide={hideModal}/>
    </Card>
    
  )
}