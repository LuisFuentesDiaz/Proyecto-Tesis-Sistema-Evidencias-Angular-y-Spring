


    function exportar() {
        var isChecked1 = document.getElementById('flexCheckDefault').checked;
        var isChecked2 = document.getElementById('flexCheckDefault1').checked;

        if(isChecked1){
            $('#accordion1').removeClass("oculto-impresion");

        }else{
            $('#accordion1').addClass("oculto-impresion");

        }
        if(isChecked2){
            $('#accordion2').removeClass("oculto-impresion");

        }else{
            $('#accordion2').addClass("oculto-impresion");

        }

        if (window.print)
        window.print()
        else
        alert("Para imprimir presione Crtl+P.");
    }
