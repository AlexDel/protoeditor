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
      img.scaleToWidth(1040);
      
      // double passing img object is done to solve scaling issues with different sized on crop
      this.fabric.Image.fromURL(img.toDataURL(), (bgImg) => {
        this.background = bgImg;
        this.background.evented = false;
        this.background.selectable = false;
        this.canvas.sendToBack(this.background);
        this.render(this.background);
      });
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
    if (!this.cropActive) {
      // create unshaded copy of background
      this.unshadedBG = this.fabric.util.object.clone(this.background);
      
      // set shades for whole bg
      this.background.filters[0] = new this.fabric.Image.filters.Tint({
        color: '#000000',
        opacity: 0.5
      });
      this.background.applyFilters(this.canvas.renderAll.bind(this.canvas));
      
      this.cropZone = new this.fabric.Rect({
        strokeWidth: 1,
        stroke: 'rgba(0,0,0,0)',
        fill: 'rgba(0,0,0,0)',
        selectable: true,
        width: 300,
        height: 200,
      });
      
      // disable rotation
      this.cropZone.setControlsVisibility({
        mtr: false
      });
      
      this.canvas.add(this.cropZone);
      this.canvas.setActiveObject(this.cropZone);
      
      this.unshadedBG.clipTo = (ctx) => {
        ctx.rect(
          ((this.unshadedBG.width / 2) * -1) - this.unshadedBG.left + this.cropZone.left,
          ((this.unshadedBG.height / 2) * -1) - this.unshadedBG.top + this.cropZone.top,
          this.cropZone.width * this.cropZone.scaleX,
          this.cropZone.height * this.cropZone.scaleY);
      };
      this.canvas.add(this.unshadedBG);
      
      // append "apply crop button"
      this.canvas.on('mouse:move', (e) => {
        this.addApplyCropBtn(
          this.cropZone.left + (this.cropZone.width * this.cropZone.scaleX), // posX for apply BTN
          this.cropZone.top + (this.cropZone.height * this.cropZone.scaleY)  // posY for apply BTN
        );
      });
      
      // protect crop mode from muliple clicks
      this.cropActive = true;
    }
  }
  
  deactivateCrop() {
    
  }
  
  addApplyCropBtn(posX = 0, posY = 0) {
    // delete buttong if exists
    if(this.cropBtn) {
      this.canvas.remove(this.cropBtn)
    }
    
    const bg = new this.fabric.Rect({
      fill: '#32b775',
      scaleY: 0.5,
      originX: 'center',
      originY: 'center',
      rx: 0,
      ry: 0,
      width: 90,
      height:50
    });
    
    const text = new this.fabric.Text('apply crop', {
      fontSize: 16,
      originX: 'center',
      originY: 'center',
      fill: '#FFF'
    });
    
    this.cropBtn = new this.fabric.Group([ bg, text ], {
      left: posX - bg.width,
      top: posY,
      selectable: false
    });
  
    this.cropBtn.on('mouseup', (e) => {
      this.applyCrop(e);
    });
    
    this.render(this.cropBtn);
  }
  
  applyCrop(croppedImage) {
    this.canvas.remove(this.background);
    this.setBackground(this.unshadedBG.toDataURL({
      left:  this.cropZone.left,
      top: this.cropZone.top,
      width: this.cropZone.width * this.cropZone.scaleX,
      height: this.cropZone.height * this.cropZone.scaleY
    }));
    console.log(this.background);
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
