import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Login(props) {
    const [preset, setPreset] = useState("");
    const [cloud, setCloud] = useState("");
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        props.setOpenLogin(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setPreset(preset);
        props.setCloud(cloud);
        props.setLogged(true);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter your Cloudinary details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Upload preset</Form.Label>
                        <Form.Control type="text" onChange={(e) => setPreset(e.target.value)} value={preset} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Cloud name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setCloud(e.target.value)} value={cloud} required />
                    </Form.Group>
                    <Button variant="primary" className='me-2' type="submit">Submit</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export { Login }