const zh_TW = {
  common: {
    ok: '好的！',
    cancel: '取消',
    back: '返回',
    logOut: '登出',
    hello: '你好',
    lang: '中/英',
    yes: '是',
    no: '否',
  },
  validationErrors: {
    empty: '不能為空',
    onlyLetters: '只能包含字母',
    invalidName: '必須至少包含 2 個字符',
    invalidEmail: '必須是有效的電子郵件地址',
    invalidEmailLength: '必須至少包含 6 個字符',
    invalidPassword: '必須至少包含 12 個字符',
    invalidPasswordLowercase: '必須至少包含一個小寫字母',
    invalidPasswordUppercase: '必須至少包含一個大寫字母',
    invalidPasswordNumber: '必須至少包含一個數字',
    invalidPasswordSpecial: '必須至少包含一個特殊字符',
  },
  errorScreen: {
    title: '出了些問題！',
    friendlySubtitle:
      '這是用戶在生產環境中看到的錯誤屏幕。您需要自定義此消息（位於 `app/i18n/zh_TW.ts`），可能還需要自定義佈局（`app/screens/ErrorScreen`）。如果您想完全移除此功能，請檢查 `app/app.tsx` 中的 <ErrorBoundary> 組件。',
    reset: '重置應用',
    traceTitle: '%{name} 堆棧錯誤',
  },
  errors: {
    invalidEmail: '電子郵件地址無效。',
  },
  homeScreen: {
    addItem: '添加項目',
    itemName: '項目名稱',
    itemDescription: '項目描述',
    itemNamePlaceholder: '輸入項目名稱',
    itemDescriptionPlaceholder: '輸入項目描述',
    removeItem: '您確定要刪除此項目嗎？',
    createdOn: '創建於',
  },
  loginScreen: {
    logIn: '登入',
    enterDetails:
      '在下方輸入您的詳細信息以訪問 Spacebox 的 React Native 應用。',
    emailFieldLabel: '電子郵件',
    passwordFieldLabel: '密碼',
    firstNameFieldLabel: '名字',
    lastNameFieldLabel: '姓氏',
    emailFieldPlaceholder: '輸入您的電子郵件地址',
    passwordFieldPlaceholder: '在這裡輸入超級秘密的密碼',
    firstNameFieldPlaceholder: '輸入您的名字',
    lastNameFieldPlaceholder: '輸入您的姓氏',
    tapToLogIn: '點擊登入！',
  },
};

export default zh_TW;
