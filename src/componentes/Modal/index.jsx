// ModalComponent.jsx
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    backgroundColor: '#201d1d',
    color: '#fff',
    zIndex: 1050 // Valor alto para garantir que o modal esteja à frente
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1040 // Garantindo que o overlay também tenha um z-index alto
  },
};


const ModalComponent = ({ modalIsOpen, closeModal, children }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
