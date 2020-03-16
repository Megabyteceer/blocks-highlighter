# blocks-highlighter

*Blocks-Highlighter* allows you to add blocks highlights with custom color.
Beginning and ending of block defined by regular expressions.


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
