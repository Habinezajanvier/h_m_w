export const storeInCredManager = (id, name, password) => {
  const cred = new window.PasswordCredential({
    id,
    password,
    name,
    iconURL: "https://go.zenhub.com/hubfs/logos%202.9.jpeg",
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

export const getFromCredManager = () => {
  navigator.credentials
    .get({
      password: true,
      federated: {
        provider: ["http://localhost:1234/"],
      },
      unmediated: true,
    })
    .then(function (credentialInfoAssertion) {
      console.log("get key", credentialInfoAssertion);
      return credentialInfoAssertion;
    })
    .catch(function (err) {
      console.error(err);
      return null;
    });
};
