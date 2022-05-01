import { Level } from "level";

const persistaDb= "persistStore";
const monkdb = 'monkStore';


const persistStore =  new Level(persistaDb, { valueEncoding: "json" })
const db = new Level(monkdb, { keyEncoding:'binary',valueEncoding: "binary" })

export const storeTokensInLevelDB = async (key: any, value: any) => {
  await db.put(key, value);
  return true;
};

export const readFromLevelDB = async (key: any) => {
  
  return await db.get(key);;
};


export {db, persistStore};




