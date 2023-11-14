import express, { json } from 'express'

import { corsMiddleware } from './middleware/cors'
import { productsRouter } from './routes/products.routes'

const app = express()

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/products', productsRouter)

const PORT = process.env.PORT ?? 8000

app.listen(PORT, () => {
  console.log(`Server runnig om port ${PORT}`)
})
