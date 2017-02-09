import angular from 'angular';

class CanvasService {
  constructor() {
    this.fabric = fabric;
    this.initCanvas();
    
    let url = '/images/22.jpg';
    this.addImage(url);
    
    this.defaultPresets = {
      left: 400,
      top: 400,
      strokeWidth: 2,
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
      img.crossOrigin = true;
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
    const lineCoords = [100, 200, 300, 200];
    const line = new this.fabric.Line(lineCoords, this.defaultPresets);
    this.render(line);
  }
  
  addText() {
    const textProps = {
      textAlign: 'center',
      fontSize: 35,
      strokeWidth: 1,
      fill: 'red'
    };
    const text = new this.fabric.IText('Enter your text', {...this.defaultPresets, ...textProps});
    this.render(text);
  }
  
  dumpImage() {
    this.canvas.deactivateAll().renderAll();
    const image = this.canvas.toDataURL('png');
    const virtualLink = angular.element('<a></a>')[0];
    virtualLink.href = image;
    virtualLink.download = 'mypic.png';
    virtualLink.click();
  }
  
  static instance() {
    return new CanvasService();
  }
}

angular.module('app').factory('canvasService', CanvasService.instance);

export default 'CanvasService';
