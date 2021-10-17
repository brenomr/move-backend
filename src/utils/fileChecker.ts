export const fileChecker = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    req.fileValidationError = 'only jpg, jpeg, png, gif or pdf are allowed';
    return callback(null, false);
  }
  return callback(null, true);
};

export const maxFileSize = { fileSize: 1024 * 1024 * 2 };