Ext.define('QuantoSpendi.controller.Categorie', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            categorieContainer: 'categorieContainer',
            addCategoria: 'categorieList button[action=addCategoria]',
            confirm: 'categorieContainer button[action=confirm]',
        },
        control: {
            categorieContainer: {
                back: 'onCategorieBack'
            },
            categorieList: {
                itemtap: 'onCategorieItemTap',
                itemswipe: 'onItemSwipe'
            },
            confirm: {
                tap: function() {
                    var form = this.getConfirm().up('formpanel');
                    form.submit({
                        success: function() {
                            Ext.Msg.alert('Corretto', 'Operazione eseguita correttamente');
                        },
                        failure: function(f, r) {
                            Ext.Msg.alert('Errore', r.message);
                        }
                    });
                }
            },
            addCategoria: {
                tap: 'onCategoriaAdd'
            }
        }
    },
            
    onCategoriaAdd: function() {
        if (!this.categoria) {
            this.categoria = Ext.widget('categoria');
        }
        this.getCategorieContainer().push(this.categoria);
    },
            
    onCategorieItemTap: function(list, index, target, record) {
    },
            
    onCategorieBack: function() {
        Ext.data.StoreManager.lookup('Categorie').load();
    },
            
    onItemSwipe: function(me, ix, target, record, event, options) {
        if (event.direction == "left") {
            var del = Ext.create("Ext.Button", {
                ui: "decline",
                text: "Delete",
                style: "position:absolute;right:0.125in;",
                handler: function() {
                    Ext.Msg.confirm("Elimina", "Vuoi eliminare il record selezionato?", function(buttonId) {

                        if (buttonId === 'no') {
                            return false;
                        }

                        Ext.Ajax.request({
                            url: 'srv/categoria-delete.php',
                            method: 'POST',
                            params: {idCategoria: record.get('idCategoria')},
                            success: function(response, options) {
                                /*var resp = Ext.decode(response.responseText);
                                if (!resp.success) {
                                    Ext.Msg.alert('Attenzione', resp.message);
                                }*/
                                var store = record.stores[0];
                                store.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Attenzione', action.result.message);
                            }
                        });
                    });
                }
            });
            var removeDeleteButton = function() {
                Ext.Anim.run(del, 'fade', {
                    after: function() {
                        del.destroy();
                    },
                    out: true
                });
            };
            del.renderTo(Ext.DomQuery.selectNode("#idCategoria" + record.get('idCategoria'), target.dom));
            me.on({
                single: true,
                buffer: 250,
                itemtouchstart: removeDeleteButton
            });
            me.element.on({
                single: true,
                buffer: 250,
                touchstart: removeDeleteButton
            });
        }
    }            

});
