import { HttpException, HttpStatus, StreamableFile } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import {resolve, join} from "path"
import {existsSync, mkdirSync, writeFileSync, unlinkSync, createReadStream} from "fs"
import {TypesFile} from "./types/typeFile.enum"
import {v4} from "uuid"
import {Track} from "../track/schemas/track.schema"

@Injectable()
export class FileService {
    
    async createFile(type: TypesFile, file: Express.Multer.File) {
        const pathDir = resolve(__dirname, "..", "static", type)

        if (!existsSync(pathDir)) {
            mkdirSync(pathDir, {recursive: true})
        }

        const typeFile = file.originalname.split(".").pop()
        const newName = `${v4()}.${typeFile}`
        const pathFile = join(pathDir, newName)
        writeFileSync(pathFile, file.buffer)
        return `${type}/${newName}`

    }

    async deleteFile(pathFile: string) {
        try {

            const fullPath = join(__dirname, "..", "static", pathFile)


            if (!existsSync(fullPath)) {
                throw new HttpException("Не найден файл по заданному пути", HttpStatus.NOT_FOUND)
            }

            console.log(fullPath)

            unlinkSync(fullPath)

            return true

        } catch(e) {
            throw new HttpException("Произошла ошибка при удалении файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    downloadFile(fileUrl: string): StreamableFile {
        console.log(process.cwd)
        const urlFile = createReadStream(join(__dirname, "..","static", fileUrl))
        return new StreamableFile(urlFile)
    }
}