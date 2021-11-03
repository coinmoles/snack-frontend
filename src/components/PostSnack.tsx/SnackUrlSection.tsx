import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Header, Segment } from "semantic-ui-react";
import { setImageLoading } from "../../redux/loading/loadingSlice";
import { setCards } from "../../redux/rect/rectSlice";
import { initSnack } from "../../redux/snack/snackSlice";
import { setImageUrl } from "../../redux/url/urlSlice";

export const SnackUrlForm: React.FC = () => {
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(setImageUrl(url));
        dispatch(initSnack([]));
        dispatch(setCards({ xCard: 0, yCard: 0 }));
        dispatch(setImageLoading());
    }

    return (
        <Segment>
            <Form style={{ overflow: "hidden" }} >
                <Header as="h3" content="Register Url" />
                <Form.Input
                    onChange={(event => setUrl(event.target.value))}
                    label="Image Url"
                    placeholder="Image Url"
                />
                <Form.Button
                    onClick={handleClick}
                    floated="right"
                    content="Submit"
                />
            </Form>
        </Segment>
    )
}