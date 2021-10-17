export const photoChecker = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = 'only jpg, jpeg, png are allowed';
    return callback(null, false);
  }
  return callback(null, true);
};

export const maxFileSize = { fileSize: 1024 * 1024 * 2 };