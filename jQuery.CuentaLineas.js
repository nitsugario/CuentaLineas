/**
* @author Agustin Rios Reyes <nitsugario@gmail.com.com>
* @name jQuery CuentaLineas()
* @license MIT
* @purpose Plugin que cuenta y muestra las líneas con el número de línea que le corresponde, puede ser usado en elementos como textarea, input text, div, code, section etc..
**/
(function($){
	$.fn.CuentaLineas=function(propiedades){//declaramos el plugin
		var ProDefault={ //Configuración predeterminada de las propiedades.
			Nuwidth: "auto",
			Nuheight: "auto",
			classCL: "cuentaLinea"
		};
		pro = $.extend({},ProDefault,propiedades);//Ampliar nuestras opciones por defecto con las proporcionadas.
		//Iterar y dar nuevo formato a cada elemento coincidente.
		return $(this).each(function() {
			var caja=$(this);
			var ContenidoCaja="";
			if (ValidaTagName(caja.get(0).tagName)) {
				ContenidoCaja=caja.text();
			}else{
				ContenidoCaja=caja.val();
			}
			var linea="",textot="";
			var NuLinea=1;
			var liu=0;
			caja.css({"width":pro.Nuwidth,"height":pro.Nuheight});
			caja.addClass(pro.classCL);
			CuentaLineas();
			function CuentaLineas(){
				if (ContenidoCaja.length>0) {
					for (var i = 0; i < ContenidoCaja.length; i++) {
						if (ContenidoCaja.charAt(i)=='\n') {

							if (NuLinea==1 & ValidaTagName(caja.get(0).tagName)) {
								if (i>1) {
									if (ValidaTagName(caja.get(0).tagName)) {
										//textot+="<line>"+NuLinea+"| "+linea+"</line><br>";
										textot+="<span class='numeroCL'>"+(NuLinea<10? "0"+NuLinea : NuLinea)+"|&nbsp;</span>"+linea+"<br>";
									}else{
										textot+=(NuLinea<10? "0"+NuLinea : NuLinea)+"| "+$.trim(linea)+"\n";
									}
								}else{
									liu=1;
								}
							}else{
								if (liu==1) {
									NuLinea=1;
								};
								liu=0;
								if (ValidaTagName(caja.get(0).tagName)) {
										textot+="<span class='numeroCL'>"+(NuLinea<10? "0"+NuLinea : NuLinea)+"|&nbsp;</span>"+linea+"<br>";
									}else{
										textot+=(NuLinea<10? "0"+NuLinea : NuLinea)+"| "+$.trim(linea)+"\n";
									}
							}

							linea="";
							NuLinea++;
						}else{
							if (ValidaTagName(caja.get(0).tagName)){
								linea+=cambiaSpacio(ContenidoCaja.charAt(i));
							}else{
								linea+=ContenidoCaja.charAt(i);
							}
							if (i==ContenidoCaja.length-1) {
								if (linea!=0) {
									if (ValidaTagName(caja.get(0).tagName)) {
										textot+="<span class='numeroCL'>"+(NuLinea<10? "0"+NuLinea : NuLinea)+"|&nbsp;</span>"+linea+"<br>";
									}else{
										textot+=(NuLinea<10? "0"+NuLinea : NuLinea)+"| "+$.trim(linea)+"\n";
									}
									linea="";
								};
							};
							
						}
					};
				}else{
					textot="";
				}
				if (ValidaTagName(caja.get(0).tagName)) {
					return caja.html(textot);
				}else{
					return caja.val(textot);
				}
			}
			function ValidaTagName(tag){//Para validar si es un elementó diferente de texarea o text. Para eliminar la primer línea básica.
				var tagnameA=['DIV','CODE','SPAN','SECTION','ARTICLE','NAV','ASIDE','P','DIALOG','DETAILS','FOOTER','HEADER','MAIN','HGROUP','H1','H2','H3','H4','H5'];
				if ($.inArray(tag,tagnameA)!=-1) {
					return true;
				}else{
					return false;
				}
			}
			function cambiaSpacio(spa){
				if (spa==' ') {
					return '&nbsp;';
				}else if (spa=='\t') {
					return '&nbsp;&nbsp;&nbsp;&nbsp;';
				}else{
					return spa;
				}
			}
		});
	};
}(jQuery));
