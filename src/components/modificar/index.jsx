import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { modificar } from '../../util/fetchData';
import { phoneNumberFormat, phoneNumberUnformat } from '../../util/format';
import { justNumbers, justletters } from '../../util/format';

export default function Modificar(props) {
    const [data, setData] = useState('')
    
    useEffect(() => {
        setData(props.data)
    },[props.data])
    
    function handleOnchange(e){
        const key = e.target.name
        let value = e.target.value

        if(key === 'phoneNumber'){
            if(value.length === 10){
                value = phoneNumberFormat(value)
            }else{
                value = phoneNumberUnformat(value)
            }
        }

        if(key !== 'name' && key !== 'phoneNumber'){
            setData(prevState => ({
                ...prevState,
                [key]: value
             }));
             return
        }

        if (justletters(value.at(-1)) && key === 'name') {
            setData(prevState => ({
                ...prevState,
                [key]: value
             }));
            return
        }

        if (justNumbers(value.at(-1)) && key === 'phoneNumber'){
            setData(prevState => ({
                ...prevState,
                [key]: value
             }));
            return
        }   
    }

    function handleClick() {
        const endpoint = props.tipo === 'usuario' ? 'users' : 'items'
        if(data.category !== '' && data.department !== ''){
            modificar(endpoint, data).then(() => {
                props.hide()
            })
        }

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
                        <Form.Control name='name' value={data.name} onChange={(e) => handleOnchange(e)} placeholder="Ej: Jose Perez" defaultValue={data.name} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Cedula:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control plaintext readOnly  defaultValue={data.idDoc}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Departamento:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Select name='department' value={data.department} onChange={(e) => handleOnchange(e)} aria-label="Departamentos" required>
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
                        <Form.Control name='mail' value={data.mail} onChange={(e) => handleOnchange(e)} placeholder="Ej: nombre@correo.com" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Teléfono:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Control name='phoneNumber' maxLength={10} value={data.phoneNumber} onChange={(e) => handleOnchange(e)} placeholder="Ej: 809-111-1234" required />
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
                        <Form.Control name='name' value={data.name} onChange={(e) => handleOnchange(e)} placeholder="Ej: Laptop" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Col>
                        <Form.Label column sm="2">
                            Categoria:
                        </Form.Label>
                    </Col>

                    <Col sm='8'>
                        <Form.Select name='category' value={data.category} onChange={(e) => handleOnchange(e)} aria-label="Categorias" required>
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
                        <Form.Select name='department' value={data.department} onChange={(e) => handleOnchange(e)} aria-label="Departamentos" required>
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
                        <Form.Control name='description' as='textarea' value={data.description} onChange={(e) => handleOnchange(e)} required />
                    </Col>
                </Form.Group>

            </>
    }

    return (
        <Form>
            <Modal show={props.show} onHide={props.hide} centered>
                <Modal.Header>
                    <Modal.Title>Modificar {props.tipo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {options[props.tipo]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.hide}>Cancelar</Button>
                    <Button type='submit' onClick={() => handleClick()}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </Form>

    )
}