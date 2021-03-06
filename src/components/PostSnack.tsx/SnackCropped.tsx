import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Header } from "semantic-ui-react";
import { RootState } from "../../redux";

export const SnackCropped: React.FC = () => {
    const imageUrl = useSelector((state: RootState) => state.url.imageUrl);
    const snackData = useSelector((state: RootState) => state.snack.snackData[state.snack.index]);
    
    const [img] = useState(new Image());
    const [imgLoading, setImgLoading] = useState(false);

    const ref = React.useRef<HTMLCanvasElement>(null);
    
    const rectangle = snackData !== undefined ? snackData.rectangle : null;
    
    useEffect(() => {
        if (imageUrl === undefined)
            return
        
        img.src = imageUrl;
        img.onload = () => setImgLoading(true);
    }, [imageUrl, img]);

    useEffect(() => {
        if (ref.current === undefined || ref.current === null) 
            return;
        if (!imgLoading)
            return;
        if (rectangle === null)
            return;

        const canvas = ref.current;
        const ctx = ref.current.getContext("2d");
        
        if (ctx === null)
            return;

        canvas.height = canvas.width * rectangle.height / rectangle.width;
        ctx.drawImage(img, rectangle.left - 10, rectangle.top - 10, rectangle.width + 20, rectangle.height + 20,
            0, 0, canvas.width, canvas.height);
    }, [img, imgLoading, ref.current?.width, ref.current?.height, snackData, rectangle])


    return (
        <Container>
            <Header as="h4" content="Snack Image (Drag to select the table)" />
            <canvas
                className="w-full"
                ref={ref}
            />
        </Container>
    )
}