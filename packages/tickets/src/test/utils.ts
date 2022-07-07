import request from 'supertest'

export const createTicket = (app: Express.Application, cookie?: string, title = 'Test Event', price = 20000, expectedStatusCode = 201) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie ? [cookie] : [])
    .send({ title, price })
    .expect(expectedStatusCode)
}
