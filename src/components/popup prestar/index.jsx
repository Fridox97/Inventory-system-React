import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { users, realizarPrestamo } from '../../util/fetchData';


export default function PopupPrestamo(props) {
    const [names, setNames] = useState([])
    const [selectedName, setSelectedName] = useState('')
    const [selectedUserId, setSelectedUserId] = useState('')
    const [motivo, setMotivo] = useState('')
    const [tiempo, setTiempo] = useState(1)

    useEffect(() => {
        users().then(res => {
            setNames(res)
        })
    }, [selectedName])

    function handleClick(name,id) {
        setSelectedName(name)
        setSelectedUserId(id)
    }

    function handleGuardar(){
        realizarPrestamo(sessionStorage.getItem('adminId'),selectedUserId,props.itemId,motivo,tiempo)
        .then(() => {
            setMotivo('')
            setSelectedName('')
            setTiempo(1)
            props.hide()
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <Modal show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Prestar equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body><b>Introduzca los datos solicitados:</b></Modal.Body>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row>
                                <Col>
                                    <Form.Label><b>Tiempo estimado en dias</b></Form.Label>
                                    <Form.Control
                                        as='input'
                                        type='number'
                                        min={1}
                                        value={tiempo}
                                        onChange={(e) => setTiempo(e.target.value)}               
                                    />
                                </Col>
                                <Col>
                                    <Form.Label><b>Personal responsable:</b></Form.Label>
                                    <Dropdown drop="end">
                                        <Dropdown.Toggle id="dropdown-basic">
                                            {selectedName ? selectedName : 'Nombres'}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {names.map(data => {
                                                return <Dropdown.Item key={data._id} onClick={() => handleClick(data.name,data._id)}>{data.name}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label><b>Motivo</b></Form.Label>
                            <Form.Control as="textarea" rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.hide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGuardar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}