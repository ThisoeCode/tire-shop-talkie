# Tire Shop Talkie

by Thisoe



## About

- Required preparation (stack): an LAMP server (uses `.htaccess` and MySQL)
- App Language: Korean
- ⚠️ App Timezone: Seoul



## TODO List for Repo Cloners

[] Change site name (search codebase `ACME TIRE`)
[] Change `public/` icon images
[] Add password in [login.php](./admin/api/login.php) (`$solidPW`, `$dynamicPW`)
[] Add MySQL info in [.htaccess](./admin/api/.htaccess)
[] Change timezone if needed: search codebase `Timezone`
[] Create MySQL table:
```sql
CREATE TABLE `ACME_TIRE` (
  `no` int(11) NOT NULL,
  `auto_datetime` datetime NOT NULL,
  `dt` int(11) UNSIGNED NOT NULL,
  `ctnt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ctnt`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```



## Dev TODOs


