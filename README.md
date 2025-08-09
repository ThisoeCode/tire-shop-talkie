# Tire Shop Talkie


This is a web app for
truck tire shop's salesman
to send order details
to the accounting office.

© Thisoe



## About


- Required preparation (stack):
an LAMP server (uses `.htaccess` and MySQL)
- App Language: Korean
- ⚠️ App Timezone: Seoul

- Feel free to contact [Thisoe](https://github.com/ThisoeCode)
for customization or translation of the app to English, Chinese, or Japanese.



## TODO List for Repo Cloners

1. Change site name (search codebase `ACME TIRE`)
2. Change `public/` icon images
3. Add password in [login.php](./admin/api/login.php) (`$solidPW`, `$dynamicPW`)
4. Create MySQL table (fill in the table name):
```sql
CREATE TABLE `` (
  `no` int(11) NOT NULL,
  `auto_datetime` datetime NOT NULL,
  `dt` int(11) UNSIGNED NOT NULL,
  `ctnt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ctnt`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
5. Add MySQL info in [.htaccess](./admin/api/.htaccess)
6. Change timezone if needed (search codebase `TimeZone`)



## Dev TODOs


