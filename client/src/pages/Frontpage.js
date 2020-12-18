import React, { Component } from 'react';

// App components
import { PostListingEntry } from './Posts';

// Server communication
import { Get } from 'react-axios'

// Bootstrap
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";


class Frontpage extends Component{

    render() {
        return <Container>
            <Get url="/api/post">
            {(error, response, isLoading, makeRequest) => {
                if(error) {
                    return (<div class="text-center">
                        <Alert variant='danger'>{error.message}</Alert>
                        <Button onClick={() => makeRequest({ params: { reload: true } })}>Retry</Button>
                    </div>)
                }
                else if(isLoading) {
                    return (<Spinner animation="grow" variant="primary" />)
                }
                else if(response !== null) {
                    return (response.data.map(post => <PostListingEntry key={post.post_id} data={post}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get>
        </Container>
    }
}

export default Frontpage;