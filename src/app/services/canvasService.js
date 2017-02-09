import angular from 'angular';

class CanvasService {
  constructor() {
    this.fabric = fabric;
    this.initCanvas();
    
    let url = 'http://loveopium.ru/content/2012/04/baikal2/22.jpg';
    this.addImage(url);
    
    this.defaultPresets = {
      left: 400,
      top: 400,
      strokeWidth: 5,
      stroke: 'red',
      fill: 'rgba(0,0,0,0)',
      selectable: true,
      originX: 'center',
      originY: 'center'
    };
  }
  
  initCanvas() {
    this.canvas = new this.fabric.Canvas(document.querySelectorAll('#canvas')[0]);
  }
  
  render(canvasObj) {
    this.canvas.add(canvasObj);
  }
  
  addImage(imageUrl) {
    this.fabric.Image.fromURL(imageUrl, (img) => {
      img.selectable = false;
      img.evented = false;
      img.scaleToWidth(1040);
      this.render(img);
    });
  }
  
  addCircle() {
    const cirlceProps = {
      radius: 100
    };
    const circle = new this.fabric.Circle({ ...this.defaultPresets, ...cirlceProps });
    this.render(circle);
  }
  
  addRect() {
    const rectProps = {
      width: 300,
      height: 200
    };
    const rect = new this.fabric.Rect({ ...this.defaultPresets, ...rectProps });
    this.render(rect);
  }
  
  addLine() {
    const lineCoords = [100, 200, 200, 200];
    const line = new this.fabric.Line(lineCoords, this.defaultPresets);
    this.render(line);
  }
  
  static instance() {
    return new CanvasService();
  }
}

angular.module('app').factory('canvasService', CanvasService.instance);

export default 'CanvasService';
