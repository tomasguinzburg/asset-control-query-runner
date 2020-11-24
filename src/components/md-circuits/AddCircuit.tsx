import React from 'react';
import Moment from 'moment';

import { FormValues } from './FormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { addCircuit, changeCircuitSelection, clearQueries, deleteCircuit } from '../../store/md-circuits/actions';

import { Breadcrumb, Form, Input, Button, Col, DatePicker, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';


const mapState = (state: RootState) => ({
  circuitsHistory: state.circuits.circuitsHistory
});

const mapDispatch = {
  addCircuit: addCircuit,
  deleteCircuit: deleteCircuit,
  changeCircuitSelection: changeCircuitSelection,

  clearQueries: clearQueries,
};

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>


class AddCircuit extends React.Component<PropsFromRedux, { displayResults: boolean }> {

  formRef = React.createRef<FormInstance>();

  constructor(props: PropsFromRedux){
    super(props);
    this.state = {
      displayResults: false
    };
  }

  onFinish = (values: FormValues) => {
    this.props.addCircuit({ ...values 
                          , ID: this.generateID()
                          , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
                          });

    React.createRef<FormInstance>().current?.resetFields();
  }
  
  generateID = () => this.props.circuitsHistory.sort((a, b) => (a.ID - b.ID))
                                               .reduce((acc, curr) => (acc === curr.ID ? acc+1 : acc), 0)

  showModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({     
      displayResults: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      displayResults: false,
    });
  };

  render() {
    return (
          <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query Runner</Breadcrumb.Item>
            <Breadcrumb.Item>New Circuit</Breadcrumb.Item>
          </Breadcrumb>
          <Form
          name="control-ref"
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={this.onFinish}
          >
            <Form.Item label="circuit_shortname" 
                   name="circuitShortname"
                   hasFeedback
                   rules={[{ required: true, type: 'string' }]}
        >
                <Input placeholder="circuit_shortname" style={{width: "calc(25%)" }}/>
            </Form.Item>
            <Form.Item label="circuit_longname" 
                      name="circuitLongname"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Input placeholder="circuit_longname" style={{width: "calc(40%)" }}/>
            </Form.Item>
            <Form.Item label="distribution_time" 
                   name="distributionTime"
                   hasFeedback
                   rules={[{ required: true, message: 'Please select time!' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="tree_id" 
                      name="treeID"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input placeholder="tree_id" style={{width: "calc(10%)" }} />
            </Form.Item>
            <Form.Item label="calendar" 
                      name="calendar"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input placeholder="calendar" style={{width: "calc(10%)" }}/>
            </Form.Item>
            <Form.Item label="product" 
                      name="product"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input placeholder="product" style={{width: "calc(40%)" }}/>
            </Form.Item>
            <Form.Item label="group_id" 
                      name="groupID"
                      hasFeedback
                      rules={[{ required: true, type: 'string'}
                              ,  ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!isNaN(value)) {
                                          return Promise.resolve();
                                        }
                                    return Promise.reject('group_id should be numeric');
                                    }
                                })
                              ]}
            >
                <Input placeholder="0" style={{width: "calc(10%)" }}/>
            </Form.Item>
            <Form.Item {...{wrapperCol: { offset: 9, span: 16 }}}>
                <Row>
                  <Col span={3}>
                    <Button type="primary" htmlType="submit" >Add</Button>
                  </Col>
                </Row>
              </Form.Item>
          </Form>
          </div>
     );
   }
}

export default connector(AddCircuit)