import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express"
import md5 from "md5"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

const createAdmin = async(request : Request, response : Response) => {
    try {
        const namaAdmin = request.body.namaAdmin
        const email = request.body.email
        const password = request.body.password

        const newData = await prisma.admin.create({
            data: {
                namaAdmin: namaAdmin,
                email : email,
                password : password
            }
        })

        return response
        .status(200)
        .json({
            status : true,
            message : 'Admin has been created',
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

const readAdmin = async (request : Request, response : Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || ""
        const dataAdmin = await prisma.admin.findMany({
            take : qty,
            skip : (page-1)*qty,
            where:{
                OR:[
                    {namaAdmin: {contains:keyword}},
                    {email: {contains:keyword}}
                ]
            }
        })
        return response
        .status(200)
        .json({
            status: true,
            message: `Admin has been loaded`,
            data: dataAdmin
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

const updateAdmin = async (request: Request, response: Response) => {
    try {
        const adminID = request.params.adminID

        const namaAdmin = request.body.namaAdmin
        const email = request.body.email
        const password = request.body.password

        const findAdmin = await prisma.admin.findFirst({
            where: {adminID: Number(adminID)}
        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data admin not found`
                })
        }

        const dataAdmin = await prisma.admin.update({
            where: {adminID: Number(adminID)},
            data: {
                namaAdmin: namaAdmin || findAdmin.namaAdmin,
                email: email || findAdmin.email,
                password: password || findAdmin.password
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Admin has been update`,
                data: dataAdmin
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

const deleteAdmin = async (request: Request, response: Response) => {
    try {
        const adminID = request.params.adminID

        const findAdmin = await prisma.admin.findFirst({
            where: {adminID: Number(adminID)}
        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Admin not found`
                })
        }

        const dataAdmin = await prisma.admin.delete({
            where: {adminID: Number(adminID)}
        })

        return response.status(200)
        .json({
            status: true,
            message: `Admin has been delete`
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

const login = async (request:Request, response:Response)=>{
    try {
        const namaAdmin = request.body.namaAdmin
        const email = request.body.email
        const password = request.body.password
        const admin = await prisma.admin.findFirst(
            {
                where: {namaAdmin: namaAdmin, email: email, password: password}
            }
        )
        if(admin){
            const payload = admin
            const secretkey = 'darrel'
            const token = sign(payload,secretkey)
            return response
            .status(200)
            .json({
                status: true,
                message: "Login berhasil",
                token: token
            })
        } 
        
        else {
            return response
            .status(200)
            .json({
                status: false,
                message: "Login gagal"
            })
        }

    } catch (error) {
        return response
        .status(500)
        .json({
            status : false, 
            message: error
        })
    }
}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin, login}