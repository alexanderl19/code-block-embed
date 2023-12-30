# Code Block Embed

A site that displays raw text files with syntax highliting. Primarily designed to be embeded presentations, such as with Tome.

https://github.com/alexanderl19/code-block-embed/assets/41758627/df408a45-3b33-42b3-8e1b-f891085d4c51

![a Tome slide containing the text "Basic Endpoint" with an embeded code block to the right of the text. the user currently has the second group of lines out of four sets highlighted. ](./.github/assets/demo-tome.jpeg)

## Guide

Currently, there is no GUI for creating an embed link, but crafting the URL by hand shouldn't be difficult.

## URL Syntax

The following options should be added as [search parameters](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) to the base URL (`https://code-block-embed.alexanderliu.dev/embed`)

Example: `https://code-block-embed.alexanderliu.dev/embed?code=https://raw.githubusercontent.com/...&lines=1,2,3,4,5:6,7,8,9,10`

### `code`

Type: `URL` | **Required**

A URL that serves a raw text file (MIME type: text/plain).

> [!TIP]
> If you're using a GitHub (Gist), be sure to click the "Raw" button before copying the link.

### `fontSize`

Type: `number` | Default: 16

Font size in CSS pixels.

### `lines`

Type: `1,2,3,...,10:...:1,2,3`

Groups of lines are be separated with a colon (`:`).

Each group of lines is a comma separated list of numbers.

#### Examples

| Group(s)                   | Search Param                    |
| -------------------------- | ------------------------------- |
| Lines 1-5                  | `lines=1,2,3,4,5`               |
| Lines 1-5, Lines 6-10      | `lines=1,2,3,4,5:6,7,8,9,10`    |
| Lines 1-5 + 10, Lines 6-10 | `lines=1,2,3,4,5,10:6,7,8,9,10` |

### `showOnHover`

`"true"`, or `"false"` | Default: true

Enabling will unblur non-highlighted lines while hovering on the site.

## Roadmap

- GUI Configurator
- Theme Options

## License

Copyright © 2023 Alexander Liu

MIT License
