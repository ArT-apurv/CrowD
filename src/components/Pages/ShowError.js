import Alert from "react-bootstrap/Alert";

function ShowError(props) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  );
}

export default ShowError;
