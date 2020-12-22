import {Component} from 'react';
import React from 'react';

// Server communication
import axios from 'axios';

import fileDownload from 'js-file-download';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bsCustomFileInput from 'bs-custom-file-input';
import FormControl from 'react-bootstrap/FormControl';
import FileBase64 from 'react-file-base64';

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
                  console.log(response.data.user_script.logs);
                  fileDownload(JSON.stringify(response.data.user_script.logs.map(log => `${log.created_at}: ${log.log}\n`)), "logs.txt")
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

class ScriptUploadForm extends Component {
  constructor(props) {
      super(props)
      this.state = {files: []}
  }

  getFiles(files) {
      this.setState({files:files})
      console.log(files);
      let program_array = []
      for (let i = 0; i < files.length; i++) {
        program_array.push(
            { filename: files[i].name, content: atob(files[i].base64.split(',')[1]) }
        );
      }
      const reloadScripts = this.props.reload;
      console.log(program_array);
      axios.post("/api/scripts/CreateUserScript", {"program": program_array, "main_file": this.state.filename, "language": this.state.language}).then((response) => {
          reloadScripts()
      })

  }

    render() {
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
                        <FileBase64 multiple={ true } onDone={ this.getFiles.bind(this) } required/>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Form>
    }
}

export {ScriptsPage}
