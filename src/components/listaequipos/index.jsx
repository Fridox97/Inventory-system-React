import React, { useState, useEffect } from "react";
import { equipos, borrar } from "../../util/fetchData";
import { Table, Dropdown, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import PopupPrestamo from "../popup prestar";
import Modificar from "../modificar";
import Añadir from "../popup agregar";
import Confirmar from "../popupConfirmar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylogeneral.css'

export default function ListaDeEquipos() {
  const [new_equipos, setEquipos] = useState([])
  const [equipoId , setEquipoId] = useState('')
  const [show, setShow] = useState(false)
  const [showAgregar, setShowAgregar] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModificar, setShowModificar] = useState(false)
  const [dataModificar, setDataModificar] = useState({})
  const [selectedId, setSelectedId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {

    equipos()
      .then(res => {
        setEquipos(res)
      })
      .catch(err => console.error(err))

  }, [selectedId, showAgregar, showConfirm, showModificar])

  function hideModal() {
    setSelectedId('')
    setShow(false)
  }

  function showModal(ID) {
    setSelectedId(ID)
    setShow(true)
  }

  function hideModalAgregar() {
    setShowAgregar(false)
  }

  function showModalAgregar() {
    setShowAgregar(true)
  }

  function showModalModificar(Data){
    setDataModificar(Data)
    setShowModificar(true)
  }

  function hideModalModificar(){
    setShowModificar(false)
  }

  function showModalConfirm(ID){
    setEquipoId(ID)
    setShowConfirm(true)
  }

  function hideModalConfirm(){
    setShowConfirm(false)
  }

  function eliminar() {
    const body = {
      _id: equipoId
    }
    borrar('items', body).then(() => {
      setShowConfirm(false)
    })
  }

  function showPrestamo(ID, byType) {
    navigate(`/prestamos/${byType}/${ID}`)
  }

  return (
    <Card className="cards mt-3">
      <Card.Header className="cards_header">
        <Card.Title>Equipos</Card.Title>
        <Button onClick={() => showModalAgregar()}>Añadir Equipo</Button>
      </Card.Header>
      <Card.Body>
        <Table className='tablas' striped size="sm" responsive='sm'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Departamento</th>
              <th>Estado</th>
              <th>Agregado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {new_equipos.map(data => {
              return (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.category}</td>
                  <td>{data.department}</td>
                  <td>{data.isAvailable ? <p className="disponible borde_redondo white_bold">Disponible</p> : <p className="prestado borde_redondo white_bold">Prestado</p>}</td>
                  <td>{data.dayAdded.split('T')[0]}</td>
                  <td><Dropdown drop="start">
                    <Dropdown.Toggle id="dropdown-basic">
                      Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="centrar_texto">
                      <Dropdown.Item onClick={data.isAvailable ? () => showModal(data._id) : () => showPrestamo(data._id, 'byItem')} >{data.isAvailable ? 'Prestar' : 'Ver prestamo'}</Dropdown.Item>
                      <Dropdown.Item onClick={() => showModalModificar(data)}>Modificar</Dropdown.Item>
                      <Dropdown.Item className="color_red" onClick={() => showModalConfirm(data._id)}>Eliminar</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown></td>
                </tr>
              )
            })}
          </tbody>
          <PopupPrestamo show={show} hide={hideModal} itemId={selectedId} />
        </Table>
      </Card.Body>
      <Modificar data={dataModificar} show={showModificar} hide={hideModalModificar} tipo='equipo'/>
      <Confirmar show={showConfirm} function={eliminar} hide={hideModalConfirm} typeOfAction='borrarEquipo'/>
      <Añadir show={showAgregar} tipo={'equipo'} hide={hideModalAgregar} />
    </Card>

  )
}