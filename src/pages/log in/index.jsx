import React, { useState } from "react";
import { Button, Form, Container, Card } from 'react-bootstrap';
import { login } from '../../util/fetchData'
import { useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  let from = location.state?.from?.pathname || "/prestamos";

  const handleSubmit = (event) => {
    event.preventDefault()
    login(user, pass)
      .then(res => {
        sessionStorage.setItem("user", res[0].name)
        sessionStorage.setItem("adminId", res[0]._id)
        sessionStorage.setItem("token", JSON.stringify(true));

        navigate(from, { replace: true })

      }).catch(err => console.error(err))
  }

  return (
    <Container className="login d-flex align-items-center justify-content-center bigfont" style={{ minHeight: '100vh' }}>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Usuario</Form.Label>
            <Form.Control className="input" type="Text" placeholder="Usuario" onChange={e => setUser(e.target.value)} value={user} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label >Contraseña</Form.Label>
            <Form.Control className="input" type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} value={pass} required />
          </Form.Group>
          <Button className="bigfont" variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
      </Card>
    </Container>

  )
}

export default Login;