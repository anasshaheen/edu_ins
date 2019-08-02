import redis from 'redis';

import { redis as redisConfig } from '../config';

class RedisClient {
  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient(redisConfig.port, redisConfig.host);
    this.client.on('connect', () => {
      console.log('Redis client connected');
    });

    this.client.on('error', err => {
      console.log('Something went wrong ' + err);
    });
  }

  exists(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.exists(key, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res === 1);
      });
    });
  }

  set(key: string, value: object): void {
    this.client.set(key, JSON.stringify(value));
  }

  setWithExpirationTime(key: string, seconds: number, value: object): void {
    this.client.setex(key, seconds, JSON.stringify(value));
  }

  delete(key: string): boolean {
    return this.client.del(key);
  }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res));
        }
      });
    });
  }
}

export default RedisClient;
