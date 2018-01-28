# Slides-Template

I wanted a slides template ready for anything I might throw at it this year. That includes:

1. **Reveal.js**
1. **TypeScript**
1. **Sass**
1. **FontAwesome**
1. **Ace Editor** (it's highlighting and line numbers *CRUSH* the reveal.js default - Highlight.js)
   - With a custom theme `ace-theme-aurelia-dark-plus`, based on the theme installed
   by the VSCode `aurelia` plugin's theme.
1. **D3JS**
1. Prebuilt **`layouts`** to allow me to focus on the content.
1. All built with **Webpack 3**... *using* **TypeScript**, preconfigured with an API to
   read and serve up the local presentations with an `/api/files` endpoint.
1. **ONE** run script (`npm start`) for the app build/serve **&** an API endpoint, both with HMR.

What do I mean by `layouts`? I mean a style sheet (`./src/styles/slides.scss`) with
custom slide layouts. I built a few to start (all using Flex):

1. `.two-column`: Two columns, small left, big right.
1. `.two-row-hero`:
1. `.two-row-header`:
1. `.two-row-endcap`:
1. `.closer`: For my information packed final slides.
> These layouts should work with all themes.

## Presentation List Configuration

Use meta tags & the title tag to get your slides to show up on the presentation list with full details.

```html
<title>Slides Template</title>
<meta name="author" content="Steve Hartzog">
<meta name="presented" content="{Date Presented}" scheme="YYYY-MM-DD">
<meta name="venue" content="{Venue Name}">
```

### Presentations List: Group field

To get a group to show on the list, create a folder underneath `presentations`:
> `/src/presentations/javascript/*.html`, or
`/src/presntations/javascript/my-intro-101/*.html`

To disable one of the default plugins, add a CSV list of plugins to disable in
the `data-disable-plugins` attribute on `.slides`

```html
<div class="slides" data-disable-plugins="d3, ace">
```

> Valid Plugins to disable include: `ace, badges, d3, hljs, menu, timeBar, tweets`

## Slide Configuration

### Reveal.js-Menu

To add a custom slide title (by default it grabs the first h# tag), just add the
`data-menu-title` attribute on any gives `section` tag:

```html
<section data-menu-title="My Custom Title">
```

## Startup

To install the dependencies and start the presentation application:

```shell
npm install
npm start
```

To see the slides go to: [localhost](http://localhost). By default a list will
be shown with all presentations in `./src/presentations`.

See the example template go to: [localhost/presentations](http://localhost/presentations).

To view the API output (a listing of all html files under `./src/presentations/` -
except for the template slide, `./src/presentations/index.html`) go to:
[localhost/api/files](http://localhost/api/files) with your browser (or better yet,
[Insomnia.rest](https://insomnia.rest/) :smile:)

## Final Notes

The intent with this project was not to build a highly performant,
deployable solution. Merely an in-memory, ready to run template for
my tech presentations.