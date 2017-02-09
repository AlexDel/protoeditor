import angular from 'angular';

class EditorCtrl {
    constructor(canvasService) {
        this.canvasService = canvasService;
    }

    $onInit() {
     
    }
       
} 

EditorCtrl.$inject = ['canvasService'];
angular.module('app').component('editor', {
    template: require('./editor.html'),
    controller: EditorCtrl
});

export default 'editorComponent';