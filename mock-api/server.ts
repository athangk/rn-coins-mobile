import coins from './responses/coins.json';
import myData from './responses/myData.json';
import users from './responses/users.json';

import { createServer, Model, Response } from 'miragejs';

export const createMirageServer = () => {
  createServer({
    models: {
      reminder: Model
    },
    routes() {
      //Route api/coins return coins
      this.get('/api/coins', () =>
        coins.map((el) => {
          el.price = el.price + Math.random() + 2;
          return el;
        })
      ),
        //Route api/userdata return user data for user specific data ( e.x. lastvisit )
        this.post('/api/userdata', (schema, request) => {
          const myUser = myData;

          if (
            request.requestHeaders.Authorization ===
            'Bearer ' + myUser.token
          ) {
            const dummyDate = new Date();

            dummyDate.setDate(
              dummyDate.getDate() - Math.floor(Math.random() * 10) + 1
            );

            const dateDayMonth = [
              dummyDate.getDate(),
              dummyDate.getMonth(),
              dummyDate.getFullYear()
            ].join('/');

            const responseUser = {
              id: myUser.id,
              username: myUser.username,
              lastVisit: dateDayMonth.toString()
            };

            return responseUser;
          } else {
            throw new Response(
              403,
              { 'Content-Type': 'application/json' },
              { errors: ['Service error'] }
            );
          }
        }),
        //Route api/users return user for authentication
        this.post('/api/users', (schema, request) => {
          const payload = JSON.parse(request.requestBody);

          const user = users.find(
            (user) =>
              user.username === payload.username &&
              user.password === payload.password
          );

          if (user != null) {
            return myData;
          } else {
            throw new Response(
              403,
              { 'Content-Type': 'application/json' },
              { errors: ['Service error'] }
            );
          }
        });
    }
  });
};
