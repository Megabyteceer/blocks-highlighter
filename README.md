# blocks-highlighter

*Blocks-Highlighter* allows you to add blocks highlights with custom color.
The beginning and the ending of the block defined by regular expressions.
Extension created especially to use with [ifdef-loader](https://github.com/nippur72/ifdef-loader) but useful in any other cases.

![blocks-highlighter screenshot](https://raw.githubusercontent.com/Megabyteceer/blocks-highlighter/master/screenshot.gif)


## Extension Settings

This extension contributes the following settings:

* `blockshighlighter.blocks`: 
```
   "blockshighlighter.blocks": [
    {
      "fileType": "\\.js$",
      "begin": "^\\s*///\\s*#if EDITOR\\s*$",
      "end": "^\\s*///\\s*#endif\\s*$",
      "decorationRenderOptions": {
        "isWholeLine": true,
        "backgroundColor": "rgba(0,100,255,0.08)"
      }
    },
    {
      "fileType": "\\.js$",
      "begin": "^\\s*///\\s*#if DEBUG\\s*$",
      "end": "^\\s*///\\s*#endif\\s*$",
      "decorationRenderOptions": {
        "isWholeLine": true,
        "backgroundColor": "rgba(0,255,100,0.08)"
      }
    }
  ]
```

To make single line blocks - just omit "end" RegExp of make it equal ot "begin" RegExp.