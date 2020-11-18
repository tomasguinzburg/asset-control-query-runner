import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';


class FormCircuit extends React.Component {
   render() {
     return (
      <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formCircuitShortname">
          <Form.Label>Circuit Shortname</Form.Label>
          <Form.Control/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formCircuitLongName">
          <Form.Label>Circuit Longname</Form.Label>
          <Form.Control/>
        </Form.Group>
      </Form.Row>
    
      <Form.Group controlId="formDistributionTime">
        <Form.Label>Distribution Time</Form.Label>
        <Form.Control/>
      </Form.Group>
    
      <Form.Group controlId="formTreeId">
        <Form.Label>Tree id</Form.Label>
        <Form.Control />
      </Form.Group>
    
      <Form.Row>
        <Form.Group as={Col} controlId="formCalendar">
          <Form.Label>Calendar</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGroupId">
          <Form.Label>Group Id</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
     );
   }
}

export default FormCircuit;