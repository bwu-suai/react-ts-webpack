class bus {
  busObjcet: { [key: string]: Array<(event: any) => void> } = {};

  on(funcName: string, handler: (event: any) => void) {
    if (!this.busObjcet[funcName]) this.busObjcet[funcName] = [];
    this.busObjcet[funcName].push(handler);
  }

  emit(funcName: string, event: any) {
    this.busObjcet[funcName].forEach((el) => el(event));
  }

  off(funcName: string, handler: (event: any) => void) {
    let ind = this.busObjcet[funcName].indexOf(handler) ?? -1;
    if (ind > -1) this.busObjcet[funcName].splice(ind, 1);
  }
}

export function busEv() {
  return new bus();
}
