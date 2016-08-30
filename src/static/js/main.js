/**
 *  Created by boyuan on 8/29/16.
 */

require.config({
    paths: {
        juicer: 'lib/juicer',
        funcTpl: 'util/funcTpl',
        API: 'api/api.config'
    }
});

require(['lib/jquery', 'API'], function ($, API) {
});
