import React from 'react';
import { Tab, Row, Nav, Col} from 'react-bootstrap';
import FormCircuit from './FormCircuit';
import FormJob from './FormJob';

class TabNav extends React.Component {

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="second"> 
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first" disabled>Orden 0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Orden 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Circuits</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fourth">Jobs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="five">Ultimo Orden</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <p>
                      Your message
                    </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <p>
                      Your message
                    </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <FormCircuit/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <FormJob/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="five">
                    <p>
                      Your message
                    </p>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        );
    }
}

export default TabNav;