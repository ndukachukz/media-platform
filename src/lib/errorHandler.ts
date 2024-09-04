import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorCode, Exception } from './errorException';

export function errorHandler(err: Exception | Error, _: NextApiRequest, res: NextApiResponse) {
    if (err instanceof Exception) {
        return res.status(err.status).send(err);
    }
    // Here you can further check if the error is an instance of, e.g: a Database error, and send back a proper Exception.
    console.error(err);
    const unknownErr = new Exception(ErrorCode.UnknownError, { error: err.name });
    return res.status(500).send(unknownErr);
}

export function noMatchHandler(_: NextApiRequest, res: NextApiResponse) {
    const matchErr = new Exception(ErrorCode.MethodNotAllowed);
    return res.status(matchErr.status).send(matchErr);
}