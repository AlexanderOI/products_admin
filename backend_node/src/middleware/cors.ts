import cors from 'cors'

const corsOption = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
}

export const corsMiddleware = () => cors(corsOption)