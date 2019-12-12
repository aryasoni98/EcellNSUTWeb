!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(s){"use strict";var u,d=s(window);function f(e){return"%"==e[e.length-1]}function t(e,t){function r(e,t){var r=u.createShader(e);if(u.shaderSource(r,t),u.compileShader(r),!u.getShaderParameter(r,u.COMPILE_STATUS))throw new Error("compile error: "+u.getShaderInfoLog(r));return r}var i={};if(i.id=u.createProgram(),u.attachShader(i.id,r(u.VERTEX_SHADER,e)),u.attachShader(i.id,r(u.FRAGMENT_SHADER,t)),u.linkProgram(i.id),!u.getProgramParameter(i.id,u.LINK_STATUS))throw new Error("link error: "+u.getProgramInfoLog(i.id));i.uniforms={},i.locations={},u.useProgram(i.id),u.enableVertexAttribArray(0);for(var o,n,a=/uniform (\w+) (\w+)/g,s=e+t;null!=(o=a.exec(s));)n=o[2],i.locations[n]=u.getUniformLocation(i.id,n);return i}function h(e,t){u.activeTexture(u.TEXTURE0+(t||0)),u.bindTexture(u.TEXTURE_2D,e)}function o(e){var t=/url\(["']?([^"']*)["']?\)/.exec(e);return null==t?null:t[1]}var c=function(){var e=document.createElement("canvas");if(!(u=e.getContext("webgl")||e.getContext("experimental-webgl")))return null;var a={};if(["OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear"].forEach(function(e){var t=u.getExtension(e);t&&(a[e]=t)}),!a.OES_texture_float)return null;var t=[];function r(e,t){var r="OES_texture_"+e,i=r+"_linear",o=i in a,n=[r];return o&&n.push(i),{type:t,linearSupport:o,extensions:n}}t.push(r("float",u.FLOAT)),a.OES_texture_half_float&&t.push(r("half_float",a.OES_texture_half_float.HALF_FLOAT_OES));var i=u.createTexture(),o=u.createFramebuffer();u.bindFramebuffer(u.FRAMEBUFFER,o),u.bindTexture(u.TEXTURE_2D,i),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE);for(var n=null,s=0;s<t.length;s++)if(u.texImage2D(u.TEXTURE_2D,0,u.RGBA,32,32,0,u.RGBA,t[s].type,null),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,i,0),u.checkFramebufferStatus(u.FRAMEBUFFER)===u.FRAMEBUFFER_COMPLETE){n=t[s];break}return n}(),e=function(t,r){try{return new ImageData(t,r)}catch(e){return document.createElement("canvas").getContext("2d").createImageData(t,r)}}(32,32);s("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>");function n(e,t){var r=this;this.$el=s(e),this.interactive=t.interactive,this.resolution=t.resolution,this.textureDelta=new Float32Array([1/this.resolution,1/this.resolution]),this.perturbance=t.perturbance,this.dropRadius=t.dropRadius,this.crossOrigin=t.crossOrigin,this.imageUrl=t.imageUrl;var i=document.createElement("canvas");i.width=this.$el.innerWidth(),i.height=this.$el.innerHeight(),this.canvas=i,this.$canvas=s(i),this.$canvas.css({position:"absolute",left:0,top:0,right:0,bottom:0,zIndex:-1}),this.$el.addClass("jquery-ripples").append(i),this.context=u=i.getContext("webgl")||i.getContext("experimental-webgl"),c.extensions.forEach(function(e){u.getExtension(e)}),s(window).on("resize",function(){var e=r.$el.innerWidth(),t=r.$el.innerHeight();e==r.canvas.width&&t==r.canvas.height||(i.width=e,i.height=t)}),this.textures=[],this.framebuffers=[],this.bufferWriteIndex=0,this.bufferReadIndex=1;for(var o=0;o<2;o++){var n=u.createTexture(),a=u.createFramebuffer();u.bindFramebuffer(u.FRAMEBUFFER,a),a.width=this.resolution,a.height=this.resolution,u.bindTexture(u.TEXTURE_2D,n),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,c.linearSupport?u.LINEAR:u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,c.linearSupport?u.LINEAR:u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,this.resolution,this.resolution,0,u.RGBA,c.type,null),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,n,0),this.textures.push(n),this.framebuffers.push(a)}this.quad=u.createBuffer(),u.bindBuffer(u.ARRAY_BUFFER,this.quad),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),u.STATIC_DRAW),this.initShaders(),this.initTexture(),this.setTransparentTexture(),this.loadImage(),u.clearColor(0,0,0,0),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),this.visible=!0,this.running=!0,this.inited=!0,this.setupPointerEvents(),requestAnimationFrame(function e(){r.step(),requestAnimationFrame(e)})}n.DEFAULTS={imageUrl:null,resolution:256,dropRadius:20,perturbance:.03,interactive:!0,crossOrigin:""},n.prototype={setupPointerEvents:function(){var r=this;function i(e,t){r.visible&&r.running&&r.interactive&&r.dropAtPointer(e,r.dropRadius*(t?1.5:1),t?.14:.01)}this.$el.on("mousemove.ripples",function(e){i(e)}).on("touchmove.ripples, touchstart.ripples",function(e){for(var t=e.originalEvent.changedTouches,r=0;r<t.length;r++)i(t[r])}).on("mousedown.ripples",function(e){i(e,!0)})},loadImage:function(){var r=this;u=this.context;var e=this.imageUrl||o(this.originalCssBackgroundImage)||o(this.$el.css("backgroundImage"));if(e!=this.imageSource)if(this.imageSource=e,this.imageSource){var i=new Image;i.onload=function(){function e(e){return 0==(e&e-1)}u=r.context;var t=e(i.width)&&e(i.height)?u.REPEAT:u.CLAMP_TO_EDGE;u.bindTexture(u.TEXTURE_2D,r.backgroundTexture),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,t),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,t),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,i),r.backgroundWidth=i.width,r.backgroundHeight=i.height,r.hideCssBackground()},i.onerror=function(){u=r.context,r.setTransparentTexture()},i.crossOrigin=this.imageSource.match(/^data:/)?null:this.crossOrigin,i.src=this.imageSource}else this.setTransparentTexture()},step:function(){u=this.context,this.visible&&(this.computeTextureBoundaries(),this.running&&this.update(),this.render())},drawQuad:function(){u.bindBuffer(u.ARRAY_BUFFER,this.quad),u.vertexAttribPointer(0,2,u.FLOAT,!1,0,0),u.drawArrays(u.TRIANGLE_FAN,0,4)},render:function(){u.bindFramebuffer(u.FRAMEBUFFER,null),u.viewport(0,0,this.canvas.width,this.canvas.height),u.enable(u.BLEND),u.clear(u.COLOR_BUFFER_BIT|u.DEPTH_BUFFER_BIT),u.useProgram(this.renderProgram.id),h(this.backgroundTexture,0),h(this.textures[0],1),u.uniform1f(this.renderProgram.locations.perturbance,this.perturbance),u.uniform2fv(this.renderProgram.locations.topLeft,this.renderProgram.uniforms.topLeft),u.uniform2fv(this.renderProgram.locations.bottomRight,this.renderProgram.uniforms.bottomRight),u.uniform2fv(this.renderProgram.locations.containerRatio,this.renderProgram.uniforms.containerRatio),u.uniform1i(this.renderProgram.locations.samplerBackground,0),u.uniform1i(this.renderProgram.locations.samplerRipples,1),this.drawQuad(),u.disable(u.BLEND)},update:function(){u.viewport(0,0,this.resolution,this.resolution),u.bindFramebuffer(u.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),h(this.textures[this.bufferReadIndex]),u.useProgram(this.updateProgram.id),this.drawQuad(),this.swapBufferIndices()},swapBufferIndices:function(){this.bufferWriteIndex=1-this.bufferWriteIndex,this.bufferReadIndex=1-this.bufferReadIndex},computeTextureBoundaries:function(){var e,t=this.$el.css("background-size"),r=this.$el.css("background-attachment"),i=function(t){var e=t.split(" ");if(1!==e.length)return e.map(function(e){switch(t){case"center":return"50%";case"top":case"left":return"0";case"right":case"bottom":return"100%";default:return e}});switch(t){case"center":return["50%","50%"];case"top":return["50%","0"];case"bottom":return["50%","100%"];case"left":return["0","50%"];case"right":return["100%","50%"];default:return[t,"50%"]}}(this.$el.css("background-position"));if("fixed"==r?((e={left:window.pageXOffset,top:window.pageYOffset}).width=d.width(),e.height=d.height()):((e=this.$el.offset()).width=this.$el.innerWidth(),e.height=this.$el.innerHeight()),"cover"==t)var o=Math.max(e.width/this.backgroundWidth,e.height/this.backgroundHeight),n=this.backgroundWidth*o,a=this.backgroundHeight*o;else if("contain"==t)o=Math.min(e.width/this.backgroundWidth,e.height/this.backgroundHeight),n=this.backgroundWidth*o,a=this.backgroundHeight*o;else{n=(t=t.split(" "))[0]||"",a=t[1]||n;f(n)?n=e.width*parseFloat(n)/100:"auto"!=n&&(n=parseFloat(n)),f(a)?a=e.height*parseFloat(a)/100:"auto"!=a&&(a=parseFloat(a)),"auto"==n&&"auto"==a?(n=this.backgroundWidth,a=this.backgroundHeight):("auto"==n&&(n=this.backgroundWidth*(a/this.backgroundHeight)),"auto"==a&&(a=this.backgroundHeight*(n/this.backgroundWidth)))}var s=i[0],u=i[1];s=f(s)?e.left+(e.width-n)*parseFloat(s)/100:e.left+parseFloat(s),u=f(u)?e.top+(e.height-a)*parseFloat(u)/100:e.top+parseFloat(u);var h=this.$el.offset();this.renderProgram.uniforms.topLeft=new Float32Array([(h.left-s)/n,(h.top-u)/a]),this.renderProgram.uniforms.bottomRight=new Float32Array([this.renderProgram.uniforms.topLeft[0]+this.$el.innerWidth()/n,this.renderProgram.uniforms.topLeft[1]+this.$el.innerHeight()/a]);var c=Math.max(this.canvas.width,this.canvas.height);this.renderProgram.uniforms.containerRatio=new Float32Array([this.canvas.width/c,this.canvas.height/c])},initShaders:function(){var e=["attribute vec2 vertex;","varying vec2 coord;","void main() {","coord = vertex * 0.5 + 0.5;","gl_Position = vec4(vertex, 0.0, 1.0);","}"].join("\n");this.dropProgram=t(e,["precision highp float;","const float PI = 3.141592653589793;","uniform sampler2D texture;","uniform vec2 center;","uniform float radius;","uniform float strength;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);","drop = 0.5 - cos(drop * PI) * 0.5;","info.r += drop * strength;","gl_FragColor = info;","}"].join("\n")),this.updateProgram=t(e,["precision highp float;","uniform sampler2D texture;","uniform vec2 delta;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","vec2 dx = vec2(delta.x, 0.0);","vec2 dy = vec2(0.0, delta.y);","float average = (","texture2D(texture, coord - dx).r +","texture2D(texture, coord - dy).r +","texture2D(texture, coord + dx).r +","texture2D(texture, coord + dy).r",") * 0.25;","info.g += (average - info.r) * 2.0;","info.g *= 0.995;","info.r += info.g;","gl_FragColor = info;","}"].join("\n")),u.uniform2fv(this.updateProgram.locations.delta,this.textureDelta),this.renderProgram=t(["precision highp float;","attribute vec2 vertex;","uniform vec2 topLeft;","uniform vec2 bottomRight;","uniform vec2 containerRatio;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);","backgroundCoord.y = 1.0 - backgroundCoord.y;","ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;","gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);","}"].join("\n"),["precision highp float;","uniform sampler2D samplerBackground;","uniform sampler2D samplerRipples;","uniform vec2 delta;","uniform float perturbance;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","float height = texture2D(samplerRipples, ripplesCoord).r;","float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;","float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;","vec3 dx = vec3(delta.x, heightX - height, 0.0);","vec3 dy = vec3(0.0, heightY - height, delta.y);","vec2 offset = -normalize(cross(dy, dx)).xz;","float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);","gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;","}"].join("\n")),u.uniform2fv(this.renderProgram.locations.delta,this.textureDelta)},initTexture:function(){this.backgroundTexture=u.createTexture(),u.bindTexture(u.TEXTURE_2D,this.backgroundTexture),u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL,1),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR)},setTransparentTexture:function(){u.bindTexture(u.TEXTURE_2D,this.backgroundTexture),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,e)},hideCssBackground:function(){var e=this.$el[0].style.backgroundImage;"none"!=e&&(this.originalInlineCss=e,this.originalCssBackgroundImage=this.$el.css("backgroundImage"),this.$el.css("backgroundImage","none"))},restoreCssBackground:function(){this.$el.css("backgroundImage",this.originalInlineCss||"")},dropAtPointer:function(e,t,r){var i=parseInt(this.$el.css("border-left-width"))||0,o=parseInt(this.$el.css("border-top-width"))||0;this.drop(e.pageX-this.$el.offset().left-i,e.pageY-this.$el.offset().top-o,t,r)},drop:function(e,t,r,i){u=this.context;var o=this.$el.innerWidth(),n=this.$el.innerHeight(),a=Math.max(o,n);r/=a;var s=new Float32Array([(2*e-o)/a,(n-2*t)/a]);u.viewport(0,0,this.resolution,this.resolution),u.bindFramebuffer(u.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),h(this.textures[this.bufferReadIndex]),u.useProgram(this.dropProgram.id),u.uniform2fv(this.dropProgram.locations.center,s),u.uniform1f(this.dropProgram.locations.radius,r),u.uniform1f(this.dropProgram.locations.strength,i),this.drawQuad(),this.swapBufferIndices()},destroy:function(){this.$el.off(".ripples").removeClass("jquery-ripples").removeData("ripples"),this.$canvas.remove(),this.restoreCssBackground()},show:function(){this.visible=!0,this.$canvas.show(),this.hideCssBackground()},hide:function(){this.visible=!1,this.$canvas.hide(),this.restoreCssBackground()},pause:function(){this.running=!1},play:function(){this.running=!0},set:function(e,t){switch(e){case"dropRadius":case"perturbance":case"interactive":case"crossOrigin":this[e]=t;break;case"imageUrl":this.imageUrl=t,this.loadImage()}}};var r=s.fn.ripples;s.fn.ripples=function(i){if(!c)throw new Error("Your browser does not support WebGL, the OES_texture_float extension or rendering to floating point textures.");var o=1<arguments.length?Array.prototype.slice.call(arguments,1):void 0;return this.each(function(){var e=s(this),t=e.data("ripples"),r=s.extend({},n.DEFAULTS,e.data(),"object"==typeof i&&i);!t&&"string"==typeof i||(t?"string"==typeof i&&n.prototype[i].apply(t,o):e.data("ripples",t=new n(this,r)))})},s.fn.ripples.Constructor=n,s.fn.ripples.noConflict=function(){return s.fn.ripples=r,this}});
