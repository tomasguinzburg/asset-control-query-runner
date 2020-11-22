import React from 'react';
import { Layout
       , Breadcrumb
       , Form
       , Input
       , Button 
       } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormValues } from './FormValues';

const {Content} = Layout;
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

interface EditCircuitProps {
  query: FormValues,
  onFinish: (index: number, values :FormValues) => void,
  index: number,
}

class EditCircuit extends React.Component<EditCircuitProps> {

  constructor(props: EditCircuitProps){
    super(props)
    console.log("entered")
  }

  formRef = React.createRef<FormInstance>();
  
  render() {
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Query Runner</Breadcrumb.Item>
          <Breadcrumb.Item>New Circuit</Breadcrumb.Item>
        </Breadcrumb>
        <Form
        name="control-ref"
        ref={this.formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={() => this.props.onFinish.bind(0)}
        >
          <Form.Item label="circuit_shortname" 
                    name="circuitShortname"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.circuitShortname} />
          </Form.Item>
          <Form.Item label="circuit_longname" 
                    name="circuitLongname"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.circuitLongname} />
          </Form.Item>
          <Form.Item label="distribution_time" 
                    name="distributionTime"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.distributionTime} />
          </Form.Item>
          <Form.Item label="tree_id" 
                    name="treeID"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.treeID} />
          </Form.Item>
          <Form.Item label="calendar" 
                    name="calendar"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.calendar} />
          </Form.Item>
          <Form.Item label="product" 
                    name="product"
                    hasFeedback
                    rules={[{ required: true, type: 'string' }]}
          >
            <Input placeholder={this.props.query.product} />
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
            <Input placeholder={this.props.query.groupID}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary"  htmlType="submit" >Modify query</Button>
            <Button htmlType="button" onClick={() => this.discard()} >Abort changes</Button> 
          </Form.Item>
        </Form>
        </Content>
     );
   }

  discard = () => {
    this.setState({
      displayResults: true,
    });
  }

  isNumeric = (s: string) => {
    return !isNaN(parseInt(s));
  }
}

export default EditCircuit;