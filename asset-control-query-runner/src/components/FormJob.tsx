import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class FormJob extends React.Component {
  render() {
    return (
      <Form>
        <Form.Text style={{fontSize: 40}}> New Job </Form.Text>
        <div style={{margin: '2%', textAlign: 'left'}}>

          <Form.Group as={Col} controlId="formJobShortname">
            <Form.Label>Job Shortname</Form.Label>
            <Form.Control placeholder="shortname"/>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formJobLongName">
            <Form.Label>Job Longname</Form.Label>
            <Form.Control placeholder="longname"/>
          </Form.Group>
      
        <Form.Group as={Col} controlId="formJobHandlin">
          <Form.Label>Job Handlin</Form.Label>
          <Form.Control placeholder="job handlin"/>
        </Form.Group>
      
        <Form.Group as={Col} controlId="formConfigADO">
          <Form.Label>Config ADO</Form.Label>
          <Form.Control placeholder="config ado" />
        </Form.Group>
      
          <Form.Group as={Col} controlId="formListId">
            <Form.Label>List ID</Form.Label>
            <Form.Control placeholder="list id" />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formTemplateId">
            <Form.Label>Template Id</Form.Label>
            <Form.Control placeholder="template id"/>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formSourceShortname">
            <Form.Label>Source Shortname</Form.Label>
            <Form.Control placeholder="source shortname"/>
          </Form.Group>
          
          <Form.Group as={Col} controlId="formUproc">
            <Form.Label>UPROC</Form.Label>
            <Form.Control placeholder="uproc"/>
          </Form.Group>
          
          <Form.Group as={Col} controlId="formCalendar">
            <Form.Label>Calendar</Form.Label>
            <Form.Control placeholder="calendar"/>
          </Form.Group>

        </div>
    
      <Button variant="primary" type="submit">
        Generate Query
      </Button>
    </Form>
    );
  }
}

export default FormJob;