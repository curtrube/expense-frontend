// import { useState } from 'react';
import { Button, Modal as BsModal } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleSubmit, name }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <BsModal show={show} onHide={handleClose}>
        <BsModal.Header closeButton>
          <BsModal.Title>Delete Category</BsModal.Title>
        </BsModal.Header>
        <BsModal.Body>
          Delete <b>{name}</b>?
        </BsModal.Body>
        <BsModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Confirm
          </Button>
        </BsModal.Footer>
      </BsModal>
    </>
  );
};

export default DeleteModal;
