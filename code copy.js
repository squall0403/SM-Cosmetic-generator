"use strict";
// check if any current vector is selected
if (figma.currentPage.selection.length > 0) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    class SvgShape {
        constructor(width, height, fill, stroke, dataString, isGroup) {
            this.width = Math.round(width);
            this.height = Math.round(height);
            this.viewBox = `0 0 ${this.width} ${this.height}`;
            this.fill = fill ? fill : 'none';
            this.stroke = stroke ? stroke : 'none';
            this.dataString = dataString;
            this.isGroup = isGroup;
        }
        getSvg() {
            if (!this.isGroup) {
                var svgPath = `<svg width="${this.width}" height="${this.height}" viewBox="${this.viewBox}" xmlns="http://www.w3.org/2000/svg">
      <path d="${this.dataString}" stroke="${this.stroke}" fill="${this.fill}"/>
      </svg>`;
                return (svgPath);
            }
        }
    }
    ;
    var resSVG = [];
    /**
     * getSVG
     */
    function parseSVG(node, isGroup) {
        if (node.fills.length) {
            var shapeFill = node.fills[0].color;
            shapeFill = rgbToHex(shapeFill.r, shapeFill.g, shapeFill.b);
        }
        if (node.strokes.length) {
            var shapeStroke = node.strokes[0].color;
            shapeStroke = rgbToHex(shapeStroke.r, shapeStroke.g, shapeStroke.b);
        }
        const newShape = new SvgShape(node.width, node.height, shapeFill, shapeStroke, node.vectorPaths[0].data, isGroup);
        resSVG.push(newShape.getSvg());
    }
    const node = figma.currentPage.selection[0];
    if (node.type == 'VECTOR') {
        parseSVG(node, false);
    }
    if (node.type == 'GROUP') {
        for (const vecNode of node.children) {
            parseSVG(vecNode, true);
        }
        // getSVG(node, true)
    }
    figma.showUI(__uiFiles__.cosGen, { width: 1440, height: 1200 });
    figma.ui.postMessage({ svgPath: resSVG });
}
else {
    figma.notify("Please select a shape to start");
    /*   figma.showUI(__uiFiles__.alert, { title: 'Failed to start' });
      figma.ui.postMessage({ title: "Warning", message: "Please select a shape to start" }) */
}
