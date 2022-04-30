import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module"

const start = async () => {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    const PORT = process.env.PORT || 5000
    await app.listen(PORT, () => console.log(`Сервер запустился на ${PORT} порту`))
}

start()
// 