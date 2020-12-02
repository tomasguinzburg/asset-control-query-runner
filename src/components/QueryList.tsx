import { Button, Card, Col, List, Modal, Row, Tooltip } from "antd";
import React from "react"
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { changeCircuitSelection, clearQueries, deleteCircuit } from "../store/md-circuits/actions";
import { RootState } from "../store/root-reducer";
import { DatabaseFilled, CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import ModalCircuit from './results/ModalCircuit';
import { changeJobSelection, deleteJob } from "../store/md-jobs/actions";
import { changeCircuitJobSelection, deleteCircuitJob } from "../store/last-order/md-circuits-jobs/actions";
import { changeCircuitAttributeSelection, deleteCircuitAttribute } from "../store/last-order/md-circuits-attributes/actions";

const mapState = (state: RootState) => ({
  circuitsHistory: state.circuits.circuitsHistory,
  jobsHistory: state.jobs.jobsHistory,
  circuitsJobsHistory: state.circuitsJobs.circuitsJobsHistory,
  circuitsAttributesHistory: state.circuitsAttributes.circuitsAttributesHistory
});

const mapDispatch = {
  clearQueries: clearQueries,

  changeCircuitSelection: changeCircuitSelection,
  changeJobSelection: changeJobSelection,
  changeCircuitJobSelection: changeCircuitJobSelection,
  changeCircuitAttributeSelection: changeCircuitAttributeSelection,
  
  deleteCircuitJob: deleteCircuitJob,
  deleteCircuit: deleteCircuit,
  deleteJob: deleteJob,
  deleteCircuitAttribute: deleteCircuitAttribute
};

const connector = connect( mapState, mapDispatch )
type PropsFromRedux = ConnectedProps<typeof connector>


class QueryList extends React.Component<PropsFromRedux, { displayResults: boolean, displayDanger: boolean }> {

  constructor(props: PropsFromRedux){
    super(props);
    this.state = {
      displayResults: false,
      displayDanger: false,
    };
  }

  concatList = () => {
    return this.props.circuitsHistory.concat(this.props.jobsHistory).concat(this.props.circuitsJobsHistory).concat(this.props.circuitsAttributesHistory).reverse()  
  }

  showResultModal = () => {
    this.setState({
      displayResults: true,
    });
  };

  handleOkResultModal = (e: any) => {
    this.setState({     
      displayResults: false,
    });
  };

  render() {
    return (
      <div style={{marginTop: 10}}>
      <Card title="Query list" style={{maxHeight: "280px"}} size="small">
      <Row>
        <Col span={4}/>
        <Col span={16}>
        {/* <div style={{maxHeight: "200px", overflowY: "scroll", border: "#fff"}}> */}
          <List
            itemLayout="horizontal"
            dataSource={this.concatList()}
            bordered
            split
            size="small"
            rowKey={(e) => e.name()}
            style={{overflowY: "scroll", maxHeight: "220px"}}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Button shape="circle" icon={<DatabaseFilled />} />}
                  title={<Link to={{pathname: item.path()}} onClick={ () => {
                    if (item.type() === "circuit")
                      return this.props.changeCircuitSelection(item.ID)
                    else if (item.type() === "job")
                      return this.props.changeJobSelection(item.ID)
                    else if (item.type() === "circuit-job")
                      return this.props.changeCircuitJobSelection(item.ID)
                    else if (item.type() === "circuit-attribute")
                      return this.props.changeCircuitAttributeSelection(item.ID)
                  }}>{item.tag() + item.ID + ": " + item.name()}</Link> }
                  description={item.description()}
                />
                <CloseCircleFilled className="removeQuery" onClick={() => {
                  if (item.type() === "circuit")
                    return this.props.deleteCircuit(item.ID)
                  else if (item.type() === "job")
                    return this.props.deleteJob(item.ID)
                  else if (item.type() === "circuit-job")
                    return this.props.deleteCircuitJob(item.ID)
                  else if (item.type() === "circuit-attribute")
                    return this.props.deleteCircuitAttribute(item.ID)
                }} />
              </List.Item>
            )}
          >
          </List>     
        </Col>
        <div style={{ marginRight:10, float: 'right', display: 'flex', alignItems: "flex-end"}}>
          <Col span={2} >
            {this.concatList().length > 0 ?
            <div>
              <Tooltip title="Show SQL">
                <Button htmlType="button" type="primary" icon={<DatabaseFilled/>} onClick={() => this.showResultModal()} ></Button>
              </Tooltip>
              <Tooltip title="Clear queue">
                <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => this.setState({displayDanger: true})} />
              </Tooltip>   
            </div>: "" 
            }
          </Col>
        </div>
      </Row>
      <ModalCircuit visible={this.state.displayResults} 
                    handleOk= {(e: any) => this.handleOkResultModal(e)} 
                    prettySql={this.concatList().map((e) => e.createFormatedQuery())}
                    tinySql={this.concatList().map((e) => e.createUnformatedQuery())}/>
      <Modal
        title="Are you sure you want to erase all queries?"
        centered
        visible={this.state.displayDanger}
        onCancel={(e) => this.setState({displayDanger: false})}
        cancelText="Cancel"
        onOk={() => {this.props.clearQueries(); this.setState({displayDanger: false});}}
        okText="Erase"
        width={512}
        className="modal"
        okButtonProps={{danger: true}}
      >
        This action cannot be undone
      </Modal>
      </Card>
      </div>
    )
  }
}

export default connector(QueryList)