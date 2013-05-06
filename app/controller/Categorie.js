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
                itemtap: 'onCategorieItemTap'
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
        alert('back');
    }            

});
