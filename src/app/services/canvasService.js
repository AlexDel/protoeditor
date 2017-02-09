import angular from 'angular';

class CanvasService {
  constructor () {
    this.fabric = fabric;
    this.initCanvas();
    let url = 'http://loveopium.ru/content/2012/04/baikal2/22.jpg';
    this.addImage(url);
    
    this.defaultPresets = {
      left: 400,
      top: 400,
      radius: 100,
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
  
  addImage(imageUrl) {
    this.fabric.Image.fromURL(imageUrl,(img) => {
      img.selectable = false;
      img.evented = false;
      img.scaleToWidth(1040);
      this.canvas.add(img);
    });
  }
  
  addCircle(){
    const circle = new this.fabric.Circle(this.defaultPresets);
    this.canvas.add(circle);
  }
  
  static instance() {
    return new CanvasService();
  }
}

angular.module('app').factory('canvasService', CanvasService.instance);

export default 'CanvasService';
