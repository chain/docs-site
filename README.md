# Staging Server
```bash
ssh ec2-user@3.221.113.242
```

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

1. Install docker (in case you have not already)
2. Run `docker-compose up`


## Developer Stuff (Not needed for most cases)
Under the hood, some useful commands that docusaurus uses but that are not needed for most use cases are below.


```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. 

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
