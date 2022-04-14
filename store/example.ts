import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "example",
  stateFactory: true,
  namespaced: true,
})
export default class Example extends VuexModule {
  wheels = 2;

  @Mutation
  incrWheels(extra: number) {
    this.wheels += extra;
  }

  get axles() {
    return this.wheels / 2;
  }
}
