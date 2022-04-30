import { StreamableFile } from "@nestjs/common";

export interface IResponseStreamAndName {
    file: StreamableFile
    name: string
}