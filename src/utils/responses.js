module.exports = {
  addResponse: (entity, failed) => {
    if (!failed) {
      return {
        message: `${entity} created successfully.`,
        code: 201
      };
    } else {
      return {
        message: `failed to create ${entity}.`,
        code: 400
      };
    }
  },
  removeResponse: (entity, failed) => {
    if (!failed) {
      return {
        message: `${entity} removed successfully.`,
        code: 200
      };
    } else {
      return {
        message: `failed to remove ${entity}.`,
        code: 400
      };
    }
  },
  getResponse: (entity, failed) => {
    if (!failed) {
      return {
        message: `${entity} retrieved successfully.`,
        code: 200
      };
    } else {
      return {
        message: `failed to retrieve ${entity}.`,
        code: 400
      };
    }
  },
  updateResponse: (entity, failed) => {
    if (!failed) {
      return {
        message: `${entity} updated successfully.`,
        code: 200
      };
    } else {
      return {
        message: `failed to update ${entity}.`,
        code: 400
      };
    }
  },
  customResponse: (message, code) => {
    return {
      message,
      code
    };
  }
};
