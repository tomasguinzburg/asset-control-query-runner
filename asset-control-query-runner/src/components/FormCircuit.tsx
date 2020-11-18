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


let insertQuery: string;

let param1: string;

let param2: string ; 
let param3: string ;
let param4: string ;
let param5: string ;
let param6: string ;
let param7: string ;
let param8: string ;
let param9: string ;

const handleSubmit = (event: any) => {
  event.preventDefault();
  createQuery();
  console.log(insertQuery+param1+param2+param3+param4+param5+param6+param7+param8+param9);
}

function createQuery() {
  insertQuery = 'insert into SAN_AC_MR_PRO.MD_CIRCUITS (CIRCUIT_ID, CIRCUIT_SHORTNAME, CIRCUIT_LONGNAME, DISTRIBUTION_TIME, TIME_ZONE_ID, TREE_ID, CALENDAR, PRODUCT, GROUP_ID, TYPE_ID) values (';
  param1 = 'SAN_AC_MR_PRO.CIRCUIT_SEQ.NextVal,';
  param2 = '\''+circuitForm.formCircuitShortname+'\',';
  param3 = '\''+circuitForm.formCircuitLongName+'\',';
  param4 = 'to_timestamp(\''+circuitForm.formDistributionTime+'\', \'yyyy/mm/dd HH24:mi:ss\'),';
  param5 = '\''+circuitForm.formTreeId+'\',';
  param6 = '\''+circuitForm.formCalendar+'\',';
  param7 = '\''+circuitForm.formProduct+'\',';
  param8 = circuitForm.formGroupId+',';
  param9 = '(select type_id from SAN_AC_MR_PRO.MD_TYPES where type_shortname =\'MD\'));';
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