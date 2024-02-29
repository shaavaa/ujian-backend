import { error } from "console";
import { Request, Response } from "express";
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization

        const token = header?.split(' ')[1] || ``
        const secretkey = 'darrel'

        verify(token, secretkey, error => {
            if (error) {
                return response.status(401)
                    .json({
                        status: false,
                        message: "Unautorized"
                    })

            }
            next()
        })

    } catch (error) {
        return response.status(500)
            .json({
                status: false,
                message: "Error"
            })
    }
}

export {verifyAdmin}