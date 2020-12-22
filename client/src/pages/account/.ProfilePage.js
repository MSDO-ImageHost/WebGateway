import {Component} from 'react';

// Application components
import {SignOutButton} from '../authentication/Authentication';

// Auth
import {withAuthUser} from 'react-auth-kit'

// Bootstrap
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import {Get} from "react-axios";
import {HttpStatusMessage} from "../../ui_components/HttpStatusMessage";
import {PostListingEntry} from "../posts/.PostListingPage";


class ProfilePage extends Component {

    render() {
        console.log()
        return <Container>
            <h1>Hi {this.props.authState.username}!</h1>
            <h3>This will soon be your profile page</h3>
            <SignOutButton/>
            <UserPostsCard authState={this.props.authState}/>
        </Container>
    }
}

class UserPostsCard extends Component {
    render() {

        let url = `/api/users${this.props.authState.user_id}/posts/`;
        return <Card>
            <Get url={url}>
                {(error, response, isLoading, makeRequest) => {
                    if (error || isLoading) return HttpStatusMessage.intermediateStatusRendering(error, isLoading)

                    else if (response !== null) {
                        return (response.data.map(post => <PostListingEntry key={post.post_id} data={post}/>))
                    }
                    return (<div>Default message before request is made.</div>)
                }}
            </Get>
        </Card>
    }

}

export default withAuthUser(ProfilePage)