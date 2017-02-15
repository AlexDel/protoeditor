import './toolbar.css';

class ToolbarCtrl {
  constructor(canvasService) {
    this.canvasService = canvasService;
  }
  
  $onInit() {
    this.drawer = this.canvasService;
    
    this.availableColors = ['#000000', '#ffffff', '#ff0000', '#0066ff', '#009900', '#ff3399'];
    this.currentColor = this.availableColors[0];
  }
}

ToolbarCtrl.$inject = ['canvasService'];
angular.module('app').component('toolbar', {
  template: require('./toolbar.html'),
  controller: ToolbarCtrl
});

export default 'toolbarComponent';
