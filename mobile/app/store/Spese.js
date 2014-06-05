Ext.define("QuantoSpendi.store.Spese", {
    extend: 'Ext.data.Store',
    alias: 'store.Spese',
    config: {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'srv/spese.php',
            reader: {
                type: 'json'
            }
        }
    }
});
