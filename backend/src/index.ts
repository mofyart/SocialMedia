import cors from 'cors'
import express from 'express'
import { trpcRouter } from './Routes'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyPassportToExpressApp } from './lib/passport'
import { ApplyTrpcToExpressApp } from './lib/trpc'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    applyPassportToExpressApp(expressApp, ctx)

    await ApplyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
      console.info('Перейдите в http://localhost:3000')
    })
  } catch (error) {
    console.error(error)
    await ctx?.stop()
  }
})()
