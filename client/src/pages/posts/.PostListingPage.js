import { Component } from 'react';

// App components
import '../../App.css';
import { PostListingEntry } from './Posts';

// Server communication
import { Get } from 'react-axios';
import { APIStatusRenderings } from '../../helpers/APIStatusRenderings';

// Bootstrap
import Container from "react-bootstrap/esm/Container";


class PostListingPage extends Component {

    render() {
        return <Container>
            <Get url="/api/posts">
            {(error, response, isLoading, makeRequest) => {
                if(error || isLoading) return APIStatusRenderings.intermediateStatusRendering(error, isLoading)

                else if(response !== null) {
                    return (response.data.map(post => <PostListingEntry key={post.post_id} data={post}/>))
                }
                return (<div>Default message before request is made.</div>)
            }}
            </Get>
        </Container>
    }
};

export { PostListingPage }