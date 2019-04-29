const COMMON_ERROR_CODE = {
    100: 'Unknown error',
    101: 'No parameter of API, method or versio',
    102: 'The requested API does not exis',
    103: 'The requested method does not exis',
    104: 'The requested version does not support the functionalit',
    105: 'The logged in session does not have permissio',
    106: 'Session timeou',
    107: 'Session interrupted by duplicate logi',
};

const AUTH_ERROR_CODE = {
    400: 'No such account or incorrect password',
    401: 'Account disabled',
    402: 'Permission denied',
    403: '2-step verification code required',
    404: 'Failed to authenticate 2-step verification code',
};

const FILE_STATION_ERROR_CODE = {
    400: 'Invalid parameter of file operation',
    401: 'Unknown error of file operation',
    402: 'System is too busy',
    403: 'Invalid user does this file operation',
    404: 'Invalid group does this file operation',
    405: 'Invalid user and group does this file operation',
    406: 'Can’t get user/group information from the account server',
    407: 'Operation not permitted',
    408: 'No such file or directory',
    409: 'Non-supported file system',
    410: 'Failed to connect internet-based file system (ex: CIFS)',
    411: 'Read-only file system',
    412: 'Filename too long in the non-encrypted file system',
    413: 'Filename too long in the encrypted file system',
    414: 'File already exists',
    415: 'Disk quota exceeded',
    416: 'No space left on device',
    417: 'Input/output error',
    418: 'Illegal name or path',
    419: 'Illegal file name',
    420: 'Illegal file name on FAT file system',
    421: 'Device or resource busy',
    599: 'No such task of the file operation',
};

const FILE_STATION_API_ERROR_CODE = {
    1000: 'Failed to copy files/folders. More information in <errors> object.',
    1001: 'Failed to move files/folders. More information in <errors> object.',
    1002: 'An error occurred at the destination. More information in <errors> object.',
    1003: 'Cannot overwrite or skip the existing file because no overwrite parameter is given.',
    1004: 'File cannot overwrite a folder with the same name, or folder cannot overwrite a file with the same name.',
    1006: 'Cannot copy/move file/folder with special characters to a FAT32 file system.',
    1007: 'Cannot copy/move a file bigger than 4G to a FAT32 file system.',
    // rename
    1200: 'Failed to rename it. More information in <errors> object.',
    // upload
    1800: 'There is no Content-Length information in the HTTP header or the received size doesn’t match the value of Content-Length information in the HTTP header.',
    1801: 'Wait too long, no date can be received from client (Default maximum wait time is 3600 seconds).',
    1802: 'No filename information in the last part of file content.',
    1803: 'Upload connection is cancelled.',
    1804: 'Failed to upload too big file to FAT file system.',
    1805: 'Can’t overwrite or skip the existed file, if no overwrite parameter is given.',
};

const ERROR_CODE = {
    ALL: {
        ...COMMON_ERROR_CODE,
        ...AUTH_ERROR_CODE,
        ...FILE_STATION_ERROR_CODE,
        ...FILE_STATION_API_ERROR_CODE,
    },
    COMMON_ERROR_CODE,
    AUTH_ERROR_CODE,
    FILE_STATION_ERROR_CODE,
    FILE_STATION_API_ERROR_CODE,
};

module.exports = ERROR_CODE;
