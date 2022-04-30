import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntoIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        if (typeof value === "string") {
            value = +value
        }

        return value
    }
}