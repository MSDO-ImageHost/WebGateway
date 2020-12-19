
import '../App.css';

// Bootstrap
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";



class APIStatusRenderings {
    static errorRendering = (error, makeRequest) => {
        return (<div>
            <Alert variant='danger'>{error.message}</Alert>
            <Button onClick={() => makeRequest({ params: { reload: true } })}>Retry</Button>
        </div>)
    }

    static isLoadingRendering = (isLoading) => {
        return (<div className="spinner-center">
            <Spinner animation="grow" variant="primary" />
        </div>)
    }

    static intermediateStatusRendering = (error, isLoading, makeRequest) => {
        if (error) return this.errorRendering(error, makeRequest)
        if (isLoading) return this.isLoadingRendering(isLoading)
    }
}




export { APIStatusRenderings }