const passwordInput = document.querySelector('input[type="text"]');
const PasswordInstruction = document.querySelector('.password-instructions');

const passwordProgress = document.querySelector('.password-progress');

const checkPasswordStrength = () => {
  const suggestions =
    passwordInput.value.length > 0 && passwordSuggestions(passwordInput.value);

  if (passwordInput.value.length === 0) {
    passwordProgress.style.setProperty('--strength', 0);
  }

  PasswordInstruction.innerHTML = '';
  let strength = 100;
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i].strengthLost) {
      strength -= suggestions[i].strengthLost;
    }
    const paragraph = document.createElement('p');
    paragraph.innerHTML = suggestions[i].passwordWarning;

    PasswordInstruction.appendChild(paragraph);
  }

  passwordInput.value.length > 0 &&
    passwordProgress.style.setProperty('--strength', strength);
};

const passwordSuggestions = (password) => {
  const passwordImprovements = [];
  passwordImprovements.push(lengthAssessment(password));
  passwordImprovements.push(lowerCharacterAssessment(password));
  passwordImprovements.push(upperCharacterAssessment(password));
  passwordImprovements.push(numberAssessment(password));
  passwordImprovements.push(specialCharacterAssessment(password));
  passwordImprovements.push(repeatCharacterAssessment(password));

  const filteredPasswordImprovements = passwordImprovements.filter(
    (password) => password !== undefined
  );
  return filteredPasswordImprovements;
};

passwordInput.addEventListener('input', checkPasswordStrength);

const lowerCharacterAssessment = (password) => {
  return characterAssessment(password, /[a-z]/g, 'lowercase characters');
};

const upperCharacterAssessment = (password) => {
  return characterAssessment(password, /[A-Z]/g, 'uppercase characters');
};

const numberAssessment = (password) => {
  return characterAssessment(password, /[0-9]/g, 'numbers');
};

const specialCharacterAssessment = (password) => {
  return characterAssessment(password, /[^0-9a-zA-z]/g, 'special characters');
};

const lengthAssessment = (password) => {
  if (password.length < 6) {
    return {
      passwordWarning: 'Password must be atleast 5 characters long',
      strengthLost: 20
    };
  }

  if (password.length < 11) {
    return {
      passwordWarning: 'Password could be longer',
      strengthLost: 10
    };
  }
};

const characterAssessment = (password, regex, assessmentType) => {
  const characterMatch = password.match(regex) || [];

  if (characterMatch.length === 0) {
    return {
      passwordWarning: `Password has no ${assessmentType}`,
      strengthLost: 20
    };
  }

  if (characterMatch.length < 3) {
    return {
      passwordWarning: `Password must have more ${assessmentType}`,
      strengthLost: 10
    };
  }
};

const repeatCharacterAssessment = (password) => {
  const characterMatch = password.match(/(.)\1/g) || [];
  if (characterMatch.length > 0) {
    return {
      passwordWarning: 'Password has more than one repeated character',
      strengthLost: 10
    };
  }
};
