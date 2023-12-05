import { isEmptyObject } from "jquery";

// check if any current vector is selected
if (figma.currentPage.selection.length > 0) {
  function componentToHex(c: { toString: (arg0: number) => any; }) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r: { toString: (arg0: number) => any; }, g: { toString: (arg0: number) => any; }, b: { toString: (arg0: number) => any; }) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  function getFill(node: VectorNode) {
      if (node.fills.length) {
      var shapeFill = node.fills[0].color
      shapeFill = rgbToHex(shapeFill.r, shapeFill.g, shapeFill.b)
    }
    return shapeFill
  }
  function getStroke(node: VectorNode) {
    if (node.strokes.length) {
      var shapeStroke = node.strokes[0].color
      shapeStroke = rgbToHex(shapeStroke.r, shapeStroke.g, shapeStroke.b)
    }
    return shapeStroke
  }
  class SvgShape {
    width: number;
    height: number;
    dataString: string;
    fill: string;
    stroke: string;

    public constructor(width: number, height: number, fill: string, stroke: string, dataString: string) {
      this.width = Math.round(width);
      this.height = Math.round(height);
      fill ? this.fill = fill : this.fill = 'none'
      stroke ? this.stroke = stroke : this.stroke = 'none'
      this.dataString = dataString;
    }
    public getSvg(): string | undefined {
      var svgPath = `<path d="${this.dataString}" stroke="${this.stroke}" fill="${this.fill}"/>`
      return (svgPath)
    }
  };
  var groupSVG = []
  var newGroupSVG: string;
  const node = figma.currentPage.selection[0] 

  if (node.type != 'GROUP') {

    const shapeFill = getFill(node)
    const shapeStroke = getStroke(node)
    const newShape = new SvgShape(node.width, node.height, shapeFill, shapeStroke, node.vectorPaths[0].data)
    newShape.getSvg()

    groupSVG.push(`<svg width="${node.width}" height="${node.height}" viewBox="0 0 ${node.width} ${node.height}" xmlns="http://www.w3.org/2000/svg">`)
    groupSVG.push(newShape.getSvg())
    groupSVG.push('</svg>')
  } else {
    for (const vecNode of node.children) {
      const shapeFill = getFill(vecNode)
      const shapeStroke = getStroke(vecNode)
      const newShape = new SvgShape(vecNode.width, vecNode.height, shapeFill, shapeStroke, vecNode.vectorPaths[0].data)
      groupSVG.push(newShape.getSvg())
    }
    groupSVG = [`<svg width="${node.width}" height="${node.height}" viewBox="0 0 ${node.width} ${node.height}" xmlns="http://www.w3.org/2000/svg">`].concat(groupSVG)
    groupSVG.push('</svg>')
  }
  newGroupSVG = groupSVG.join('')

  figma.showUI(__uiFiles__.cosGen, { width: 1440, height: 1200 });
  figma.ui.postMessage({ svgPath: newGroupSVG })

} else {
  figma.notify("Please select a shape to start")
  /*   figma.showUI(__uiFiles__.alert, { title: 'Failed to start' });
    figma.ui.postMessage({ title: "Warning", message: "Please select a shape to start" }) */
}