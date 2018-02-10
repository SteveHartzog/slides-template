const head = require('../node_modules/reveal.js/lib/js/head.min');
import * as Reveal from '../node_modules/reveal.js';
import './styles/presentations.scss';

declare var hljs: any;
(<any>window).Reveal = Reveal;

const allFeatures = [ 'ace', 'badges', 'd3', 'hljs', 'menu', 'timeBar', 'titleFooter', 'tweets' ];
const elReveal = document.querySelector('.reveal');

document.addEventListener("DOMContentLoaded", () => {
  // Opacity is 0 to start
  setTimeout(() => {
    // Wait for fadin to complete
    document.querySelector('html').style.opacity = '1.0';
  }, 5000);

  // Get Theme Color and apply to custom elements
  // fixColors();
  
  // Show User Toast
  let title = document.title ? document.title : '';
  let author = getMeta('author');
  let venue = getMeta('venue');
  let identicon = getGitHubProfileImage(getMeta('github'));
  addHeader(title);
  addDetailsToast(title, author, identicon);
  addVenue(venue);

  //#region Disable Plugins
  let disabledPlugins = {
    ace: false, badges: false, d3: false, hljs: false, menu: false, timeBar: false, tweets: false
  }
  let timer = 3;
  
  let attrDisabledFeatures = document.querySelector('.slides').getAttribute('data-features-disable');
  if (attrDisabledFeatures) {
    let disabledFeatures = attrDisabledFeatures.split(',')
    for (let i = 0; i < disabledFeatures.length; ++i) {
        if (allFeatures.indexOf(disabledFeatures[i].trim()) >= 0) {
          disabledPlugins[disabledFeatures[i].trim()] = true;
        }
    }
    const timerData = document.querySelector('.slides').getAttribute('data-timer');
    if (!disabledPlugins.timeBar && timerData) {
      timer = parseInt(timerData)
    }
  }
  //#endregion

  Reveal.initialize({
    // width: '100%',
    // height: '100%',
    center: false,
    history: true,
    margin: 0.2,
    // Elapsed Time Bar (https://github.com/e-gor/Reveal.js-Title-Footer)
    allottedTime: timer * 60 * 1000,

    // - (optional) height of page/time progress bar
    progressBarHeight: 1,

    // - (optional) bar color
    barColor: 'rgb(0,250,250)',

    // - (optional) bar color when timer is paused
    // pausedBarColor: 'rgba(200,0,0,.6)',
    ace: {
      // Event is triggered when a new editor is created.
      oninit: function(editor) {
        editor.setOptions({
          cursorStyle: "wide", // ignored
          fontSize: "35px",
          fadeFoldWidgets: true,
          highlightGutterLine: false,
          showInvisibles: false,
          tabSize: 2,
          theme: "ace/theme/aurelia-dark-plus"
        });
      },
      // Event is triggered when the text of an editor has changed
      onchange: function(event, editor) {

      },
      // Automatically focus an editor when it is displayed
      autoFocus: false,

      // defines a css class name for the ace editors
      className: "ace"
    },
    badges: {
      // path: './reveal.js-badges/badges.js',
      defaults: {
        bg: 'black',
        fg: 'white',
        position: 'tr'
      },
      languages: true
    },
    menu: {
      // Specifies which side of the presentation the menu will 
      // be shown. Use 'left' or 'right'.
      side: 'left',
  
      // Add slide numbers to the titles in the slide list.
      // Use 'true' or format string (same as reveal.js slide numbers)
      numbers: true,
  
      // Specifies which slide elements will be used for generating
      // the slide titles in the menu. The default selects the first
      // heading element found in the slide, but you can specify any
      // valid css selector and the text from the first matching
      // element will be used.
      // Note: that a section data-menu-title attribute or an element
      // with a menu-title class will take precedence over this option
      titleSelector: 'h1, h2, h3, h4, h5, h6',
  
      // If slides do not have a matching title, attempt to use the
      // start of the text content as the title instead
      useTextContentForMissingTitles: false,
  
      // Hide slides from the menu that do not have a title.
      // Set to 'true' to only list slides with titles.
      hideMissingTitles: false,
  
      // Add markers to the slide titles to indicate the 
      // progress through the presentation
      markers: true,
  
      // Specify custom panels to be included in the menu, by
      // providing an array of objects with 'title', 'icon'
      // properties, and either a 'src' or 'content' property.
      custom: false,
  
      // Specifies the themes that will be available in the themes
      // menu panel. Set to 'false' to hide themes panel.
      themes: [
        { name: 'Black', theme: '/node_modules/reveal.js/css/theme/black.css' },
        { name: 'White', theme: '/node_modules/reveal.js/css/theme/white.css' },
        { name: 'League', theme: '/node_modules/reveal.js/css/theme/league.css' },
        { name: 'Sky', theme: '/node_modules/reveal.js/css/theme/sky.css' },
        { name: 'Beige', theme: '/node_modules/reveal.js/css/theme/beige.css' },
        { name: 'Simple', theme: '/node_modules/reveal.js/css/theme/simple.css' },
        { name: 'Serif', theme: '/node_modules/reveal.js/css/theme/serif.css' },
        { name: 'Blood', theme: '/node_modules/reveal.js/css/theme/blood.css' },
        { name: 'Night', theme: '/node_modules/reveal.js/css/theme/night.css' },
        { name: 'Moon', theme: '/node_modules/reveal.js/css/theme/moon.css' },
        { name: 'Solarized', theme: '/node_modules/reveal.js/css/theme/solarized.css' }
      ],
  
      // Specifies if the transitions menu panel will be shown.
      transitions: true,
  
      // Adds a menu button to the slides to open the menu panel.
      // Set to 'false' to hide the button.
      openButton: true,
  
      // If 'true' allows the slide number in the presentation to
      // open the menu panel. The reveal.js slideNumber option must 
      // be displayed for this to take effect
      openSlideNumber: false,
  
      // If true allows the user to open and navigate the menu using
      // the keyboard. Standard keyboard interaction with reveal
      // will be disabled while the menu is open.
      keyboard: true,
  
      // Normally the menu will close on user actions such as
      // selecting a menu item, or clicking the presentation area.
      // If 'true', the sticky option will leave the menu open
      // until it is explicitly closed, that is, using the close
      // button or pressing the ESC or m key (when the keyboard 
      // interaction option is enabled).
      sticky: false,
  
      // If 'true' standard menu items will be automatically opened
      // when navigating using the keyboard. Note: this only takes 
      // effect when both the 'keyboard' and 'sticky' options are enabled.
      autoOpen: true,
  
      // If 'true' the menu will not be created until it is explicitly
      // requested by calling RevealMenu.init(). Note this will delay
      // the creation of all menu panels, including custom panels, and
      // the menu button.
      delayInit: false,
  
      // By default the menu will load it's own font-awesome library
      // icons. If your presentation needs to load a different
      // font-awesome library the 'loadIcons' option can be set to false
      // and the menu will not attempt to load the font-awesome library.
      loadIcons: true
    },
    dependencies: [
      // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
      { 
        src: '/node_modules/reveal.js/lib/js/classList.js', 
        condition: function() { 
          return !document.body.classList; 
        } 
      },

      // Interpret Markdown in <section> elements
      { 
        src: '/node_modules/reveal.js/plugin/markdown/marked.js', 
        condition: () => { 
          return !!document.querySelector( '[data-markdown]' ); 
        } 
      },

      { 
        src: '/node_modules/reveal.js/plugin/markdown/markdown.js',
        condition: () => { 
          return !!document.querySelector( '[data-markdown]' ); 
        }
      },

      // Syntax highlight for <code> elements
      { 
        src: '/node_modules/reveal.js/plugin/highlight/highlight.js', 
        async: true, condition: () => !disabledPlugins.hljs, 
        callback: () => { hljs.initHighlightingOnLoad(); } 
      },

      // Zoom in and out with Alt+click
      { src: '/node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true },

      // Speaker notes
      { src: '/node_modules/reveal.js/plugin/notes/notes.js', async: true },

      // Ace integration (modified from )
      { src: '/plugins/ace/ace.js', async: true, condition: () => !disabledPlugins.ace },

      // Menu
      { src: '/node_modules/reveal.js-menu/menu.js', condition: () => !disabledPlugins.menu },

      // Reveal.js-D3
      { src: '/node_modules/reveald3/reveald3.js', condition: () => !disabledPlugins.d3 },

      // Copy|Paste Installs
      { src: '/plugins/badges/badges.js', condition: () => !disabledPlugins.badges },
      // { src: '/plugins/title-footer/title-footer.js', condition: () => !disabledPlugins.titleFooter, async: true, callback: () => {
      //   title_footer.initialize()
      // }},
      { src: '/plugins/elapsed-time-bar/elapsed-time-bar.js', condition: () => !disabledPlugins.timeBar },
      { src: '/plugins/embed-tweet/embed-tweet.js', condition: () => !disabledPlugins.tweets }
    ]
  });
});

function addDetailsToast(title, byline, image) {
  if (title.length > 0 && byline.length > 0 && image.length > 0) {
    let elToast = document.createElement('div');
    elToast.className = 'toast author';
    elToast.innerHTML = `
      <div class="image" style="background-image: url(${image})"></div>
      <div class="content">
        <h4 class="title">${title}</h4>
        <p class="byline">By ${byline}</p>
      </div>
    `;
    elReveal.appendChild(elToast);
  }
}

function addVenue(venue, sponsorLogos = []) {
  if (venue && venue.length > 0) {
    venue = venue.replace('<', '\&lt;').replace('>', '\&gt;');
    let elVenue = document.createElement('div');
    elVenue.className = 'venue';
    elVenue.innerHTML = `
      ${(sponsorLogos.length > 0) ? `<div class="image" style="background-image: url(${sponsorLogos[0]})"></div>` : ''}
      <h4 class="title">${venue}</h4>
    `;
    elReveal.appendChild(elVenue);
  }
}

function addHeader(title) {
  if (title && title.length > 0) {
    let elTitle = document.createElement('header');
    elTitle.className = 'title';
    elTitle.innerHTML = title;
    elReveal.appendChild(elTitle);
  }
}

function getMeta(name) {
  let el = document.querySelector(`meta[name="${name}"]`);
  return el ? el.getAttribute('content') : '';
}

function getGitHubProfileImage(github) {
  if (github && github.length > 0) {
    return `https://github.com\\\\${github}.png?size=200`;
  }
  return '/images/default-identicon.png';
}

function fixColors() {
  let sample = document.querySelector('.reveal a')
  let themeColor = getComputedStyle(sample).color;
  let newStyle = document.createElement('style')
  newStyle.innerHTML = `header.title { color: ${themeColor}; }`;
  document.body.appendChild(newStyle);
  debugger;
}