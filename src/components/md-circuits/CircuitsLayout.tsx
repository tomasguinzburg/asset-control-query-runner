import React from 'react';
import { Layout
       , Breadcrumb
       , Form
       , Input
       , Button 
       , List
       , Avatar
       , Typography
       } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ExclamationCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
import ModalCircuit from '../results/ModalCircuit';

const {Content} = Layout;
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

type FormValues = {
  circuitShortname: string
  circuitLongname: string
  distributionTime: string
  treeID: string  
  calendar: string
  product: string
  groupID: string
} 

class CircuitsLayout extends React.Component<{}, {history: FormValues[], displayResults: boolean}> {

  formRef = React.createRef<FormInstance>();

  constructor(props: any){
    super(props);
    this.state = {
      history: [],
      displayResults: false
    };
  }

  onFinish = (values: FormValues) => {
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
        <Form.Item label="circuit_shortname" name="circuitShortname">
          <Input placeholder="circuit_shortname" />
        </Form.Item>
        <Form.Item label="circuit_longname" name="circuitLongname">
          <Input placeholder="circuit_longname" />
        </Form.Item>
        <Form.Item label="distribution_time" name="distributionTime">
          <Input placeholder="distribution_time" />
        </Form.Item>
        <Form.Item label="tree_id" name="treeID">
          <Input placeholder="tree_id" />
        </Form.Item>
        <Form.Item label="calendar" name="calendar">
          <Input placeholder="calendar" />
        </Form.Item>
        <Form.Item label="product" name="product">
          <Input placeholder="product" />
        </Form.Item>
        <Form.Item label="group_id" name="groupID">
          <Input placeholder="group_id"/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary"  htmlType="submit" >Add Query</Button>
          { this.state.history.length > 0 ? <Button htmlType="button" onClick={() => this.showModal()} >Generate SQL</Button> 
                                          : <Button htmlType="button" disabled>Add a query first</Button> 
          }
        </Form.Item>
        <Form.Item label="Query List"
                   shouldUpdate={(prevValues, curValues) => prevValues.history !== curValues.history}
        >
          <List 
              itemLayout="horizontal"
              dataSource={this.state.history}
              bordered
              split
              rowKey={(e) => e.circuitShortname}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<DatabaseOutlined />} />}
                    title={index + ": " + item.circuitShortname}
                    description={`circuit_shortname: ${item.circuitShortname}, circuit_longname: ${item.circuitLongname}, calendar:${item.calendar}, distribution_time: ${item.distributionTime}, tree_id: ${item.treeID}, group_id: ${item.groupID}, product: ${item.product}`}
                  />
                </List.Item>
              )}
            />
      </Form.Item>
      </Form>
      


      <ModalCircuit visible={this.state.displayResults} 
                    handleOk= {(e: any) => this.handleOk(e)} 
                    handleCancel= {(e: any) => this.handleCancel(e)} 
                    queries={this.state.history.map((e) => this.createQuery(e))}/>
      </Content>
     );
   }


  createQuery = (form: FormValues): string => {
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
                                      , ${form.groupID}
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

export default CircuitsLayout;