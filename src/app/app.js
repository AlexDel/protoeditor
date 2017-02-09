import angular from 'angular';
import '../style/app.css';

angular.module('app',
 [
  require('angular-ui-router'),
  require('angular-bootstrap-npm')
 ])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise("/editor");

  $stateProvider
  .state('main', {
    template: `<main>
              <ui-view></ui-view>
            </main>
            <footer>
                Image editor
            </footer>`,
    abstract: true
  })
  .state('uploader', {
    parent: 'main', 
    url: "/uploader",
    template: "<uploader></uploader>"
  })
  .state('editor', {
    parent: 'main',
    url: '/editor',
    template: '<editor></editor>'
  });
}]);

require('./services/canvasService.js');

require('./components/uploader/uploader.js');
require('./components/editor/editor.js');
require('./components/toolbar/toolbar.js');

export default 'app';