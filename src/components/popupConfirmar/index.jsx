import React from "react";
import { Button, Modal } from 'react-bootstrap';

export default function Confirmar(props) {

    function handleClick() {
        props.function()
    }

    return (
        <>
            <Modal show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar</Modal.Title>
                </Modal.Header>
                {props.typeOfAction === 'prestamo' && <Modal.Body>¿Quieres completar este prestamos?</Modal.Body>}
                {props.typeOfAction === 'borrarUsuario' && <Modal.Body>¿Seguro que deseas eliminar este usuario?</Modal.Body>}
                {props.typeOfAction === 'borrarEquipo' && <Modal.Body>¿Seguro que deseas eliminar este equipo?</Modal.Body>}
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.hide}>
                        Cancelar
                    </Button>
                    {props.typeOfAction === 'prestamo' &&
                        <Button variant="primary" onClick={handleClick}>
                            Completar
                        </Button>}
                    {props.typeOfAction === 'borrarUsuario' &&
                        <Button variant="danger" onClick={handleClick}>
                            Eliminar
                        </Button>}
                    {props.typeOfAction === 'borrarEquipo' &&
                        <Button variant="danger" onClick={handleClick}>
                            Eliminar
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}