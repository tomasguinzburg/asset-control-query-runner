import React from 'react';
import Moment from 'moment';
import { CircuitFormValues } from './CircuitFormValues';

import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store/root-reducer';
import { editCircuit } from '../../store/md-circuits/actions';

import { Breadcrumb, Form, Input, DatePicker, Card, PageHeader, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { createFormatedQuery, createUnformatedQuery } from './ParseCircuit';
import { Circuit } from '../../store/md-circuits/types';

const {Option} = Select;

//
// Redux+Typescript boilerplate
//
const mapState = (state: RootState) => ({
  circuit: state.circuits.circuitsHistory[state.circuits.selected] as Circuit
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

    
  componentDidUpdate(){
    this.formRef.current?.resetFields();
  }


  onFinish = (values: CircuitFormValues) => {
    this.props.editCircuit({ ...values 
                          , ID: this.props.circuit.ID
                          , distributionTime: Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss')
                          , name: () => values.circuitShortname
                          , description: () => JSON.stringify(values, null, 1)
                          , tag: () => "MD_CIRCUITS -" 
                          , createFormatedQuery: () => createFormatedQuery(values)
                          , createUnformatedQuery: () => createUnformatedQuery(values)
                          , path: () => `/circuits/${this.props.circuit.ID}`
                          , type: () => "circuit"
                          });
    this.formRef.current?.resetFields();
    this.props.history.push('/circuits')
  }
  
  render() {
    if (this.props.circuit !== undefined)
      return (
        <PageHeader title="Edit"
        onBack={() => this.props.history.push('/circuits')}>
        <div style={{marginTop: 10}}>
        <Card
        title={`MD_CIRCUITS - ${this.props.circuit.ID}`}
        bordered={true} 
        style={{width: "calc(100%)"}}
        size="small"
        actions={[
          <CheckCircleFilled onClick={() => this.formRef.current?.submit()} className="checkMark" style={{fontSize: "32px"}}/>
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
              groupID: this.props.circuit.groupID,
              typeShortname: this.props.circuit.typeShortname
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
              <Form.Item label="type_shortname"
              name="typeShortname"
              rules={[{required: true, type: 'string'}]}>
              <Select style={{width: "calc(10%)"}} > 
                <Option value="REV">REV</Option>
                <Option value="MD">MD</Option>
              </Select>
            </Form.Item>
            </Form>
            </Card>
            </div>
            </PageHeader>
      );
    this.props.history.push('/')
    return (<div>Esto nunca se dibuja</div>)
   }

}

export default connector(EditCircuit)    //El AddCircuit que se exporta es igual pero diferente