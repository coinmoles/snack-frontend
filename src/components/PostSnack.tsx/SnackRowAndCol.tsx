import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Header } from "semantic-ui-react";
import { RootState } from "../../redux";
import { finishOCRLoading, startOCRLoading } from "../../redux/loading/loadingSlice";
import { setCards } from "../../redux/rect/rectSlice";
import { initSnack } from "../../redux/snack/snackSlice";
import { imageToSnack } from "../../utils/imageToSnack";

export const SnackRowAndCol: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const loadingCurrent = useSelector((state: RootState) => state.loading.current);
    const { xStart, xStop, yStart, yStop } = useSelector((state: RootState) => state.rect)

    const [newYCard, setNewYCard] = useState<number | "">("");
    const [newXCard, setNewXCard] = useState<number | "">("");
    const [disableRowAndCol, setDisAbleRowAndCol] = useState(true);
    const [loadingRowAndCol, setLoadingRowAndCol] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loadingCurrent === "NoImage" || loadingCurrent === "ImageExist"){
            dispatch(setCards({ xCard: 0, yCard: 0 }));
            setNewXCard("");
            setNewYCard("");
        }

        setDisAbleRowAndCol(loadingCurrent !== "ImageSectionSelected" &&
            loadingCurrent !== "OCRLoading");
        setLoadingRowAndCol(loadingCurrent === "OCRLoading");
    }, [loadingCurrent, dispatch]);

    const handleSubmit = async () => {
        if (imageUrl === undefined)
            return;
        if (newXCard === "" || newYCard === "")
            return;
        
        const linspace = (start: number, stop: number, card: number): number[] => {
            let arr: number[] = [];
            let step = (stop - start) / card;
            for (let i = 0; i < card + 1; i++) {
                arr.push(Math.floor(start + (step * i)));
            }
            return arr;
        }

        
        dispatch(setCards({ xCard: newXCard, yCard: newYCard }))
        dispatch(startOCRLoading())
        try{
            const snackDatas = await imageToSnack(imageUrl, linspace(yStart, yStop, newYCard), linspace(xStart, xStop, newXCard));

            dispatch(initSnack(snackDatas));
            dispatch(finishOCRLoading());
        } catch (err) {
            alert("OCR Failed, Please Try Reloading(F5)")
        }
    }

    return (
        <Form className="mt-3 overflow-hidden" onSubmit={handleSubmit}>
            <Header as="h4" content="Set Column & Row Number" />
            <Form.Group widths="equal">
                <Form.Input
                    fluid
                    type="number"
                    label="Col Num"
                    placeholder="Col Num"
                    value={newXCard}
                    disabled={disableRowAndCol}
                    onChange={(event) => setNewXCard(parseInt(event.target.value))}
                />
                <Form.Input
                    fluid
                    type="number"
                    label="Row Num"
                    placeholder="Row Num"
                    value={newYCard}
                    disabled={disableRowAndCol}
                    onChange={(event) => setNewYCard(parseInt(event.target.value))}
                />
            </Form.Group>

            <Form.Button
                floated="right"
                content="OCR"
                loading={loadingRowAndCol}
                disabled={disableRowAndCol}
            />
        </Form>
    )
}