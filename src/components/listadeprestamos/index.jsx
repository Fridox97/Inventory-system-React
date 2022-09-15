import React, { useState, useEffect } from "react";
import { prestamos, buscar, completar } from '../../util/fetchData'
import { Table, Button, Alert, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Confirmar from "../popupConfirmar";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylogeneral.css'


export default function ListaDePrestamos() {
    const [new_prestamo, setprestamo] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [show, setShow] = useState(false)
    const { id, bytype } = useParams()

    useEffect(() => {
        if (id) {
            buscar(id, bytype)
                .then(res => {
                    setprestamo(res)
                })
                .catch(err => console.error(err))
        } else {
            prestamos()
                .then(res => {
                    setprestamo(res)
                })
                .catch(err => console.error(err))
        }
    }, [id, bytype, show])

    function handleClick(ID) {
        setShow(true)
        setSelectedId(ID)
    }

    function hide() {
        setShow(false)
        setSelectedId('')
    }

    function borrar() {
        setShow(false)
        completar(selectedId)
        setSelectedId('')
    }

    return (
        <>
            {new_prestamo.length !== 0 &&
                <Card className="cards">
                    <Card.Header className="cards_header">
                        <Card.Title>Prestamos</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table className='tablas' striped size="sm" responsive='sm'>
                            <thead>
                                <tr>
                                    <th>Admin</th>
                                    <th>Usuario</th>
                                    <th>Equipo</th>
                                    <th>Motivo</th>
                                    <th>Tiempo Estimado</th>
                                    <th>Fecha de prestamo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {new_prestamo.map(data => {
                                    return (
                                        <tr key={data._id}>
                                            <td>{data.adminName}</td>
                                            <td>{data.userName}</td>
                                            <td>{data.itemName}</td>
                                            <td>{data.reason}</td>
                                            <td>{data.estimatedtime + ' Dias'}</td>
                                            <td>{data.lendDate.split('T')[0]}</td>
                                            <td>
                                                <Button onClick={() => handleClick(data._id)} disabled={data.returned} >
                                                    {data.returned ? 'Completado' : 'Completar'}
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            
                        </Table>
                    </Card.Body>
                </Card>
            }
            {new_prestamo.length === 0 &&
                <Card className="cards">
                    <Card.Header className="cards_header">
                        <Card.Title>Prestamos</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Alert className='tablas' key='key' show={true} variant='warning'>No existen equipos prestados por el momento</Alert>
                    </Card.Body>
                </Card>
            }
            <Confirmar show={show} function={borrar} hide={hide} typeOfAction='prestamo' />
        </>
    )

}