import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { registrar } from '../../util/fetchData';
import { phoneNumberFormat, cedulaFormat, justletters, justNumbers } from '../../util/format';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Añadir(props) {
    const [name, setName] = useState('')
    const [idDoc, setidDoc] = useState('')
    const [department, setdepartment] = useState('')
    const [mail, setmail] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')

    function handleChange(event) {
        const inputName = event.target.name
        const value = event.target.value

        if (justletters(value.at(-1)) && inputName === 'name') {
            setName(value)
            return
        }

        if (justNumbers(value.at(-1)) && (inputName === 'cedula' || inputName === 'phone')) {
            if (inputName === 'cedula') {
                setidDoc(value)
                return
            }
            setphoneNumber(value)
            return
        }

        return
    }

    function handleClick() {
        const endpoint = props.tipo === 'usuario' ? 'users' : 'items'
        let body

        if (props.tipo === 'usuario') {
            body = {
                name: name,
                idDoc: cedulaFormat(idDoc),
                department: department,
                mail: mail,
                phoneNumber: phoneNumberFormat(phoneNumber)
            }

        }

        if (props.tipo === 'equipo') {
            body = {
                name: name,
                description: description,
                category: category,
                department: department
            }
        }
        if ((body.department !== '' && body.name !== '' && body.idDoc !== '' && body.mail !== '' && body.phoneNumber >= 10 && endpoint === 'usuario')
            || (body.name !== '' && body.category !== '' && body.department !== '' && endpoint === 'items')) {
            registrar(endpoint, body).then(() => {
                setName('')
                setcategory('')
                setdepartment('')
                setdescription('')
                setidDoc('')
                setmail('')
                setphoneNumber('')
                props.hide()
            })
        }

    }

    function resetDataOnHide() {
        setName('')
        setcategory('')
        setdepartment('')
        setdescription('')
        setidDoc('')
        setmail('')
        setphoneNumber('')
        props.hide()
    }

    const options = {
        usuario:
            <>
                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Nombre:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control name='name' value={name} onChange={(e) => handleChange(e)} placeholder="Ej: Jose Perez" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Cedula:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control name='cedula' maxLength={11} value={idDoc} onChange={(e) => handleChange(e)} placeholder="Ej: 123-4567890-1" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Departamento:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Select value={department} onChange={(e) => setdepartment(e.target.value)} aria-label="Departamentos" required>
                            <option>Departamentos</option>
                            <option value="Contabilidad">Contabilidad</option>
                            <option value="Servicio al cliente">Servicio al cliente</option>
                            <option value="Logística">Logística</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Gerencia">Gerencia</option>
                            <option value="Medios">Medios</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Correo:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control value={mail} onChange={(e) => setmail(e.target.value)} placeholder="Ej: nombre@correo.com" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Teléfono:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control name='phone' maxLength={10} value={phoneNumber} onChange={(e) => handleChange(e)} placeholder="Ej: 809-111-1234" required />
                    </Col>
                </Form.Group>
            </>,

        equipo:
            <>
                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Equipo:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Laptop" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Categoria:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Select value={category} onChange={(e) => setcategory(e.target.value)} aria-label="Categorias" required>
                            <option>Categoria</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Teclado">Teclado</option>
                            <option value="Mouse">Mouse</option>
                            <option value="Flota">Flota</option>
                            <option value="Monitor">Monitor</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Audifonos">Audifonos</option>
                            <option value="Otros">Otros</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Departamento:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Select value={department} onChange={(e) => setdepartment(e.target.value)} aria-label="Departamentos" required>
                            <option>Departamentos</option>
                            <option value="Contabilidad">Contabilidad</option>
                            <option value="Servicio al cliente">Servicio al cliente</option>
                            <option value="Logística">Logística</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Gerencia">Gerencia</option>
                            <option value="Medios">Medios</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Descripción:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control as='textarea' value={description} onChange={(e) => setdescription(e.target.value)} required />
                    </Col>
                </Form.Group>

            </>
    }

    return (
        <Form>
            <Modal show={props.show} onHide={props.hide} centered>
                <Modal.Header>
                    <Modal.Title>Añadir {props.tipo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {options[props.tipo]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => resetDataOnHide()}>Cancelar</Button>
                    <Button type='submit' onClick={() => handleClick()}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </Form>

    )
}