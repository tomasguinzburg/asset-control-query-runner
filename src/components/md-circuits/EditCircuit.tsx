import React from 'react';
import Moment from 'moment';

import { BrowserRouter as Router, Link} from 'react-router-dom';

import { FormValues } from './FormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { editCircuit } from '../../store/md-circuits/actions';

import { Breadcrumb, Form, Input, Button, Col, DatePicker, Row, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

//
// Styles
//
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

//
// Redux+Typescript boilerplate
//
const mapState = (state: RootState) => ({
  circuit: state.circuits.circuitsHistory[state.circuits.selected]
});

const mapDispatch = {
  editCircuit: editCircuit,
};

interface OwnProps {
  history: string[],
}

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>

//
// Component
//
class EditCircuit extends React.Component<PropsFromRedux & OwnProps> {

  formRef = React.createRef<FormInstance>();


  onFinish = (values: FormValues) => {
    this.props.editCircuit({ ...values 
                          , ID: this.props.circuit.ID
                          , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
                          });
    this.formRef.current?.resetFields();
    this.props.history.push('/circuits')
  }
  
  render() {
    return (
      <Card title={`Edit MD_CIRCUITS - ${this.props.circuit.ID}`}
      bordered={true} 
      style={{width: "calc(100%)"}}
      actions={[
        <CloseCircleFilled onClick={() => this.props.history.push('/circuits')} className="closeCircle" style={{fontSize: "32px"}}/>,
        <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="checkMark"style={{fontSize: "32px"}}/>
      ]}
>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Query-runner</Breadcrumb.Item>
            <Breadcrumb.Item>Edit  MD_CIRCUITS - {this.props.circuit.ID}</Breadcrumb.Item>
          </Breadcrumb>
          <Form
          name="control-ref"
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={this.onFinish}
          size="small"
          initialValues={{
            circuitShortname: this.props.circuit.circuitShortname,
            circuitLongname: this.props.circuit.circuitLongname,
            distributionTime: Moment(this.props.circuit.distributionTime),
            treeID: this.props.circuit.treeID,
            calendar: this.props.circuit.calendar,
            product: this.props.circuit.product,
            groupID: this.props.circuit.groupID
          }}
          >
            <Form.Item label="circuit_shortname" 
                   name="circuitShortname"
                   hasFeedback
                   rules={[{ required: true, type: 'string' }]}
        >
                <Input style={{width: "calc(25%)" }}/>
            </Form.Item>
            <Form.Item label="circuit_longname" 
                      name="circuitLongname"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Input style={{width: "calc(40%)" }}/>
            </Form.Item>
            <Form.Item label="distribution_time" 
                   name="distributionTime"
                   hasFeedback
                   rules={[{ required: true, message: 'Please select time!' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
            <Form.Item label="tree_id" 
                      name="treeID"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input style={{width: "calc(10%)" }}/>
            </Form.Item>
            <Form.Item label="calendar" 
                      name="calendar"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input style={{width: "calc(10%)" }}/>
            </Form.Item>
            <Form.Item label="product" 
                      name="product"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
                <Input style={{width: "calc(40%)" }}/>
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
                <Input style={{width: "calc(10%)" }}/>
            </Form.Item>
          </Form>
          </Card>
     );
   }

}

export default connector(EditCircuit)    //El AddCircuit que se exporta es igual pero diferente