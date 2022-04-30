import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseStringToBoolean implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        if (value.isShowInRecommendation === "true") {
            value.isShowInRecommendation = true
        } else {
            value.isShowInRecommendation = false
        }

        return value
    }
}