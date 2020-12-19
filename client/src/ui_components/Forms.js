

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function FormFieldGroup(props) {
    return (<Form.Group as={Row} controlId={props.form.id}>
        <Form.Label column sm={2}>{props.form.title}</Form.Label>
        <Col><Form.Control type={props.form.type} placeholder={props.form.ph} required/></Col>
    </Form.Group>)
}


function PasswordConfirmFormFieldsGroup(props) {
    return (<Form.Group as={Row}>
        <Form.Label column sm={2}>Password</Form.Label>
        <Col> <Form.Group controlId="passwordField">
            <Form.Control type="password" placeholder="Password" required/>
        </Form.Group> </Col>
        <Col> <Form.Group controlId="confirmPasswordField">
            <Form.Control type="password" placeholder="Type password again" required/>
        </Form.Group></Col>
    </Form.Group>)
}


export {
    FormFieldGroup,
    PasswordConfirmFormFieldsGroup
}