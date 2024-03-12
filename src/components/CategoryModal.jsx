import { Button, Modal, Form } from 'react-bootstrap';

export default function CategoryModal({
  show,
  title,
  handleClose,
  handleChange,
  handleSubmit,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Category name"
              onChange={handleChange}
              autoFocus
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
