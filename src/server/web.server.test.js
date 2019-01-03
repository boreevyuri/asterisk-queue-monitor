import WebServer from './web.server'

//Hack for jest with async
import regeneratorRuntime from "regenerator-runtime";

describe('Started', () => {
  let webServer = null

  beforeAll(() => {
    webServer = new WebServer()
  })

  test('should start and trigger a callback', async () => {
    let promise = webServer.start()
    await expect(promise).resolves.toBeUndefined()
  })

  test('should stop and trigger a callback', async () => {
    let promise = webServer.stop()
    await expect(promise).resolves.toBeUndefined()
  })
})