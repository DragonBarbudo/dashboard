Vue.use(Buefy.default);

var App = new Vue({
    el: '#app',
    data: {       
        clientes: [],
        vendedores: [],
        newSeller : []
    },
    methods: {
        addSeller : function(){
            var theseller = {'usuario':this.newSeller.usuario, 'contrasena':this.newSeller.contrasena, 'adidas':0, 'reebok':0};
            
            
            fetch('https://dragonbarbudo.com/api/grabasa/seller/add/',{ method: "POST", body: JSON.stringify(theseller) })
            .then(function(u){ return u.json();} )
            .then(
                function(json){ 
                    console.log(json);
                    App.$snackbar.open("Usuario creado");
                    App.newSeller.usuario = "";
                    App.newSeller.contrasena = "";
                    App.vendedores.push(json);
                }
            );
        },
        login : function(){
            console.log('logingg');
        },
        saveSeller : function(id, row){
            fetch('https://dragonbarbudo.com/api/grabasa/seller/update/',{ method: "POST", body: JSON.stringify(row) })
                .then(function(u){ return u.json();} )
                .then(
                    function(json){ 
                        console.log(json);
                        App.$snackbar.open("Datos guardados");
                    }
                );
        },
        deleteClient : function(row, indx){
            this.clientes.splice(indx, 1);
            fetch('https://dragonbarbudo.com/api/grabasa/client/delete/',{ method: "POST", body: JSON.stringify(row) })
                .then(function(u){ return u.json();} )
                .then(
                    function(json){ 
                        console.log(json);
                        App.$snackbar.open("Eliminado");             
                    }
                );
        },
        deleteSeller : function(row, indx){
            this.vendedores.splice(indx, 1);
            fetch('https://dragonbarbudo.com/api/grabasa/seller/delete/',{ method: "POST", body: JSON.stringify(row) })
                .then(function(u){ return u.json();} )
                .then(
                    function(json){ 
                        console.log(json);
                        App.$snackbar.open("Eliminado");         
                    }
                );
        }

    }
})


fetch('https://dragonbarbudo.com/api/grabasa/client/get/').then(
    function(u){ return u.json();}
  ).then(
    function(json){
        var arr = Object.keys(json).map(function(k) { return json[k] });        
        App.clientes = arr;
        
    }
);

fetch('https://dragonbarbudo.com/api/grabasa/seller/get/').then(
    function(u){ return u.json();}
  ).then(
    function(json){
        var arr = Object.keys(json).map(function(k) { return json[k] });        
        App.vendedores = arr;
    }
);
