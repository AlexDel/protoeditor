import angular from 'angular';

class UploaderCtrl {
  constructor(canvasService) {
    this.canvasService = canvasService;
  }
  
  $onInit() {
    this.drawer = this.canvasService;
    
    this.onLoad = (e, reader, file, fileList, fileOjects, fileObj) => {
      this.drawer.setBackground(`data:${fileObj.filetype};base64,${fileObj.base64}`);
    }
  }
}

UploaderCtrl.$inject = ['canvasService'];
angular.module('app').component('uploader', {
  template: require('./uploader.html'),
  controller: UploaderCtrl
});

export default 'uploaderComponent';
