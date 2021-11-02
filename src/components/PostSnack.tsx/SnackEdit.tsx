import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Header, Loader } from "semantic-ui-react";
import { RootState } from "../../redux";
import { deleteSingleSnack, nextDay, prevDay, setSingleSnack } from "../../redux/snack/snackSlice";

export const SnackEdit: React.FC = () => {
    const dispatch = useDispatch();
    const [newSnack, setNewSnack] = useState("");
    const snackData = useSelector((state: RootState) => state.snack.snackData[state.snack.index]);
    const snackLoading = useSelector((state: RootState) => state.loading.snacks);
    useEffect(() => {
        if (snackData !== undefined) 
            setNewSnack(snackData.snack)
    }, [snackData]);

    if (snackLoading === "None")
        return <div />
    else if (snackLoading === "Loading")
        return <Loader active />
    else if (snackData === undefined)
        return <div />
    else {
        const { year, month, day } = snackData;
        return (
            <Form style={{overflow: "hidden"}}>
                <Header as="h4" content="Edit Snack Data" />
                <Form.Group widths="equal">
                    <Form.Input fluid label="Year" value={year} placeholder="Year" />
                    <Form.Input fluid label="Month" value={month} placeholder="Month" />
                    <Form.Input fluid label="Day" value={day} placeholder="day" />
                </Form.Group>
                <Form.TextArea rows="5" value={newSnack} onChange={(event) => {setNewSnack(event.target.value);}} style={{resize: "None"}} />
                <Container className="overflow-hidden mb-3">
                    <Form.Button floated="right" content="Delete" color="red" onClick={() => {
                        dispatch(deleteSingleSnack());
                    }} />
                </Container>
                
                <Form.Group widths="equal">
                    <Form.Button fluid floated="left" icon="arrow left" onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(prevDay());
                    }}/>
                    <Form.Button fluid floated="right" icon="arrow right" onClick={() => {
                        dispatch(setSingleSnack(newSnack));
                        dispatch(nextDay());
                    }} />
                </Form.Group>
            </Form>
        )
    }
}