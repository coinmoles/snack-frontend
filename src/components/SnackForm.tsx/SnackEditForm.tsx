import React from "react";
import { Form } from "semantic-ui-react";

export const SnackEditForm: React.FC = () => {
    return (
        <Form style={{overflow: "hidden"}}>
            <Form.Group widths="equal">
                <Form.Input fluid label="Year" placeholder="Year" />
                <Form.Input fluid label="Month" placeholder="Month" />
                <Form.Input fluid label="Day" placeholder="day" />
            </Form.Group>
            <Form.TextArea rows="4" style={{resize: "None"}} />
            <Form.Group widths="equal">
                <Form.Button fluid floated="left" icon="arrow left" />
                <Form.Button fluid floated="right" icon="arrow right"/>
            </Form.Group>
        </Form>
    )
}