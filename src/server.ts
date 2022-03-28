import "reflect-metadata"
import express, { NextFunction, Request, Response} from "express"
import "express-async-errors"
import swaggerUi from "swagger-ui-express"

import { newConnection } from "./shared/infra/typeorm"
newConnection()
import "./shared/container"
import { AppError } from "@errors/AppError"
// import createConnection from "./shared/infra/typeorm"
// import "./shared/infra/typeorm"
import swaggerFile from "./swagger.json"
import { router } from "./shared/infra/http/routes"

// createConnection();
const app = express();

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

const port = 3211
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});

