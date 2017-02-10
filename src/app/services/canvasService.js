import angular from 'angular';

class CanvasService {
  constructor() {
    this.fabric = fabric;
    this.initCanvas();
    
    let url = '/images/22.jpg';
    this.setBackground(url);
    
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
  
  setBackground(imageUrl) {
    this.fabric.Image.fromURL(imageUrl, (img) => {
      this.background = img;
      this.background.selectable = false;
      this.background.evented = false;
      this.background.scaleToWidth(1040);
      this.render(this.background);
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
  
  activateCrop() {
    // create unshaded copy of background
    const unshadedBG = this.fabric.util.object.clone(this.background);
    
    // set shades for whole bg
    this.background.filters[0] = new this.fabric.Image.filters.Tint({
      color: '#000000',
      opacity: 0.5
    });
    this.background.applyFilters(this.canvas.renderAll.bind(this.canvas));
    
    this.cropZone = new this.fabric.Rect({
      left: 400,
      top: 400,
      strokeWidth: 1,
      stroke: 'rgba(0,0,0,0)',
      fill: 'rgba(0,0,0,0)',
      selectable: true,
      originX: 'center',
      originY: 'center',
      width: 300,
      height: 200
    })
    
    this.canvas.add(this.cropZone);
    this.canvas.setActiveObject(this.cropZone);
    
    unshadedBG.clipTo = (ctx) => {
      console.log(this.cropZone);
      ctx.rect(0, 0, this.cropZone.width, this.cropZone.height);
    };
    this.render(unshadedBG);
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
