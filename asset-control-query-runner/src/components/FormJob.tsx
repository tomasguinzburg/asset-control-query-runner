import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class FormJob extends React.Component {
  render() {
    return (
      <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formJobShortname">
          <Form.Label>Job Shortname</Form.Label>
          <Form.Control/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formJobLongName">
          <Form.Label>Job Longname</Form.Label>
          <Form.Control/>
        </Form.Group>
      </Form.Row>
    
      <Form.Group controlId="formJobHandlin">
        <Form.Label>Job Handlin</Form.Label>
        <Form.Control/>
      </Form.Group>
    
      <Form.Group controlId="formConfigADO">
        <Form.Label>Config ADO</Form.Label>
        <Form.Control />
      </Form.Group>
    
      <Form.Row>
        <Form.Group as={Col} controlId="formListId">
          <Form.Label>List ID</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formTemplateId">
          <Form.Label>Template Id</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formSourceShortname">
          <Form.Label>Source Shortname</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>
        
        <Form.Group as={Col} controlId="formUproc">
          <Form.Label>UPROC</Form.Label>
          <Form.Control />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formCalendar">
          <Form.Label>Calendar</Form.Label>
          <Form.Control />
        </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    );
  }
}

export default FormJob;