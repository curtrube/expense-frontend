// import { useState } from 'react';
import { Button, Modal as BsModal } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleSave, name }) => {
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
          Are you sure delete category <b>{name}</b> ?
        </BsModal.Body>
        <BsModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </BsModal.Footer>
      </BsModal>
    </>
  );
};

export default DeleteModal;
