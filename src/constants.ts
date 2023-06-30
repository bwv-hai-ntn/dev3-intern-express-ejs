/* eslint-disable prettier/prettier */
export const labels = {
  FIRST: '先頭',
  LAST: '最終',
  NEXT: '次へ',
  PREVIOUS: '前へ',
};

export const messageTypes = {
  error: 'error',
  info: 'info',
  success: 'success',
};

export const titleMessageError = {
  NOT_FOUND: 'TITLE NOT FOUND',
  INTERNAL_SERVER_ERROR: 'ページエラー',
  FORBIDDEN: '権限エラー',
};

export interface IMessage {
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  content: string;
}

export const valueLst = {
  // 無効化フラグ
  disableFlgs: {
    0: '有効',
    1: '無効',
  },
};

export const messages = {
  CSVDefault: 'フォーマットのヘッダーに不必要なデータもしくは項目名の書き換えがございますとエラーになりますのでご注意ください。',
  ECL001: (column: string) => `${column}は必須項目です。`,
  FORBIDDEN: `アクセス権限がありません。<br/> 大変お手数ですが、システム管理者までご連絡ください。`,
  INTERNAL_SERVER_ERROR: `申し訳ございません。<br/> お客様がアクセスしようとしたページが見つかりませんでした。<br/>
  サイト更新などによってURLが変更になったか、URLが正しく入力されていない可能性があります。<br/>
  ブラウザの再読込を行ってもこのページが表示される場合は、システム管理者にご連絡ください。`,
  ECL034: (param: string) => `${param}に不正な値が入力または選択されています。`,
  API_SELECT_ERROR: (code: string) => `該当の情報が存在しません。(APIレスポンス：<${code}>)`,
  API_UPDATE_ERROR: (code: string) => `サーバーエラーが発生しました。データをご確認の上、再度登録をお願いいたします。(APIレスポンス：<${code}>)`,
  ECL054: 'CSV作成処理の呼び出しに失敗しました。',
  NOT_FOUND: 'NOT FOUND',
  BAD_REQUEST: 'BAD REQUEST',
  ECL056: 'セッションにデータが存在しません。',
  ECL057: 'データの登録に失敗しました。',
  E001: (params: string) => `${params} is required field.`,
  E002: ($1: string, $2: number | string, $3: number) => `${$1} must be less than ${$2} characters. (Currently ${$3} characters)`,
  E004: 'Please enter your email address correctly.',
  E006: (params: number) => `The file size limit ${params} has been exceeded.`,
  E007: (params: string) => `File extension is incorrect. Please use ${params}.`,
  E008: 'CSV format is incorrect. Please check header information.',
  I005: 'There is no result.',
  E009: (params: string | number)=> `${params} is duplicated.`,
  E010: 'Email or Password incorrect.',
  E011: 'Re-password is not the same as Password.',
  E012: ($1: string, $2: string) => `${$1} format is not correct. Please enter ${$2} only.`,
  I013: 'Saved successfully.',
  E014: 'Save failed.',
  E015: (params: string) => `${params} does not exist.`,
  I018: (params: string | number) => `Are you sure you want to delete the record with id ${params}?`,
  ErrorImport: ($1: number, $2: string) => `Row ${$1}: ${$2}`
};

