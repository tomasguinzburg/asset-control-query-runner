import React from 'react';
import Moment from 'moment';
import { Layout
       , Breadcrumb
       , Form
       , Input
       , Button 
       , List
       , Avatar
       , Col,
       DatePicker
       } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DatabaseOutlined } from '@ant-design/icons';
import ModalCircuit from '../results/ModalCircuit';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { FormValues } from './FormValues';
import EditCircuit from './EditCircuit';

const {Content} = Layout;
const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

interface AddCircuitState {
  queryHistory: FormValues[],
  displayResults: boolean,
}

class AddCircuit extends React.Component<{}, AddCircuitState> {

formRef = React.createRef<FormInstance>();

  constructor(props: any){
    super(props);
    this.state = {
      queryHistory: [],
      displayResults: false
    };
  }

  onFinish = (values: FormValues) => {
    values.distributionTime = Moment(values.distributionTime).format('YYYY-MM-DD HH:mm:ss');
    const history = this.state.queryHistory.concat(values);
    this.setState({queryHistory: history});
    this.formRef.current?.resetFields();
  }
  
  render() {
    return (
      <Switch>
        <Route exact path="/circuits">
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
            <Form.Item label="circuit_shortname" 
                   name="circuitShortname"
                   hasFeedback
                   rules={[{ required: true, type: 'string' }]}
        >
              <Col span={6}>
                <Input placeholder="circuit_shortname" />
              </Col>
            </Form.Item>
            <Form.Item label="circuit_longname" 
                      name="circuitLongname"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Col span={10}>
              <Input placeholder="circuit_longname" />
              </Col>
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
              <Col span={4}>
                <Input placeholder="tree_id" />
              </Col>
            </Form.Item>
            <Form.Item label="calendar" 
                      name="calendar"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >
              <Col span={4}>
                <Input placeholder="calendar" />
              </Col>
            </Form.Item>
            <Form.Item label="product" 
                      name="product"
                      hasFeedback
                      rules={[{ required: true, type: 'string' }]}
            >

              <Col span={10}>
                <Input placeholder="product" />
              </Col>
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
              <Col span={3}>
                <Input placeholder="0"/>
              </Col>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary"  htmlType="submit" >Add Query</Button>
              { this.state.queryHistory.length > 0 ? <Button htmlType="button" onClick={() => this.showModal()} >Generate SQL</Button> 
                                              : <Button htmlType="button" disabled>Add a query first</Button> 
              }
            </Form.Item>
            <Form.Item label="Query List"
                      shouldUpdate={(prevValues, curValues) => prevValues.history !== curValues.history}
            >
              <List 
                  itemLayout="horizontal"
                  dataSource={this.state.queryHistory}
                  bordered
                  split
                  rowKey={(e) => e.circuitShortname}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<DatabaseOutlined />} />}
                        title={<Link to={window.location.href + "/circuits/" + index}>{index + ": " + item.circuitShortname}</Link> }
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
                        queries={this.state.queryHistory.map((e) => this.createQuery(e))}/>
          </Content>
        </Route>
        <Route path={`/circuits/:circuit_id`}>
          <EditCircuit query={this.state.queryHistory[0]} onFinish={this.onEdit} index={0}/>
        </Route>
      </Switch>
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

  onEdit = (index: number = 0, form : FormValues) => {
    const queryHistory = this.state.queryHistory.slice(0, index).concat(form).concat(this.state.queryHistory.slice(index+1))
    this.setState({queryHistory: queryHistory}); 
  }

  showModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({
      queryHistory: [],
      displayResults: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      displayResults: false,
    });
  };

  isNumeric = (s: string) => {
    return !isNaN(parseInt(s));
  }
}

export default AddCircuit;