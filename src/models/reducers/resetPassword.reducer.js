/**
 * @fileoverview Reducer for state management in the reset password form
 * @author Alina Dorosh
 */

export const RESET_PWD = {
  NEW_PWD_INPUT: "newPwd",
  NEW_PWD_VALIDATION: "validPwd",
  NEW_PWD_FOCUS: "pwdFocus",
  PWD_MATCH_INPUT: "matchPwd",
  PWD_MATCH_VALIDATION: "validMatch",
  PWD_MATCH_FOCUS: "matchFocus",
  ERROR_MSG: "errMsg",
  RESTORE_STATE: "restore",
};

export const resetPwdReducer = (state, action) => {
  switch (action.type) {
    case RESET_PWD.NEW_PWD_INPUT:
      return { ...state, newPwd: action.payload };
    case RESET_PWD.NEW_PWD_VALIDATION:
      return { ...state, validPwd: action.payload };
    case RESET_PWD.NEW_PWD_FOCUS:
      return { ...state, pwdFocus: action.payload };
    case RESET_PWD.PWD_MATCH_INPUT:
      return { ...state, matchPwd: action.payload };
    case RESET_PWD.PWD_MATCH_VALIDATION:
      return { ...state, validMatch: action.payload };
    case RESET_PWD.PWD_MATCH_FOCUS:
      return { ...state, matchFocus: action.payload };
    case RESET_PWD.ERROR_MSG:
      return { ...state, errMsg: action.payload };
    case RESET_PWD.RESTORE_STATE:
      return action.payload;
    default:
      throw new Error("Something went wrong");
  }
};

export const initialResetPwdState = {
  newPwd: "",
  validPwd: false,
  pwdFocus: false,
  matchPwd: "",
  validMatch: false,
  matchFocus: false,
  errMsg: "",
};
