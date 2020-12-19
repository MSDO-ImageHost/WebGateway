import { Component } from 'react';
import { Link } from 'react-router-dom';

// Server communication
import { Get } from 'react-axios';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";

class ScriptsPage extends Component {

    // errorRendering = (error) => {
    //     return (<div>
    //         <Alert variant='danger'>{error.message}</Alert>
    //         <Button onClick={() => makeRequest({ params: { reload: true } })}>Retry</Button>
    //     </div>)
    // }

    // loadingRendering = (isLoading) => {
    //     return (<div className="spinner-center">
    //         <Spinner animation="grow" variant="primary" />
    //     </div>)
    // }


    render() {
        return <Container>
            {/* <Get url="/api/scripts">
            {(error, response, isLoading, makeRequest) => {
                if(error) {
                    return this.errorRendering(error)
                }
                else if(isLoading) {
                    return this.loadingRendering(isLoading)
                }
                else if(response !== null) {
                    return (response.data.map(post => <ScriptListingEntry key={post.post_id} data={script}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get> */}
        </Container>
    }
}



class ScriptListingEntry extends Component {

}

export { ScriptsPage }