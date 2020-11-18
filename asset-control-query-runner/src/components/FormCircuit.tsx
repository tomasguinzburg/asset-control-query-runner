import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import FormFile from 'react-bootstrap/FormFile';
import ReactDOM from 'react-dom';


type FormCircuitForm = {
  formCircuitShortname: string
  formCircuitLongName: string
  formDistributionTime: string
  formTreeId: string
  formCalendar: string
  formProduct: string
  formGroupId: string
}

const circuitForm: FormCircuitForm = {
  formCircuitShortname: '',
  formCircuitLongName: '',
  formDistributionTime: '',
  formTreeId: '',
  formCalendar: '',
  formProduct: '',
  formGroupId: ''
};

const handleSubmit = (event: any) => {
  event.preventDefault();
}

class FormCircuit extends React.Component {

   render() {

     return (
       <Form onSubmit={handleSubmit}>
       <Form.Text style={{fontSize: 40}}> New Circuit </Form.Text>
        <div style={{margin: '2%', textAlign: 'left'}}>
        <Form.Group  as={Col} controlId="formCircuitShortname">
          <Form.Label>Circuit Shortname</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formCircuitShortname = e.target.value} placeholder="shortname"/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formCircuitLongName">
          <Form.Label>Circuit Longname</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formCircuitLongName = e.target.value} placeholder="longname"/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formDistributionTime">
          <Form.Label>Distribution Time</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formDistributionTime = e.target.value} placeholder="aaaa/mm/dd hh:mm:sss"/>
        </Form.Group>
      
        <Form.Group as={Col} controlId="formTreeId">
          <Form.Label>Tree id</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formTreeId = e.target.value} placeholder="Tree id"/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formCalendar">
          <Form.Label>Calendar</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formCalendar = e.target.value} placeholder="calendar"/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formProduct = e.target.value} placeholder="product"/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGroupId">
          <Form.Label>Group Id</Form.Label>
          <Form.Control onChange={ (e) => circuitForm.formGroupId = e.target.value} placeholder="group id"/>
        </Form.Group>
      </div>
    
      <Button variant="primary" type="submit">
        Generate Query
      </Button>
    </Form>
     );
   }
}

export default FormCircuit;