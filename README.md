# SAHA Theme for OJS 3

## Background

This is a theme for Open Journal Systems that uses Bootstrap 4.0. It was designed for the journal SAHA (South Asian Humanities Archive).

## Compatibility

OJS 3.1.2 is the last version that this theme supports.
This theme relies on `DAORegistry::getDAO("PublishedArticleDAO")`, whose plugin is not compatible with the latest version of OJS.

## How to Install (in Production)

1. Download this repository.
2. Move the `saha` folder from this repository to `plugins/themes/` in your OJS instance.

## Running via Docker (Local Development)

### Install Docker

#### Windows

Download from https://www.docker.com/products/docker-desktop

#### MacOS

Install [Homebrew](https://brew.sh/) and then run the following command:

```shell
brew install --cask docker
```

### Spin-Up

```shell
docker-compose up
```

Navigate to: http://localhost:8080.

### Setup

When setting up the journal, use the following values:

Field         | Value
------------- | -------------
driver        | `MySQLi`
host          | `ojs_db_demo`
username      | `ojs`
password      | `ojsPwd`
database name | `ojs`

Uncheck `Create new database`.
Uncheck `Beacon`.

Log in with the admin credentials you picked.

NOTE: In order to actually see content on the site, you must:

1. Create an issue
2. Submit a submission
3. Assign a reviewer
4. Review the submission
5. Schedule the submission for publication
6. Publish the issue

## Credits

This theme is based on the [OldGregg](https://github.com/Vitaliy-1/oldGregg/tree/master) theme by Vitaly Bezsheiko, which I chose as a basis because it includes and incorporates Bootstrap 4. I (Andrew Ollett) have modified most of the templates and style files.

## License

Released under the GPLv3 (see the associated [license](./LICENSE)).
