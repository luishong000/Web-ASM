var db = window.openDatabase("luis_shop", "1.0", "Luis Shop", 200000);

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
  }
  
  function fetch_transaction_success(name) {
    log(`INFO`, `Insert "${name}" successfully.`);
  }
  
  function table_transaction_success(table) {
    log(`INFO`, `Create table "${table}" successfully.`);
  }
  
  function transaction_error(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`);
  }
  
  function initialize_database() {
    db.transaction(function (tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
          id INTEGER PRIMARY KEY,
          name TEXT UNIQUE NOT NULL
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`city`), transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS district (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          city_id INTEGER NOT NULL,
          FOREIGN KEY (city_id) REFERENCES city(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`district`), transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS ward (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          district_id INTEGER NOT NULL,
          FOREIGN KEY (district_id) REFERENCES district(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`ward`), transaction_error);
  
      query = `CREATE TABLE IF NOT EXISTS account (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          first_name TEXT NULL,
          last_name TEXT NULL,
          birthday REAL NULL,
          phone TEXT NULL,
          street TEXT NULL,
          ward_id INTEGER NULL,
          district_id INTEGER NULL,
          city_id INTEGER NULL,
          status INTEGER NOT NULL,
          FOREIGN KEY (city_id) REFERENCES city(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`account`), transaction_error);
  
      var query = `CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT NULL,
          parent_id INTEGER NULL,
          FOREIGN KEY (parent_id) REFERENCES category(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`category`), transaction_error);
  
      var query = `CREATE TABLE IF NOT EXISTS product (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT NULL,
          price REAL NOT NULL,
          category_id INTEGER NULL,
          img TEXT NULL,
          FOREIGN KEY (category_id) REFERENCES category(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`product`), transaction_error);
  
      var query = `CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          FOREIGN KEY (account_id) REFERENCES account(id),
          FOREIGN KEY (product_id) REFERENCES product(id)
        )`;
  
      tx.executeSql(query, [], table_transaction_success(`cart`), transaction_error);
    });
  }
  
  function fetch_database() {
    db.transaction(function (tx) {
      var query = `INSERT INTO category (name, description) VALUES(?,?)`;
      tx.executeSql(query, ["Mouse", "chuot"], fetch_transaction_success("Mouse"), transaction_error);
      tx.executeSql(query, ["Keyboard", "ban phim"], fetch_transaction_success("Keyboard"), transaction_error);
      tx.executeSql(query, ["Headset", "tai nghe"], fetch_transaction_success("Headset"), transaction_error);
      tx.executeSql(query, ["Mousepad", "lot chuot"], fetch_transaction_success("Mousepad"), transaction_error);
  
      query = `INSERT INTO account (username, password, status) VALUES (?,?,1)`;
      tx.executeSql(query, ["admin@test.com", "12345"], fetch_transaction_success("admin@test.com"), transaction_error);
  
      query = `INSERT INTO product (name, img, price, category_id) VALUES(?,?,?,?)`;
      tx.executeSql(query, ["Iphone 12 Black 64GB", "img/product/product1.jpg", 3000000, 1], fetch_transaction_success("Product 01"), transaction_error);
      tx.executeSql(query, ["Iphone 12 Black 128GB", "img/product/product2.jpg", 3000000, 2], fetch_transaction_success("Product 02"), transaction_error);
      tx.executeSql(query, ["Iphone 12 Black 256GB", "img/product/product3.jpg", 3000000, 1], fetch_transaction_success("Product 03"), transaction_error);
      tx.executeSql(query, ["Iphone 12 White 64GB", "img/product/product4.jpg", 5000000, 2], fetch_transaction_success("Product 04"), transaction_error);
      tx.executeSql(query, ["Iphone 12 White 128GB", "img/product/product5.jpg", 5000000, 2], fetch_transaction_success("Product 05"), transaction_error);
      tx.executeSql(query, ["Iphone 12 White 256GB", "img/product/product6.jpg", 5000000, 2], fetch_transaction_success("Product 06"), transaction_error);
      tx.executeSql(query, ["Iphone 13 Black 64GB", "img/product/product7.jpg", 3500000, 3], fetch_transaction_success("Product 07"), transaction_error);
      tx.executeSql(query, ["Iphone 13 Black 128GB", "img/product/product8.jpg", 3500000, 3], fetch_transaction_success("Product 08"), transaction_error);
      tx.executeSql(query, ["Iphone 13 Black 256GB", "img/product/product9.jpg", 3500000, 3], fetch_transaction_success("Product 09"), transaction_error);
      tx.executeSql(query, ["Iphone 13 White 64GB", "img/product/product10.jpg", 1000000, 4], fetch_transaction_success("Product 10"), transaction_error);
      tx.executeSql(query, ["Iphone 13 White 128GB", "img/product/product11.jpg", 1000000, 4], fetch_transaction_success("Product 11"), transaction_error);
      tx.executeSql(query, ["Iphone 13 White 256GB", "img/product/product12.jpg", 1000000, 4], fetch_transaction_success("Product 12"), transaction_error);
    });
  }