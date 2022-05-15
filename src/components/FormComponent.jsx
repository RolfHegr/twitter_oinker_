import { Button } from 'bootstrap'
import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormComponent() {
  return (
    <div>
        <Form>
            <Form.Group type="input">
            </Form.Group>
            <Button>Click me</Button>
        </Form>
    </div>
  )
}
