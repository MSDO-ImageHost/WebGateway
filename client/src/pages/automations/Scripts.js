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
import FormControl from 'react-bootstrap/FormControl'

class ScriptsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {scripts: [], error: null};
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        axios.get("/api/scripts/FindOwnUserScripts").then(
            (result) => {
                if (result.status === 200 && result.data) {
                  var data = result.data;
                  console.log(data)
                  let scripts = data.user_scripts.map(script => ({_id: script._id, main_file: script.main_file, language: script.language, owner: script.owner}));
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
                    this.state.scripts.map(script => <ScriptListingEntry _id={script._id} program={script.program} language={script.language} main_file={script.main_file}
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
        const handleDownload = (script_id) => {
            axios.post("/api/scripts/FindUserScript", {"user_script":script_id}).then(
                (response) => {
                    fileDownload(response.data["user_script"]["logs"], "logs.txt")
                }
            )
        };
        const reload = this.props.reload;
        const handleDelete = (script_id) => {
            axios.post("/api/scripts/DeleteUserScript", {"user_script":script_id}).then(() => {
                reload()
            });
        };
        const handleRun = (script_id) => {
            axios.post("/api/scripts/RunUserScript", {"user_script":script_id}).then(() => {

            });
        };
        return <Row>
            <Col xs={1}>{this.props.main_file}</Col>
            <Col>{this.props.language}</Col>
            <Col>{this.props.owner}</Col>

            <Col>
                <Button variant="outline-primary" onClick={() => {
                    handleDownload(this.props._id)
                }}>
                    Download Logs
                </Button>
            </Col>
            <Col>
                <Button variant="outline-danger" onClick={() => {
                    handleDelete(this.props._id)
                }}>
                    Delete Userscript
                </Button>
            </Col>
            <Col>
                <Button variant="outline-success" onClick={() => {
                    handleRun(this.props._id)
                }}>
                    Run Userscript
                </Button>
            </Col>
        </Row>
    }
}

//TODO Change to take multiple files
//{
//            "program": [{"filename": "test.py", "content": file_content}, {"filename": "requirements.txt", "content": file_content}],
//            "main_file": "test.py",
//            "language": "python",
//        }
//{file: btoa(data), filename: this.state.filename}
class ScriptUploadForm extends Component {
    render() {
        bsCustomFileInput.init();
        const reloadScripts = this.props.reload;
        let fileUploadHandler = () => {

          let program_array = [];

          let onFileLoad = event => {
              console.log("program_array");
              console.log(program_array);
              axios.post("/api/scripts/CreateUserScript", {"program": program_array, "main_file": this.state.filename, "language": this.state.language}).then((response) => {
                  reloadScripts()
              })
          };

          let filename_array = [];
          var file_amount = this.state.file.length;
          for (let i = 0; i < this.state.file.length; i++) {
            filename_array.push(this.state.file[i].name);
            const reader = new FileReader();
            onFileLoad.bind(this);
            reader.onload = function(e) {
              program_array.push(
                JSON.stringify(
                  { filename: filename_array.shift(), content: e.target.result }
                )
              );
              if (file_amount === program_array.length) {
                onFileLoad();
              }
            };
            reader.readAsBinaryString(this.state.file[i])
          };
        };

        return <Form>
            <Form.Row className="align-center">
                <Col>
                    <Form.Group inline>
                        <Form.Control id="main_file" type="text" placeholder="Main file" onChange={event => this.setState({filename: event.target.value})}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group inline>
                        <Form.Control id="language" type="text" placeholder="Language" onChange={event => this.setState({language: event.target.value})}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group inline>
                        <FormControl id="formControlsFile" type="file" multiple label="File" onChange={event => this.setState({file: event.target.files})}/>
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
