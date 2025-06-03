import server from "./server";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

server.listen(3002, () => {
    console.log('Server is running on port 3002');
    console.log('http://localhost:3002');
});


export const handlersInputerrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
};
