import './toolbar.css';

class ToolbarCtrl {
  constructor(canvasService) {
    this.canvasService = canvasService;
  }
  
  $onInit() {
    this.drawer = this.canvasService;
  }
}

ToolbarCtrl.$inject = ['canvasService'];
angular.module('app').component('toolbar', {
  template: require('./toolbar.html'),
  controller: ToolbarCtrl
});

export default 'toolbarComponent';
