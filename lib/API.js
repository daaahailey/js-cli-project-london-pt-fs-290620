const fs = require("fs");

module.exports = (dbPath) => {
  const getDB = () => {
    const jsonData = fs.readFileSync(dbPath);
    return JSON.parse(jsonData);
  };

  const setDB = (newDBData) => {
    fs.writeFileSync(dbPath, JSON.stringify(newDBData));
    return newDBData;
  };

  return {
    read: (key, id) => {
      const db = getDB();
      if (id) {
        return db[key].find((el) => el.id === id || el.id === parseInt(id));
      } else {
        return db[key] || [];
      }
    },
    update: (key, data) => {
      const db = getDB();
      db[key] = db[key].map((el) => {
        if (el.id !== data.id) return el;

        return {
          ...el,
          ...data,
        };
      });
      return setDB(db);
    },
    create: (key, data) => {
      const db = getDB();
      if (Array.isArray(db[key])) {
        db[key].push({
          ...data,
          id: db[key].length + 1,
        });
      } else {
        db[key] = [
          {
            ...data,
            id: 1,
          },
        ];
      }
      return setDB(db);
    },
    destroy: (key, id) => {
      const db = getDB();

      db[key] = db[key].filter((el) => el.id !== id);

      return setDB(db)[key];
    },
  };
};
