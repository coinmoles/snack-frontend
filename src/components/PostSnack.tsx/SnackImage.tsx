import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header } from "semantic-ui-react";
import { RootState } from "../../redux";
import { setSectionLoading } from "../../redux/loading/loadingSlice";
import { setBaseRect } from "../../redux/rect/rectSlice";

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

export const SnackImage: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    
    const [img, setImg] = useState(new Image());
    const [dragStart, setDragStart] = useState<Pos>({ notNull: false, x: null, y: null });
    const [imgLoading, setImgLoading] = useState(false);

    const dispatch = useDispatch();

    const ref = React.useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        if (imageUrl === undefined)
            return
        
        img.src = imageUrl;
        img.onload = () => setImgLoading(true);
    }, [imageUrl]);

    useEffect(() => {
        if (ref.current === undefined || ref.current === null) 
            return;
        if (!imgLoading)
            return;

        const canvas = ref.current;
        const ctx = ref.current.getContext("2d");
        
        if (ctx === null)
            return;

        canvas.height = canvas.width * img.height / img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, [img, imgLoading, ref.current?.width, ref.current?.height])

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
        setDragStart({ notNull: true, x: event.clientX, y: event.clientY });
        event.preventDefault();
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
        if (ref.current === undefined || ref.current === null) 
            return;
        if (!dragStart.notNull)
            return;

        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        if (ctx === null) 
            return;
        
        const rect = canvas.getBoundingClientRect();

        const [xStart, xStop] = configX(event.clientX, dragStart.x, rect, canvas);
        const [yStart, yStop] = configY(event.clientY, dragStart.y, rect, canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.strokeRect(xStart, yStart, xStop - xStart, yStop - yStart);
        
        return;
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
        if (!dragStart.notNull)
            return;
        if (event.clientX === null || event.clientX === undefined || event.clientY === null || event.clientY === undefined)
            return;
        if (ref.current === undefined || ref.current === null)
            return

        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        if (ctx === null) 
            return;
        
        const rect = canvas.getBoundingClientRect();

        const [xStart, xStop] = configX(event.clientX, dragStart.x, rect, img);
        const [yStart, yStop] = configY(event.clientY, dragStart.y, rect, img);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);    

        dispatch(setBaseRect({ xStart, xStop, yStart, yStop }));
        dispatch(setSectionLoading());
        setDragStart({ notNull: false, x: null, y: null });
    }

    const configX = (x1: number, x2: number, rect: DOMRect, base: { width: number, height: number }) => {
        const config = (x: number) =>
            (x - rect.left) * base.width / rect.width;
        
        return [x1, x2]
            .sort((a, b) => a - b)
            .map(config);
    }

    const configY = (y1: number, y2: number, rect: DOMRect, base: { width: number, height: number }) => {
        const config = (y: number) =>
            (y - rect.top) * base.height / rect.height;

        return [y1, y2]
            .sort((a, b) => a - b)
            .map(config);
    }

    return (
        <Container>
            <Header as="h4" content="Snack Image (Drag to select the table)" />
            <canvas
                className="w-full"
                ref={ref}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </Container>
    )
}