/* eslint-disable class-methods-use-this */
import env from '~/../env.json';

class MapConfig {
  get(key) {
    return env[key];
  }
}

export default new MapConfig();
