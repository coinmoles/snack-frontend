import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Image, Ref } from "semantic-ui-react";
import { RootState } from "../../redux";
import { setRectCols, setRectRows } from "../../redux/rect/rectSlice";
import { initSnack } from "../../redux/snack/snackSlice";
import { imageToSnack } from "../../utils/imageToSnack";
import { ocr } from "../../utils/imageToSnack/ocr";

interface PosNull {
    notNull: false,
    x: null | undefined,
    y: null | undefined
}

interface PosNotNull {
    notNull: true,
    x: number,
    y: number
}

type Pos = PosNotNull | PosNull

export const SnackEditImage: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const ref = React.useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();
    const [dragStart, setDragStart] = useState<Pos>({ notNull: false, x: null, y: null });
    const [topLeft, setTopLeft] = useState<Pos>({ notNull: false, x: null, y: null });
    const [bottomRight, setBottomRight] = useState<Pos>({ notNull: false, x: null, y: null })
    const [rowNum, setRowNum] = useState<number>(0);
    const [colNum, setColNum] = useState<number>(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setDragStart({ notNull: true, x: event.clientX, y: event.clientY });
        event.preventDefault();
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!dragStart.notNull)
            return;
        if (event.clientX === null || event.clientX === undefined || event.clientY === null || event.clientY === undefined)
            return;
        if (ref.current === undefined || ref.current === null)
            return

        const [x_left, x_right]: number[] = [dragStart.x, event.clientX]!.sort((a: number, b: number) => a - b)
        const [y_top, y_bottom] = [dragStart.y, event.clientY].sort((a: number, b: number) => a - b);
        const { x: x_base, y: y_base } = ref.current.getBoundingClientRect();
        const { clientWidth: width, clientHeight: height, naturalWidth, naturalHeight } = ref.current;

        const configPos = (x: number, y: number): PosNotNull => {
            return {
                notNull: true,
                x: Math.floor((x - x_base) * naturalWidth / width),
                y: Math.floor((y - y_base) * naturalHeight / height)
            }
        }

        setTopLeft(configPos(x_left, y_top));
        setBottomRight(configPos(x_right, y_bottom));
        setDragStart({ notNull: false, x: null, y: null })
    }

    const setRect = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!topLeft.notNull || !bottomRight.notNull)
            return;
        if (imageUrl === undefined)
            return;

        const linspace = (start: number, stop: number, card: number): number[] => {
            let arr: number[] = [];
            let step = (stop - start) / (card - 1);
            for (let i = 0; i < card; i++) {
                arr.push(Math.floor(start + (step * i)));
            }
            return arr;
        }
        
        const rows = linspace(topLeft.y, bottomRight.y, rowNum + 1)
        const cols = linspace(topLeft.x, bottomRight.x, colNum + 1)

        dispatch(setRectCols(cols));
        dispatch(setRectRows(rows));

       const snackDatas = await imageToSnack(imageUrl, rows, cols);
       dispatch(initSnack(snackDatas));
    }

    return (
        <Container>
            <Ref innerRef={ref} >
                <Image
                    crossOrigin="Anonymous"
                    src={imageUrl}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                />
            </Ref>
            <Form className="mt-3 overflow-hidden" onSubmit={setRect}>
                <Form.Group widths="equal">
                    <Form.Input
                        disabled={!topLeft.notNull}
                        type="number"
                        onChange={(event) => setColNum(parseInt(event.target.value))}
                        fluid
                        label="Cols" />
                    <Form.Input
                        disabled={!topLeft.notNull}
                        type="number"
                        onChange={(event) => setRowNum(parseInt(event.target.value))}
                        fluid
                        label="Row Num" />
                </Form.Group>
                <Form.Button disabled={!topLeft.notNull} floated="right" content="OCR" />
            </Form>
        </Container>
    )
}