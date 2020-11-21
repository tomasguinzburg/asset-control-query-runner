import React, { useState } from 'react';
import { Modal, Button } from 'antd';


interface ModalCircuitOwnProps {
  visible: boolean,
  handleOk: (e: any) => void;
  handleCancel: (e: any) => void;
  queries: string[];
}


class ModalCircuit extends React.Component<ModalCircuitOwnProps> {
  
  render() {
    return (
      <Modal
        title="Modal 1000px width"
        centered
        visible={this.props.visible}
        onOk={(e) => this.props.handleOk(e)}
        onCancel={(e) => this.props.handleCancel(e)}
        width={1000}
      >{this.props.queries.map((q: string) => (
        <p>
            {q}
        </p>
      ))}
      </Modal>
    );

  }

}

export default ModalCircuit;