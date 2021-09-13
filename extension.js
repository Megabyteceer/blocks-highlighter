
var vscode = require('vscode');
var window = vscode.window;
var workspace = vscode.workspace;
var Range = vscode.Range;
var Position = vscode.Position;

function activate(context) {
	var timeout = null;
	var blocks;
	init();

	window.onDidChangeVisibleTextEditors(function () {
		triggerUpdateDecorations();
	}, null, context.subscriptions);

	workspace.onDidChangeTextDocument(function () {
		triggerUpdateDecorations();
	}, null, context.subscriptions);

	workspace.onDidChangeConfiguration(function () {
		init();
		triggerUpdateDecorations();
	}, null, context.subscriptions);

	function updateDecorations() {
		timeout = null;

		window.visibleTextEditors.forEach((editor) => {

			var text = editor.document.getText();

			let stack = [];

			let a = text.split('\n');
			let len = a.length;

			let ranges = new Map();

			for(let i = 0; i < len; i++) {
				let lineTxt = a[i];

				for(let block of blocks) {
					if(block.fileType && !block.fileType(editor.document.fileName)) {
						continue;
					}
					if(block.beginParser(lineTxt)) {
						stack.push({
							beginLine: i,
							block
						});
					}
					if(!block.endParser || block.endParser(lineTxt)) {
						let latestBegin = stack[stack.length -1];
						if(latestBegin && (latestBegin.block === block)) {
							stack.pop();
							if(!ranges.has(block)) {
								ranges.set(block, []);
							}
							ranges.get(block).push(
								{
									range: new Range(new Position(latestBegin.beginLine, 0), new Position(i, 0))
								});
							break;	
						}
					}
				}
			}

			for(let block of ranges.keys()) {
				let range = ranges.get(block);
				editor.setDecorations(block.decorationType, range);
			}
		});
	}

	function init() {
		
		const config = workspace.getConfiguration("blockshighlighter");

		if(blocks) {
			for(let block of blocks) {
				window.visibleTextEditors.forEach((editor) => {
					editor.setDecorations(block.decorationType, []);
				});
			}
		}

		blocks = config.get("blocks").map((blockConfig) => {
			return {
				decorationType: window.createTextEditorDecorationType(blockConfig.decorationRenderOptions),
				beginParser: compileExp(blockConfig.begin),
				endParser: (!blockConfig.end || blockConfig.end === blockConfig.begin) ? null : compileExp(blockConfig.end),
				fileType: blockConfig.fileType && compileExp(blockConfig.fileType)
			};
		});
	}

	function compileExp(src) {
		try {
			let regExp = new RegExp(src);
			return (txt) => {
				return txt.search(regExp) >= 0;
			};
		} catch(er) {
			return (txt) => {
				return txt.indexOf(src) >= 0;
			};
		}
	}

	function triggerUpdateDecorations() {
		timeout && clearTimeout(timeout);
		timeout = setTimeout(updateDecorations, 0);
	}

	triggerUpdateDecorations();

	//*/
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};