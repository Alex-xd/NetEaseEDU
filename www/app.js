/**
 *  Created by boyuan on 8/29/16. 用volo构建
 */

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        api: '../app/api'
    },
    shim: {
        'jquery.md5': {
            deps: ['jquery']
        }
    }

});

// Start loading the main app file. Put all of
// your application logic in there.
require(['app/main']);
