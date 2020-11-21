import React from 'react';
import { Layout
       , Breadcrumb
       , Form
       , Input
       , Button 
       } from 'antd';
import { FormInstance } from 'antd/lib/form';

const {Content} = Layout;
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

type CircuitForm = {
  circuitShortname: string
  circuitLongname: string
  distributionTime: string
  treeID: string  
  calendar: string
  product: string
  groupId: string
} 

class FormCircuit extends React.Component<{}, {history: CircuitForm[]}> {

  formRef = React.createRef<FormInstance>();

  constructor(props: any){
    super(props);
    this.state = {
      history: []
    };
  }

  onFinish = (values: CircuitForm) => {
    const history = this.state.history.concat(values);
    this.setState({history: history});
    this.formRef.current?.resetFields();
  }

  generateQueries = () => {
    const queries: string[] = this.state.history.map((e) => this.createQuery(e));

    queries.forEach(element => {
      console.log(element)
    });
  }
  
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
      onFinish={this.onFinish}
      >
        <Form.Item label="Circuit Shortname" name="circuitShortname">
          <Input placeholder="Circuit Shortname" />
        </Form.Item>
        <Form.Item label="Circuit Longname" name="circuitLongname">
          <Input placeholder="Circuit Longname" />
        </Form.Item>
        <Form.Item label="Distribution Time" name="distributionTime">
          <Input placeholder="Distribution Time" />
        </Form.Item>
        <Form.Item label="Tree id" name="treeId">
          <Input placeholder="Tree id" />
        </Form.Item>
        <Form.Item label="Calendar" name="calendar">
          <Input placeholder="Calendar" />
        </Form.Item>
        <Form.Item label="Product" name="product">
          <Input placeholder="Product" />
        </Form.Item>
        <Form.Item label="Group Id" name="groupId">
          <Input placeholder="group id"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary"  htmlType="submit" >Add Query</Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary"  htmlType="button" onClick={() => this.generateQueries()} >Generate Query</Button>
        </Form.Item>
      </Form>
      </Content>
     );
   }


  createQuery = (form: CircuitForm): string => {
    return `insert into SAN_AC_MR_PRO.MD_CIRCUITS ( CIRCUIT_ID
                                                  , CIRCUIT_SHORTNAME
                                                  , CIRCUIT_LONGNAME
                                                  , DISTRIBUTION_TIME
                                                  , TIME_ZONE_ID
                                                  , TREE_ID
                                                  , CALENDAR
                                                  , PRODUCT
                                                  , GROUP_ID
                                                  , TYPE_ID
                                                  )
                                          values ( SAN_AC_MR_PRO.CIRCUIT_SEQ.NEXTVAL
                                                  , '${form.circuitShortname}'
                                                  , '${form.circuitLongname}'
                                                  , to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss)
                                                  , '${form.treeID}'
                                                  , '${form.calendar}'
                                                  , '${form.product}'
                                                  , ${form.groupId}
                                                  , (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = 'MD')
                                                  );`;
  }

}

export default FormCircuit;