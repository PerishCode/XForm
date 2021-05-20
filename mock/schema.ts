export default {
  'GET /mock/schema/:id': (req: any, res: any) => {
    res.send(req.params.id)
  },
  'POST /mock/schema/:id': (req: any, res: any) => {
    res.send(req.params.id)
  },
}
