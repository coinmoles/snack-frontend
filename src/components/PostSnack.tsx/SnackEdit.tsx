import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Divider, Form, Header, Loader } from "semantic-ui-react";
import { RootState } from "../../redux";
import { setImageLoading } from "../../redux/loading/loadingSlice";
import { deleteSingleSnack, nextDay, prevDay, setSingleSnack } from "../../redux/snack/snackSlice";

export const SnackEdit: React.FC = () => {
    const snackData = useSelector((state: RootState) => state.snack.snackData[state.snack.index]);
    const loadingCurrent = useSelector((state: RootState) => state.loading.current);
    
    const [year, setYear] = useState<number | undefined>(undefined);
    const [month, setMonth] = useState<number | undefined>(undefined);
    const [day, setDay] = useState<number | undefined>(undefined);
    const [newSnack, setNewSnack] = useState<string | undefined>(undefined);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (loadingCurrent === "OCRComplete") {
            setYear(snackData !== undefined ? snackData.year : undefined);
            setMonth(snackData !== undefined ? snackData.month : undefined);
            setDay(snackData !== undefined ? snackData.day : undefined);
            setNewSnack(snackData !== undefined ? snackData.snack : undefined);
        }
        else {
            setYear(undefined);
            setMonth(undefined);
            setDay(undefined);
            setNewSnack(undefined);
        }
    }, [snackData, loadingCurrent]);
    
    const disableEdit = loadingCurrent !== "OCRComplete";
    return (
        <Form style={{overflow: "hidden"}}>
            <Header as="h4" content="Edit Snack Data" />
            <Form.Group widths="equal">
                <Form.Input 
                    fluid
                    label="Year"
                    placeholder="Year"
                    value={year}
                    disabled={disableEdit} 
                />
                <Form.Input 
                    fluid
                    label="Month"
                    placeholder="Month" 
                    value={month}
                    disabled={disableEdit} 
                />
                <Form.Input  
                    fluid 
                    label="Day"
                    placeholder="Day" 
                    value={day}
                    disabled={disableEdit}
                />
            </Form.Group>

            <Form.TextArea 
                rows="5"
                placeholder="Snack Data"
                value={newSnack}
                disabled={disableEdit} 
                onChange={(event) => setNewSnack(event.target.value)} 
                style={{resize: "None"}} 
            />
            
            <Container className="overflow-hidden mb-3">
                <Form.Button  
                    floated="right" 
                    content="Delete" 
                    color="red" 
                    disabled={disableEdit}
                    onClick={() => dispatch(deleteSingleSnack())} 
                />
            </Container>
            
            <Form.Group widths="equal">
                <Form.Button 
                    fluid 
                    floated="left" 
                    icon="arrow left" 
                    disabled={disableEdit} 
                    onClick={() => {
                        if (newSnack !== undefined)
                            dispatch(setSingleSnack(newSnack));
                        dispatch(prevDay());
                    }}
                />
                <Form.Button 
                    fluid 
                    floated="right" 
                    icon="arrow right"  
                    disabled={disableEdit} 
                    onClick={() => {
                        if (newSnack !== undefined)
                            dispatch(setSingleSnack(newSnack));
                        dispatch(nextDay());
                    }} 
                />
            </Form.Group>
            
            <Divider />
            <Container>
                <Form.Button
                    color="red"
                    floated="right"
                    content="Reselect Area"
                    disabled={disableEdit}
                    onClick={() => {
                        dispatch(setImageLoading());
                    }}
                />
            </Container>
        </Form>
    )
}