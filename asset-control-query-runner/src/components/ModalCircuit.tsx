import React, { useState } from 'react';
import { Modal, Button } from 'antd';


class ModalCircuit extends React.Component<{}, {visible: Boolean}> {
  
  state = {
    visible: false,
    disabled: true,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
      {/* <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title="Modal 1000px width"
        centered
        visible={this.state.visible}
        onOk={() => this.handleOk}
        onCancel={() => this.handleCancel}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
    );

  }

}

export default ModalCircuit;