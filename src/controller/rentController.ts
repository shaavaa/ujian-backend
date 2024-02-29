import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"


const prisma = new PrismaClient()

const createRent = async (request: Request, response: Response) => {
    try {
        const carID = Number(request.body.carID)
        const namaPenyewa = request.body.namaPenyewa
        const bookedDate = new Date(request.body.bookedDate).toISOString()
        const lamaSewa = request.body.lamaSewa

        const car = await prisma.car.findFirst({
            where: {carID:carID}
        })

        if (!car) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car admin not found`
                })
        }

        const totalBayar = car.hargaPerhari*lamaSewa

        const newData = await prisma.rent.create({
            data: {
                carID: carID,
                namaPenyewa: namaPenyewa,
                bookedDate: bookedDate,
                lamaSewa: lamaSewa, 
                totalBayar: totalBayar
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: 'Data rent has been created',
                data: newData
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const readRent = async (request: Request, response: Response) => {
    try {
        const dataRent = await prisma.rent.findMany()
        return response
            .status(200)
            .json({
                status: true,
                message: `Data rent has been loaded`,
                data: dataRent
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateRent = async (request: Request, response: Response) => {
    try {
        const rentID = request.params.rentID

        const carID = request.body.nopol
        const namaPenyewa = request.body.namaPenyewa
        const bookedDate = new Date(request.body.bookedDate).toISOString()
        const lamaSewa = Number(request.body.lamaSewa)

        const findRend = await prisma.rent.findFirst({
            where: { rentID: Number(rentID) }
        })

        if (!findRend) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data rent not found`
                })
        }

        const car = await prisma.car.findFirst({
            where: {carID:carID}
        })

        if (!car) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car not found`
                })
        }

        const totalBayar = car.hargaPerhari*lamaSewa

        const dataRent = await prisma.rent.update({
            where: { rentID: Number(rentID) },
            data: {
                carID:carID || findRend.carID,
                namaPenyewa:namaPenyewa || findRend.namaPenyewa,
                bookedDate:bookedDate || findRend.bookedDate,
                lamaSewa:lamaSewa || findRend.lamaSewa,
                totalBayar:totalBayar || findRend.totalBayar
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data rent has been update`,
                data: dataRent
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const deleteRent = async (request: Request, response: Response) => {
    try {
        const rentID = request.params.rentID

        const findRend = await prisma.rent.findFirst({
            where: { rentID: Number(rentID) }
        })

        if (!findRend) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data rend not found`
                })
        }

        const dataRent = await prisma.rent.delete({
            where: { rentID: Number(rentID) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data rent has been delete`
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

export { createRent, readRent, updateRent, deleteRent }