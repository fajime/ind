// DEMO META DATA
export default {
  titleName            : 'Tooltip',
  nameJS               : '',
  type                 : 'atom',
  nameScssMixin        : '',
  nameScssDefaultClass : '',
  nameScssMixinFile    : '',
  description          : `<p>Los tooltips son pequeñas cajas de texto a modo de popup que pueden dar información adicional sobre cualquier elemento html sobre el que se añadan, como descripción o funcionalidad que el elemento lleva asociada.</p>
                            <p>El tooltip NO es un componente vue, está implementado como una directiva, siendo necesario utilizarlo como tal. Las propiedades descritas más abajo <span style="font-weight:bold">NO son</span> directas al tooltip, sino tan solo al componente de pruebas del playground para poder visualizar su comportamiento.</p>
                            <p>Los dos atributos que representan, texto y posición, se deberán añadir a la directiva como <span style="font-style:italic">value</span> y <span style="font-style:italic">arg</span> respectivamente.</p>
                            <p>Ver las notas, más abajo, para ejemplos.</p>`,
  notes : `<p>A continuación se muestra un ejemplo de uso de la directiva tooltip sobre un componente de tipo botón:</p>
    <div class="dl-comp-kit-demo-use__subtitle">Component javascript</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="javascript">
              // Importamos la directiva en el componente en que vamos a usarla (existe posibilidad de declararla a nivel global)
              import dlUiTooltip from '@sigle/dl-fmwk-vue-comp-kit/src/directives/dl-ui-tooltip';       
              export default {
                name       : 'dl-ui-compo',
                directives : { dlUiTooltip },
                props      : {
                  ...
            </code>
        </pre>
    </div>
    <div class="dl-comp-kit-demo-use__subtitle">Component html</div>
    <div class="dl-comp-kit-demo-use__code">
        <pre>
            <code class="html">
              // Declarada en la parte js, podemos usarla en la parte html
              < my-button v-dluitooltip:position="text">
                < my-icon id="dl-ids-icon-user-single-outlined">< /my-icon>
              < /my-button>
            </code>
        </pre>
    </div>
    <p>En este ejemplo, se deberá sustituir 'position' por una de las opciones (top, bottom, left, right) y 'text' por el texto que se desee añadir en el tooltip.</p>`
};
