import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express"

const prisma = new PrismaClient()

const createCar = async(request : Request, response : Response) => {
    try {
        const nopol = request.body.nopol
        const merkMobil = request.body.merkMobil
        const hargaPerhari = Number(request.body.hargaPerhari)

        const newData = await prisma.car.create({
            data: {
                nopol: nopol,
                merkMobil: merkMobil,
                hargaPerhari: hargaPerhari
            }
        })

        return response
        .status(200)
        .json({
            status : true,
            message : 'Data car has been created',
            data : newData
        })
    } catch (error) {
        return response
        .status(500)
        .json({
            status : false,
            message : error
        })
    }
}

const readCar = async (request : Request, response : Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || ""
        const dataCar = await prisma.car.findMany({
            take : qty,
            skip : (page-1)*qty,
            where:{
                OR:[
                    {nopol: {contains:keyword}},
                    {merkMobil: {contains:keyword}}
                ]
            }
        })
        return response
        .status(200)
        .json({
            status: true,
            message: `Data car has been loaded`,
            data: dataCar
        })
    } catch (error) {
        return response
        .status(500)
        .json({
            status : false,
            message : error
        })
    }
}

const updateCar = async (request: Request, response: Response) => {
    try {
        const carID = request.params.carID

        const nopol = request.body.nopol
        const merkMobil = request.body.merkMobil
        const hargaPerhari = request.body.hargaPerhari

        const findCar = await prisma.car.findFirst({
            where: {carID: Number(carID)}
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car admin not found`
                })
        }

        const dataCar = await prisma.car.update({
            where: {carID: Number(carID)},
            data: {
                nopol: nopol || findCar.nopol,
                merkMobil: merkMobil || findCar.merkMobil,
                hargaPerhari: hargaPerhari || findCar.hargaPerhari
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data car has been update`,
                data: dataCar
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

const deleteCar = async (request: Request, response: Response) => {
    try {
        const carID = request.params.carID

        const findCar = await prisma.car.findFirst({
            where: {carID: Number(carID)}
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car not found`
                })
        }

        const dataCar = await prisma.car.delete({
            where: {carID: Number(carID)}
        })

        return response.status(200)
        .json({
            status: true,
            message: `Data car has been delete`
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

export { createCar, readCar, updateCar, deleteCar }