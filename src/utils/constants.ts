export const ValidationMessages = {
  Required: (field?: string) => `${field || 'This field'} is required.`,
  Min: (min: number, field?: string) => `${field || 'This field'} must be at least ${min} characters.`,
  Max: (max: number, field?: string) => `${field || 'This field'} must be at most ${max} characters.`,
  Invalid: (field: string) => `${field || 'This field'} is invalid.`,
  Password: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One special Case Character'
};

export const Regex = {
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  PAN: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
  Phone: /^[6-9]\d{9}$/,
  Pincode: /^[1-9]{1}[0-9]{2}[0-9]{3}$/
};

export const ApiMessages = {
  Succcess: {
    otpSent: (field: string) => `Otp Sent Successfully On Your ${field}.`,
    resetPassword: 'Password Reset Successfully.',
    save: (item: string) => `${item} Saved.`,
    update: (item: string) => `${item} Updated.`,
    verified: (item: string) => `${item} Verified.`,
    drafted: (item: string) => `${item} Drafted.`,
    delete: (item: string) => `${item} Deleted.`
  },
  Error: {
    common: 'Something Went Wrong. Please Try Again Later.',
    fetch: (item: string) => `Failed To Fetch ${item}.`,
    save: (item: string) => `Failed To Save ${item}.`,
    update: (item: string) => `Failed To Update ${item}.`,
    failed: (item: string) => `${item} Failed!`,
    authenticate: (item: string) => `Failed To Authenticate ${item}`,
    notExist: (item: string) => `${item} Not Exists!`,
    notVerified: (item: string, msg: string) => `Could not verify your ${item}! Please try again with correct ${msg}`,
    invalid: (item?: string) => `Invalid ${item || 'Credentials'}! Please try again.`,
    notCorrect: (item: string) => `${item} not correct. Please check your ${item}.`,
    drafted: (item: string) => `${item} Draft Failed!`,
    delete: (item: string) => `${item} Deletion Failed!`
  }
};

export const ROUTE = {
  root: '/'
};
