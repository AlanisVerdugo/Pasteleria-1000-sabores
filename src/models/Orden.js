export class Orden {
  constructor({ estado = 'preparacion', items = [], ...resto }) {
    Object.assign(this, { ...resto, estado, items })
  }
}