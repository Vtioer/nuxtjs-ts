class EventEmitter {
  handlers: any = {};
  constructor() {
    this.handlers = {};
  }

  addListener(type: string, handler: Function) {
    (this.handlers[type] || (this.handlers[type] = [])).push(handler);
  }

  /**
   *
   * @param {Object|String} e 事件对象 或者只传事件名称
   * @param {String} e.type 事件类型
   * @param {*} e.payload 事件相关信息
   */
  trigger(e: string | MouseEvent) {
    const handleType = typeof e === "string" ? e : e.type;
    const handlers = this.handlers[handleType];
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => {
        handler(e);
      });
    }
  }

  /**
   *
   * @param {String} type 事件类型，不传默认清空所有事件
   * @param {Function} targetHandler 注册的事件，不传默认清空该类事件
   */
  removeListener(type: string, targetHandler: Function) {
    if (!type) {
      this.handlers = {};
      return;
    }

    if (Array.isArray(this.handlers[type])) {
      if (targetHandler) {
        const handlers = this.handlers[type];
        handlers.forEach((handler: Function, index: number) => {
          if (handler === targetHandler) {
            handlers.splice(index, 1);
          }
        });
      } else {
        this.handlers[type] = [];
      }
    }
  }
}

export default new EventEmitter();
