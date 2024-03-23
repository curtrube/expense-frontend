import { Button, Modal, Form } from 'react-bootstrap';

export default function CategoryModal({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  type,
  name,
  description,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{type === 'edit' ? 'Edit' : 'New'} category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              required
              type="text"
              name="name"
              defaultValue={name ? name : ''}
              placeholder="Name"
              onChange={handleChange}
              autoFocus
              aria-describedby="newCategoryName"
            />
            <Form.Text id="newCategoryName" muted>
              New categories must not execeed 20 characters. (This is confusing)
            </Form.Text>
            <Form.Control
              as="textarea"
              type="text"
              rows={3}
              name="description"
              defaultValue={description ? description : ''}
              placeholder="Description"
              onChange={handleChange}
              aria-describedby="newCategoryDescription"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
