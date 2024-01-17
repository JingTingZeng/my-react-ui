const NameField = {
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'type your name...',
  validation: {
    required: "This input is required."
  }
}

const EmailField = {
  label: 'email',
  type: 'email',
  id: 'email',
  placeholder: 'type your email...',
  validation: {
    required: "This input is required.",
    validate: {
      oneSpecificChar: (value: string) => /^[^@]*@[^@]*$/.test(value) || 'Need to include one @.',
      limitChar: (value: string) => /^[A-Za-z0-9_\.\-@]*[A-Za-z0-9_\-]@[A-Za-z0-9_\-][A-Za-z0-9_\.\-@]*$/.test(value) || 'This input is character and  number only.'
    }
  }
}

const PhoneField = {
  label: 'phone',
  type: 'text',
  id: 'phone',
  placeholder: 'type your phone...',
  max: 10,
  validation: {
    required: "This input is required.",
    pattern: {
      value: /^09[0-9]{8}$/,
      message: "This input is number only, and start with '09'.",
    }
  }
}

const PasswordField = {
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type your password...',
  validation: {
    required: "This input is required.",
    validate: {
      pattern1: (value: string) => /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+$/.test(value) || 'This input need at least one character and number.',
      pattern2: (value: string) => /^[A-Za-z\d]{8,12}$/.test(value) || 'This input is character and number only, and 8 - 12 length.',
    }
  }
}

export {
  NameField,
  EmailField,
  PhoneField,
  PasswordField
}