import cors from 'cors'
import express from 'express'
import { trpcRouter } from './Routes'
import { ApplyTrpcToExpressApp } from './lib/trpc'

const expressApp = express()
expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

ApplyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('Перейдите в http://localhost:3000')
})
