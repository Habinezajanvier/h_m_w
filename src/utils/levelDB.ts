import { Level } from "level";

const DBName = "userTokens";

export const storeTokensInLevelDB = async (key: any, value: any) => {
  const db = new Level(DBName, { valueEncoding: "json" });
  await db.put(key, value);
  console.log("added");
  console.log(db);

  db.close(() => {
    console.log("Added and DB closed");
  });

  return true;
};

export const readFromLevelDB = async (key: any) => {
  const db = new Level(DBName, { valueEncoding: "json" });
  const value = await db.get(key);
  db.close(() => {});
  return value;
};
