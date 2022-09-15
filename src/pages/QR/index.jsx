import React, { useState, useEffect } from "react"
import { Table, Button, Card, Form, Col, Row, Container, Alert } from 'react-bootstrap'
import PopupPrestamo from "../../components/popup prestar";
import Confirmar from "../../components/popupConfirmar";
import { buscarQr, completar } from "../../util/fetchData"
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylogeneral.css'

export default function QR() {
    const [showPrestamo, setShowPrestamo] = useState(false)
    const [showTerminar, setShowTerminar] = useState(false)
    const [lendId, setLendId] = useState('')
    const [itemId, setItemId] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [department, setDepartment] = useState('')
    const [description, setDescription] = useState('')
    const [lendName, setLendName] = useState('')
    const [lendDate, setLendDate] = useState('')
    const [lendDevuelto, setLendDevuelto] = useState('')
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            buscarQr(id)
                .then(res => {
                    setLendId(res.lend._id)
                    setItemId(res.item._id)
                    setName(res.item.name)
                    setCategory(res.item.category)
                    setDepartment(res.item.department)
                    setDescription(res.item.description)
                    setLendName(res.lend.userName)
                    setLendDate(res.lend.lendDate)
                    setLendDevuelto(res.lend.returned)
                })
                .catch(err => console.error(err))
        }

    }, [showPrestamo, showTerminar, id])

    function hideModalPrestamo() {
        setShowPrestamo(false)
    }

    function showModalPrestamo() {
        setShowPrestamo(true)
    }

    function hideModalTerminar() {
        setShowTerminar(false)
    }

    function showModalTerminar() {
        setShowTerminar(true)
    }

    function borrar() {
        setShowTerminar(false)
        console.log(completar(lendId))
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center qr" >
                {(id !== undefined && itemId !== '') &&
                    <Card >
                        <Card.Header className="d-flex justify-content-center">
                            <h3>Información</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        <b>
                                            Nombre:
                                        </b>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control plaintext readOnly value={name} />
                                    </Col>
                                    <Form.Label column sm="4">
                                        <b>
                                            Categoria:
                                        </b>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control plaintext readOnly value={category} />
                                    </Col>
                                    <Form.Label column sm="4">
                                        <b>
                                            Departamento:
                                        </b>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control plaintext readOnly value={department} />
                                    </Col>
                                    <Form.Label column sm="4">
                                        <b>
                                            Descripción:
                                        </b>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control as='textarea' rows={4} readOnly value={description} />
                                    </Col>
                                    <Form.Label column sm="4">
                                        <b>
                                            Último prestamo:
                                        </b>
                                    </Form.Label>
                                    <Col sm="8">
                                        <Table>
                                            <thead className="centrar_texto">
                                                <tr>
                                                    <th>Prestatario</th>
                                                    <th>Fecha</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            {(lendId) &&
                                                <tbody className="centrar_texto">
                                                    <tr>
                                                        <td>{lendName}</td>
                                                        <td>{lendDate.split('T')[0]}</td>
                                                        <td className="centrar_texto">{lendDevuelto ?
                                                            <p className="disponible borde_redondo white_bold">Devuelto</p> :
                                                            <p className="prestado borde_redondo white_bold ">Prestado</p>}
                                                        </td>
                                                    </tr>
                                                </tbody>}
                                            {(!lendId) &&
                                                <tbody className="centrar_texto">
                                                    <tr>
                                                        <td colSpan={3}>Sin prestamos previos</td>
                                                    </tr>
                                                </tbody>}
                                        </Table>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-center">
                            <Button className="px-4" onClick={lendDevuelto || lendDevuelto === '' ? () => showModalPrestamo() : () => showModalTerminar()}>
                                {lendDevuelto || lendDevuelto === '' ? 'Prestar' : 'Completar'}
                            </Button>
                        </Card.Footer>
                    </Card>
                }
                {id === undefined &&
                    <Alert variant="danger"><h1>No se ha proporcionado un ID para buscar</h1></Alert>
                }
                {(itemId === '' && id !== undefined) &&
                    <Alert variant="danger"><h1>No se encontro un equipo con dicho ID</h1></Alert>
                }
                <Confirmar show={showTerminar} function={borrar} hide={hideModalTerminar} typeOfAction='prestamo' />
                <PopupPrestamo show={showPrestamo} hide={hideModalPrestamo} itemId={itemId} />
            </Container>
        </>
    );
}