import {Component} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';

// Server communication
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

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

    render() {
        return <Container>
            <Get url="/api/scripts">
                {(error, response, isLoading, makeRequest) => {
                    if (error) {
                        return <div>Error loading scripts</div>
                    } else if (response !== null) {
                        return (response.data.map(script => <ScriptListingEntry key={script.id} name={script.name} owner={script.owner}/>))
                    }
                    return (<div>Loading scripts...</div>)
                }}
            </Get>
        </Container>
    }
}


class ScriptListingEntry extends Component {
    render() {
        console.log(this.props);
        return <Row>
            <Col xs={6}>{this.props.name}</Col>
            <Col>{this.props.owner}</Col>
            <Col>Download</Col>
            <Col>Delete</Col>
        </Row>
    }
}

export {ScriptsPage}