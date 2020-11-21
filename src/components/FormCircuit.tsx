import React from 'react';
import { Layout
  , Breadcrumb
  , Form
  , Input
  , Button
  , Avatar
  , Typography 
  } from 'antd';
import { FormInstance } from 'antd/lib/form';
<<<<<<< HEAD
import ModalCircuit from './results/ModalCircuit';
=======
import ModalCircuit from './ModalCircuit';
import { SmileOutlined, DatabaseOutlined } from '@ant-design/icons';
>>>>>>> a12495d5544172f3ad36acbd24cbc76af2b6d155

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

class FormCircuit extends React.Component<{}, {history: CircuitForm[], displayResults: boolean}> {

  formRef = React.createRef<FormInstance>();

  constructor(props: any){
    super(props);
    this.state = {
      history: [],
      displayResults: false
    };
  }

  onFinish = (values: CircuitForm) => {
    const history = this.state.history.concat(values);
    this.setState({history: history});
    this.formRef.current?.resetFields();
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
        <Form.Item label="Tree id" name="treeID">
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
<<<<<<< HEAD
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary"  htmlType="button" onClick={() => this.showModal()} >Generate Query</Button>
        </Form.Item>
      </Form>
      <ModalCircuit visible={this.state.displayResults} 
                    handleOk= {(e: any) => this.handleOk(e)} 
                    handleCancel= {(e: any) => this.handleCancel(e)} 
                    queries={this.state.history.map((e) => this.createQuery(e))}/>
=======
          <Button  htmlType="button" onClick={() => this.generateQueries()} >Generate Query</Button>
        </Form.Item>
      </Form>
      <Form.Item
            label="Query List"
            shouldUpdate={(prevValues, curValues) => prevValues.history !== curValues.history}
          >
      {({}) => 
      {
              return this.state.history.length ? (
                <ul>
                  {this.state.history.map((h: CircuitForm, index: any) => (
                    <li key={index} className="history">
                      <Avatar icon={<DatabaseOutlined />} />
                      {index} - {h.circuitShortname}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> No queries yet. )
                </Typography.Text>
              );
            }}
      </Form.Item>
      {/* <ModalCircuit visible={this.state.displayResults} handleOk= {(e: any) => this.handleOk(e)} handleCancel= {(e: any) => this.handleCancel(e)} /> */}
>>>>>>> a12495d5544172f3ad36acbd24cbc76af2b6d155
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
                                                  , to_timestamp('${form.distributionTime}', 'yyyy/mm/dd HH24:mi:ss)'
                                                  , '${form.treeID}'
                                                  , '${form.calendar}'
                                                  , '${form.product}'
                                                  , ${form.groupId}
                                                  , (select TYPE_ID from SAN_AC_MR_PRO.MD_TYPES where TYPE_SHORTNAME = 'MD')
                                                  );`;
  }

  showModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      history: [],
      displayResults: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      displayResults: false,
    });
  };

}

export default FormCircuit;