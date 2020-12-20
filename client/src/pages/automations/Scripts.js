import {Component} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';

// Server communication
import {AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios} from 'react-axios'
import axios from 'axios';

import fileDownload from 'js-file-download';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";
import bsCustomFileInput from 'bs-custom-file-input';

class ScriptsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {scripts: [], error: null};
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        axios.get("/api/scripts").then(
            (result) => {
                if (result.status === 200 && result.data) {
                    console.log(result.data);
                    let scripts = result.data.map(script => ({id: script.id, name: script.name, owner: script.owner}));
                    this.setState({scripts})
                } else {
                    this.setState({
                        scripts: [],
                        error: `Request to Server did not return a response. (${result.status})`
                    })
                }
            }
        )
    }

    render() {
        if (this.state.error == null) {
            return <Container>
                <ScriptUploadForm reload={this.reload.bind(this)}/>
                {
                    this.state.scripts.map(script => <ScriptListingEntry id={script.id} name={script.name}
                                                                         owner={script.owner}
                                                                         reload={this.reload.bind(this)}/>)
                }
            </Container>
        } else return <Container>
            <ScriptUploadForm reload={this.reload.bind(this)}/>
            {this.state.error}
        </Container>
    }
}

class ScriptListingEntry extends Component {
    render() {
        console.log(this.props);
        const handleDownload = (script_name, script_id) => {
            axios.get("/api/scripts/" + script_id, {responseType: "blob"}).then(
                (response) => {
                    fileDownload(response.data, script_name)
                }
            )
        };
        const reload = this.props.reload;
        const handleDelete = (script_id) => {
            axios.delete("/api/scripts/" + script_id).then(() => {
                reload()
            });
        };
        return <Row>
            <Col xs={6}>{this.props.name}</Col>
            <Col>{this.props.owner}</Col>
            <Col>
                <Button variant="outline-primary" onClick={() => {
                    handleDownload(this.props.name, this.props.id)
                }}>
                    Download
                </Button>
            </Col>
            <Col>
                <Button variant="outline-danger" onClick={() => {
                    handleDelete(this.props.id)
                }}>
                    Delete
                </Button>
            </Col>
        </Row>
    }
}

class ScriptUploadForm extends Component {
    render() {
        bsCustomFileInput.init();
        const reloadScripts = this.props.reload;
        let fileUploadHandler = () => {
            const reader = new FileReader();
            let onFileLoad = event => {
                let data = event.target.result;
                axios.post("/api/scripts/", {file: btoa(data), filename: this.state.filename}).then((response) => {
                    console.log(typeof reloadScripts);
                    reloadScripts()
                })
            };
            onFileLoad.bind(this);
            reader.onload = onFileLoad;
            reader.readAsBinaryString(this.state.file)
        };

        return <Form>
            <Form.Row className="align-center">
                <Col>
                    <Form.Group inline>
                        <Form.Control id="filename" type="text" placeholder="Filename" onChange={event => this.setState({filename: event.target.value})}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group inline>
                        <Form.File id="uploadScript" onChange={event => this.setState({file: event.target.files[0]})}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Button onClick={fileUploadHandler}>Submit</Button>
                </Col>
            </Form.Row>
        </Form>
    }
}

export {ScriptsPage}
