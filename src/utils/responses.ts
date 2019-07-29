import { IResponse } from '../interfaces';

class Responses {
  static add(entity: string, failed: boolean = false): IResponse {
    if (!failed) {
      return {
        message: `${entity} created successfully.`,
        code: 201,
      };
    } else {
      return {
        message: `failed to create ${entity}.`,
        code: 400,
      };
    }
  }

  static remove(entity: string, failed: boolean = false): IResponse {
    if (!failed) {
      return {
        message: `${entity} removed successfully.`,
        code: 200,
      };
    } else {
      return {
        message: `failed to remove ${entity}.`,
        code: 400,
      };
    }
  }

  static get(entity: string, failed: boolean = false): IResponse {
    if (!failed) {
      return {
        message: `${entity} retrieved successfully.`,
        code: 200,
      };
    } else {
      return {
        message: `failed to retrieve ${entity}.`,
        code: 400,
      };
    }
  }

  static update(entity: string, failed: boolean = false): IResponse {
    if (!failed) {
      return {
        message: `${entity} updated successfully.`,
        code: 200,
      };
    } else {
      return {
        message: `failed to update ${entity}.`,
        code: 400,
      };
    }
  }

  static custom(message: string, code: number = 200): IResponse {
    return {
      message,
      code,
    };
  }
}

export default Responses;
