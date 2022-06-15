## Contents

- [Running](#running)
- [API](#api)
- [TODO](#todo)
- [Contacts](#contacts)

## Running

```bash
$ git clone https://github.com/efymenko/iogru.git
$ cd iogru
$ docker-compose -f ./composers/presentation.docker-compose.yaml up
```

## API

[**/auth**](./apps/gateway/src/auth/auth.controller.ts)

- 👩‍🍼 _POST_ /register `{ username: string, password: string, aboutMe?: string, phoneNumber?: string}`
- 🔏 _POST_ /login `{ username: string, password: string }`

> [isUsername](apps/users/src/users/is-validator/is-username.ts) & [isPassword](apps/users/src/users/is-validator/is-password.ts)

[**/users**](./apps/gateway/src/users/users.controller.ts)

> WARNING: cookie token required

- 👨‍👦‍👦 _GET_
- 🎂 _PATCH_ \:id `{ username?: string, password?: string, aboutMe?: string, phoneNumber?: string}`
- 🙇‍♂️ _GET_ \:id
- 😧 _GET_ \:id/delete
- 👻 _DELETE_ \:id

## TODO

- [ ] - Attribute-Based Access Control. ([CASL](https://casl.js.org/v5/en/))
- [ ] - Tests. ([Jest](https://jestjs.io/)/[Chai](https://www.chaijs.com/)/[Supertest](https://github.com/visionmedia/supertest))
- [ ] - Web-client. ([Next](https://nextjs.org/)/[React](https://reactjs.org/)/[Redux Toolkit](https://redux-toolkit.js.org/))
- [x] - Сreate an authentication module.
- [ ] - OpenAPI. ([Swagger](https://swagger.io/))
- [x] - Layered exception architecture.
- [ ] - Implement an authentication module.

## Contacts

+7(996)-395-63-71 (Telegram)

efymenko@vk.com
