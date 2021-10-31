import React from "react";
import { Header, Form, Segment } from "semantic-ui-react";

export const SnackUrlForm: React.FC = () => {
    return (
        <Segment>
            <Form style={{overflow: "hidden"}}>
                <Header as="h3" content="Register Url" />
                <Form.Input label="Image Url" placeholder="Image Url" />
                <Form.Button floated="right" content="Submit" />
            </Form>
        </Segment>
    )
}