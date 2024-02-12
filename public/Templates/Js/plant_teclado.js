function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function crearTeclados(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (marcas, productos) {pug_html = pug_html + "\u003Csearch class=\"grid-search\"\u003E\u003Cform action=\"aplicar a la vista\"\u003E\u003Cfieldset\u003E\u003Cp\u003EFiltros:\u003C\u002Fp\u003E\u003Cspan\u003E \u003Clabel\u003EPrecio ascendente: \u003Cinput type=\"radio\" name=\"ordenar_precio\" value=\"radio1\"\u002F\u003E\u003C\u002Flabel\u003E\u003Clabel\u003EPrecio descendente: \u003Cinput type=\"radio\" name=\"ordenar_precio\" value=\"radio2\"\u002F\u003E\u003C\u002Flabel\u003E\u003Cdiv\u003EMarca:\u003Cselect id=\"marca\"\u003E";
// iterate marcas
;(function(){
  var $$obj = marcas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var marca = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug_attr("value", marca.marca, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = marca.marca) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var marca = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug_attr("value", marca.marca, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = marca.marca) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003C\u002Fspan\u003E\u003C\u002Ffieldset\u003E\u003C\u002Fform\u003E\u003C\u002Fsearch\u003E\u003Carticle class=\"grid-layout-content\"\u003E";
// iterate productos
;(function(){
  var $$obj = productos;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var producto = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (" class=\"grid-box\""+pug_attr("data-id", producto.id, true, false)) + "\u003E \u003Cdiv class=\"image-container\"\u003E\u003Cbutton class=\"delete-button\"\u003E\u003Cimg src=\"\u002FImages\u002Fdelete.png\" alt=\"Icono de borrado\"\u002F\u003E\u003C\u002Fbutton\u003E";
if (producto.image1 && !producto.image2) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-alone-producto\""+pug_attr("src", producto.image1, true, false)+" alt=\"Imagen del producto\"") + "\u002F\u003E";
}
else {
if (producto.image1) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-1-producto\""+pug_attr("src", producto.image1, true, false)+" alt=\"Imagen 1 de producto\"") + "\u002F\u003E";
if (producto.image2) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-2-producto\""+pug_attr("src", producto.image2, true, false)+" alt=\"Imagen 2 de producto\"") + "\u002F\u003E";
}
}
else {
pug_html = pug_html + "\u003Cimg class=\"imagen-alone-producto\" src=\"\u002FImages\u002Fdefault_no_image.png\" alt=\"No hay imagen disponible\"\u002F\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cp class=\"modelo-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.modelo) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Ca" + (" class=\"enlace-producto\""+pug_attr("href", producto.enlace, true, false)) + "\u003EEnlace\u003C\u002Fa\u003E";
if (producto.marca) {
pug_html = pug_html + "\u003Cp class=\"marca-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.marca) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
else {
pug_html = pug_html + "\u003Cp class=\"marca-producto\"\u003ECustom\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"multicampo-contenedor\"\u003E";
if (producto.color) {
pug_html = pug_html + "\u003Cp class=\"color-switch\"\u003E" + (pug_escape(null == (pug_interp = producto.color) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cp class=\"precio-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.precio) ? "" : pug_interp)) + "€\u003C\u002Fp\u003E\u003Clabel class=\"like\"\u003E\u003Cinput type=\"checkbox\"\u002F\u003E\u003Cdiv class=\"hearth\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var producto = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (" class=\"grid-box\""+pug_attr("data-id", producto.id, true, false)) + "\u003E \u003Cdiv class=\"image-container\"\u003E\u003Cbutton class=\"delete-button\"\u003E\u003Cimg src=\"\u002FImages\u002Fdelete.png\" alt=\"Icono de borrado\"\u002F\u003E\u003C\u002Fbutton\u003E";
if (producto.image1 && !producto.image2) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-alone-producto\""+pug_attr("src", producto.image1, true, false)+" alt=\"Imagen del producto\"") + "\u002F\u003E";
}
else {
if (producto.image1) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-1-producto\""+pug_attr("src", producto.image1, true, false)+" alt=\"Imagen 1 de producto\"") + "\u002F\u003E";
if (producto.image2) {
pug_html = pug_html + "\u003Cimg" + (" class=\"imagen-2-producto\""+pug_attr("src", producto.image2, true, false)+" alt=\"Imagen 2 de producto\"") + "\u002F\u003E";
}
}
else {
pug_html = pug_html + "\u003Cimg class=\"imagen-alone-producto\" src=\"\u002FImages\u002Fdefault_no_image.png\" alt=\"No hay imagen disponible\"\u002F\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cp class=\"modelo-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.modelo) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Ca" + (" class=\"enlace-producto\""+pug_attr("href", producto.enlace, true, false)) + "\u003EEnlace\u003C\u002Fa\u003E";
if (producto.marca) {
pug_html = pug_html + "\u003Cp class=\"marca-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.marca) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
else {
pug_html = pug_html + "\u003Cp class=\"marca-producto\"\u003ECustom\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"multicampo-contenedor\"\u003E";
if (producto.color) {
pug_html = pug_html + "\u003Cp class=\"color-switch\"\u003E" + (pug_escape(null == (pug_interp = producto.color) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cp class=\"precio-producto\"\u003E" + (pug_escape(null == (pug_interp = producto.precio) ? "" : pug_interp)) + "€\u003C\u002Fp\u003E\u003Clabel class=\"like\"\u003E\u003Cinput type=\"checkbox\"\u002F\u003E\u003Cdiv class=\"hearth\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Farticle\u003E";}.call(this,"marcas" in locals_for_with?locals_for_with.marcas:typeof marcas!=="undefined"?marcas:undefined,"productos" in locals_for_with?locals_for_with.productos:typeof productos!=="undefined"?productos:undefined));;return pug_html;}