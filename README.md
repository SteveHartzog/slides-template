# Slides-Template

## What and Why

Tired of fighting PowerPoint or Keynote to show basic code blocks? Want a web-native presentation
template solution? One that can show code off quickly and easily with syntax highlighting,
collapsible regions, and line numbers? Or a d3 visualization? Or maybe a simple twitter embed?

Do you want everything preconfigured out of the box (a non-trivial task), but ready to extend?
Well, this is simply the fastest way to get to an in-memory, ready to run template for
tech & code presentations - especially if you :heart: TypeScript and Sass.

## Quick Start

To install the dependencies (make sure you have [Node.js](https://nodejs.org) installed before beginning) and start the application:

1. Shell:
    ```shell
    npm install
    npm start
    ```
1. Browser: Go to [http://localhost/presentations/index.html](http://localhost/presentations/index.html).

## Technical Stack

Here is the tech integrated and working is this template:

1. **[Reveal.js](https://revealjs.com/#/)**: The open source slide framework used by [http://slid.es](http://slid.es), here is what is preconfigured:
    - Marked/Markdown: Built in plugin to add support for markdown blocks
    - Highlight.js: Built in plugin that provides a simplistic syntax highlighting of &lt;pre&gt;&lt;code&gt;&lt;/code&gt;&lt;/pre&gt; blocks
    - Zoom.js: Built in plugin that allows speakers to alt-click a slide to zoom in
    - Speaker Notes: Built in plugin that allows speakers to press `s` to show a speaker notes view
    - Reveal.js-Menu: Adds a menu slideout (lists slides, allows theme & transition changes)
    - Reveal.js-Ace: Allows embedding an Ace editor into an iframe
    - Reveald3: Allows embedding a d3 html document into an iframe
    - Badges: Adds a language badge to Hightlight.js code blocks only
    - Elapsed Time Bar: Shows a time bar above the progressbar to help with talk pacing
    - Embed Tweet: Allows embedding a tweet (totally formatted) of any given tweet url
    - addHeader(): A custom extension to show the title (from your &lt;title&gt; tag) next to the Reveal.js-menu hamburger
    - addVenue(): A custom extension to show the venue in the lower left corner, from your meta:
      - Venue: `<meta name="venue" content="NOVA CodeCamp 2018.1">`
    - addDetailsToToast(): A custom extension to show slide details in a pill (just like slid.es does):
      - Author: `<meta name="author" content="{Author Name Here}">`
      - Author Image (from your github profile): `<meta name="github" content="{Your Github name}">`
      - Title: `<title>{Author Name Here}</title>`
    - Ace editor's also get badges for JS, TS, & HTML (`reveal.scss > div.ace-container`)

1. **[TypeScript](https://www.typescriptlang.org/)**: JavaScript at scale is everywhere, even the `webpack.config.ts`
1. **[Sass](http://sass-lang.com/)**: CSS with superpowers
1. **[FontAwesome](http://fontawesome.io/)**: The iconic font and CSS toolkit
1. **[Ace Editor](https://ace.c9.io/)**: High performance code editor for the web, now ready to embed in your slide
   - Custom theme,  `ace-theme-aurelia-dark-plus` included matches the vscode `aurelia-dark-plus` theme by the Aurelia team
1. **[D3JS](https://d3js.org/)**: The library used to bring data to life
   - Sample d3 figures are in `/d3-fig/*`, a few of which are shown in use on the sample slide `/src/presentations/index.html`
1. Prebuilt [**`layouts`**](#included-layouts) available to allow you, the speaker, to quickly focus on the presentation content
1. **[Webpack 3](https://webpack.js.org/)** - completely built with Webpack... *using* **TypeScript**, preconfigured with an API to
   read and serve up the local presentations
   - Uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to serve the site in memory (no deployment)
   - Extended to serve an express route `/api/files` to list all HTML files in `/src/presentations` (except the sample slide `/src/presentations/index.html`)

## Presentation List

[https://localhost/](https://localhost/)

![Presentation List](./src/images/presentation-list.png)
> Note: This list is from my local machine, yours will be empty until you create
new html files under `/src/presentations/*`

### Title, Author, Presented

Use &lt;meta&gt; tags & the &lt;title&gt; tag to get your presentation details to show up on the presentation list.

```html
<title>Slides Template</title>
<meta name="author" content="Steve Hartzog">
<meta name="presented" content="{Date Presented}" scheme="YYYY-MM-DD">
<meta name="venue" content="{Venue Name}">
```

### Technology

To get a technology group to show on the list, create a folder underneath `presentations`:

Group | Directory Example
----- | ---
JavaScript | /src/presentations/**javascript**/intro-101.html
TypeScript | /src/presentations/**typescript**/intro-101/index.html
Webpack | /src/presentations/**webpack**/webpack-501/index.html

## Slide Configuration

### Disable Plugins

By default all plugins are enabled, but you can disable some plugins if you
don't need them. To disable one of these plugins just add a CSV list of plugins
to disable in the `data-disable-plugins` attribute on `.slides`:

```html
<div class="slides" data-disable-plugins="d3, ace">
```

> Valid Plugins to disable include: `ace, badges, d3, hljs, menu, timeBar, tweets`

### Timer

To enable a timer above your progressbar (on the bottom), just add the time in _minutes_ to your `.slides` container:

```html
<div class="slides" data-timer="15"><!-- for a 15 minute talk -->
```

### Included Layouts

`Layouts` are classes you can assign that provide some structure to your slide.
This structure comes from the `./src/styles/layouts.scss` style sheet.
Here are a few to start (all using Flex):

1. `<section class="two-column">`: Two columns, small left (with shaded background), big right column
1. `<section class="two-row-hero">`: Two rows, large big (with shaded background, designed for a 'hero' image), smaller bottom row
1. `<section class="two-row-header">`: Two rows, small big (with shaded background), large bottom row
1. `<section class="closer">`: For an information packed final slide, 2 columns in the first row (1 image column, 1 data column), 2nd row for contact details (2 columns).

Once you have assigned the class, just create two child divs:

```html
<section class="two-column">
  <div>
    <h3>First Column Header</h3>
    <blockquote>Special quote</blockquote>
  </div>
  <div>
    <h3 class="bullet fragment">Bullet One</h3>
    <h3 class="bullet fragment">Bullet Two</h3>
    <h4 class="bullet fragment">Sub Bullet one</h4>
    <h3 class="bullet fragment">Bullet Three</h3>
    <h3 class="bullet fragment">Bullet Four</h3>
  </div>
</section>
```

> What are those classes on those h3's and h4's?
> > The `.bullet` class is used here to add a bullet arrow to the left of the h3
> >
> > The  `.fragment` class is used by Reveal.js to reveal each one separately
(like PowerPoint's Animation: Appear)

These layouts should (will shortly) work with all themes. Until then some sizes may be too big for some text.

- More layouts to come.
- Pull requests accepted.

### Reveal.js-Menu

To add a custom slide title (by default it grabs the first h# tag), just add the
`data-menu-title` attribute on any gives `section` tag:

```html
<section data-menu-title="My Custom Title">
```

## REST Endpoint: `/api/files`

This endpoint, which is also served when you `npm start`, will show a listing of all html
files under `./src/presentations/` (except for the template slide, `./src/presentations/index.html`).
To view what is served by this endpoint:

- [http://localhost/api/files](http://localhost/api/files) with your browser
- [Insomnia.rest](https://insomnia.rest/): The best REST API tester ever.

## Future Fixes & Features

Feedback is requested. Let me know what you need as a speaker.
Until then I'll be working on the following:

1. Fix print/pdf output to properly hide the menu and venue.
1. Update slide layout styles to support font sizes on all themes (switch from px to em)
1. More and higher quality layouts
1. Package the extended features as Reveal.js plugins
1. Enable more plugins to be disabled, or possibly disable all and have an enabled-plugins feature