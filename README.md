<h1>Tire Shop Talkie</h1>
© Thisoe

This is a web app for
truck tire shop's salesman
to send order details
to the accounting office.



*******



# `public_html/`
This dir contains the main files to put in your LAMP server.

### About

- Required preparation (stack):
an LAMP server (uses `.htaccess` and MySQL)
- App Language: Korean
- ⚠️ App Timezone: Seoul

- Feel free to contact [Thisoe](https://github.com/ThisoeCode)
for customization or translation of the app to English, Chinese, or Japanese.


### TODO List for Repo Cloners

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

6. Change timezone if needed (search codebase: `TimeZone`)

7. Auth logics are all commented out.
    - If you want this app to require login,
      search `TODO:` throughout `public_html/` dir.
      Then uncomment & modify the logics to fit your need.

8. Modify lists of tire-sizes and wheel-sizes at [config file](/admin/src/config.js).



*******



# `acc_exe/`
This dir contains an npm package of desktop version of Accountance page, for better notification features.

### TODO List for Repo Cloners

1. Setting up [`public_html/`](#todo-list-for-repo-cloners) is **required**

2. Change the URLs to your domain where `public_html` is hosted & DNS-ed
    - Search `TODO.com` throughout `acc_exe`.



*******



# TODO List for Devs

> <i>Search `/** @todo` throughout codebase</i>

## `public_html/`
- [ ] Air pressure unit conversion calculator `단위계산기`
- [ ] Design the roadmap for `task_stat` system

## `acc_exe/`
- [ ] Make Electron desktop app for accountance page
- [ ] Update readme page for package ``


