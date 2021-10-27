export const photoChecker = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'only jpg, jpeg, png are allowed';
    return callback(null, false);
  }
  return callback(null, true);
};

export const fileChecker = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    req.fileValidationError = 'only jpg, jpeg, png, gif and pdf are allowed';
    return callback(null, false);
  }
  return callback(null, true);
};

export const maxPhotoSize = { fileSize: 1024 * 1024 * 1 };

export const maxFileSize = { fileSize: 1024 * 1024 * 3 };