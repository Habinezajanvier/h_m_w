export const storeInCredManager = (id, name, password, iconURL) => {
  const cred = new window.PasswordCredential({
    id,
    password,
    name,
    iconURL: "data:image/jpeg;base64,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",
  });

  navigator.credentials
    .store(cred)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};