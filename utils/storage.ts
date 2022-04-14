export enum StorageStatus {
  SUCCESS, // 成功
  FAILURE, // 失败
  OVERFLOW, // 溢出
  TIMEOUT, // 过期
}

export interface ReturnValue<T> {
  status: StorageStatus;
  value: T;
}

class BaseLocalStorage {
  preId: string;

  timeSign: string;

  storage: Storage;

  status = StorageStatus;

  /**
   *
   * @param {string} preId key的前缀
   * @param {string} timeSign 时间戳与存储数据之间的拼接符
   */
  constructor(preId: string, timeSign?: string, storage?: Storage) {
    this.preId = preId;
    this.timeSign = timeSign || "-";
    this.storage = storage || window.localStorage;
  }

  getKey(key: string): string {
    // 获取真实存储的key值
    return this.preId + key;
  }

  /**
   *
   * @param {*} key 用户存储key值
   * @param {*} value 用户存储value
   * @param {*} callback 存储操作回调
   * @param {*} time 过期时间
   */
  set(
    key: string,
    value: any,
    time?: string | number | Date,
    callback?: (...args: any[]) => void
  ): void {
    let status = this.status.SUCCESS;
    const saveKey = this.getKey(key);
    try {
      time = new Date(time as string).getTime() || (time as Date).getTime();
    } catch (error) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31; // 默认过期时间为1个月
    }

    try {
      this.storage.setItem(
        saveKey,
        time + this.timeSign + JSON.stringify(value)
      );
    } catch (error) {
      status = this.status.OVERFLOW;
    }

    callback && callback.call(this, status, saveKey, value);
  }

  get<T>(key: string, callback?: (...args: any[]) => void): ReturnValue<T> {
    let status = this.status.SUCCESS;
    const saveKey = this.getKey(key);
    let value = null;
    const timeSignLen = this.timeSign.length;
    let index;
    let time;
    let result;

    try {
      value = this.storage.getItem(saveKey);
    } catch (error) {
      // 默认失败返回
      result = {
        status: this.status.FAILURE,
        value: null,
      };
      callback && callback.call(this, result.status, result.value);
    }

    if (value) {
      index = value.indexOf(this.timeSign);
      time = +value.slice(0, index);
      // 未过期
      if (new Date(time).getTime() > new Date().getTime() || time === 0) {
        value = value.slice(index + timeSignLen);
        try {
          value = JSON.parse(value);
        } catch (error) {
          // ignore
          value = `${value}`;
        }
      } else {
        value = null;
        status = this.status.TIMEOUT;
        this.remove(key);
      }
    } else {
      status = this.status.FAILURE;
    }

    result = {
      status,
      value,
    };

    callback && callback.call(this, result.status, result.value);
    return result;
  }

  remove(key: string, callback?: (...args: any[]) => void) {
    let status = this.status.FAILURE;
    const saveKey = this.getKey(key);
    let value = null;

    try {
      value = this.storage.getItem(saveKey);
    } catch (error) {
      // ignore this
    }

    if (value) {
      try {
        this.storage.removeItem(saveKey);
        status = this.status.SUCCESS;
      } catch (error) {
        // ignore this
      }
    }

    callback &&
      callback.call(
        this,
        status,
        status > 0
          ? null
          : value?.slice(value.indexOf(this.timeSign) + this.timeSign.length)
      );
  }
}

const storage = new BaseLocalStorage("UPCCCZ_");
export default storage;
