// DEMO META DATA
export default {
  // DEMO META DATA
  titleName   : 'Icons Set',
  nameJS      : 'DlUiIconsSet',
  type        : 'atom',
  description : `
  <p>
    Este componente es un conjunto de SVG agrupados en un sprite, utilizando una técnica de generación de símbolos dentro de un <span class="demo__md--italic">sprite</span>
    de SVG (<a href="https://css-tricks.com/svg-sprites-use-better-icon-fonts/" target="_blank">link</a>). Se emplea como conjunto base de iconos de cualquier aplicación.
  </p>   
  <p>
  Este componente una vez cargado (cosa que hay que hacer una vez y cuanto antes, en la vista principal) no se visualiza en la página ya que está oculto en el DOM y su finalidad es la de contener las definiciones de los SVG para que puedan
  ser consumidas por el componente <span class="demo__md--syntax">dl-ui-icon</span>.</p>

  <p>Si se desea añadir más iconos a una aplicación existen dos opciones:
    <ol>
      <li>
        <span class="demo__md--bold">Agregar icono al set general de este componente:</span> En caso de que el icono sea genérico y vaya a ser posiblemente reutilizado por otras apps.
      </li>
      <li>
        <span class="demo__md--bold">Generar un nuevo componente:</span> Crear un nuevo componente similar a este, pero con otro nombre, en cuyo 
        <span class="demo__md--italic">template</span> esten definidos todos los iconos SVG que se quieran utilizar del mismo modo que están declarados en
       <span class="demo__md--syntax">dl-ui-icons-set</span>. Es una forma de <span class="demo__md--italic">extender"</span> los iconos del kit.
      </li>
    </ol>
  </p>
  <p>
    Para generar el sprite es necesario normalizar los SVG comprobando que no existen márgenes ni desplazamientos internos y estableciendo el atributo 
    <span class="demo__md--syntax">viewbox</span> con la siguiente plantilla <span class="demo__md--syntax">0 0 X Y</span>, donde 
    <span class="demo__md--syntax">X</span> e <span class="demo__md--syntax">Y</span> son valores propios de cada icono.
  </p>`,
  // Could we deduce/extract the slots from the html code?
  slots  : [],
  // Could we deduce/extract the events from the component code?
  events : [],
  scss   : [],
  notes  : `
  <div class="dl-comp-kit-demo-use__subtitle">Ejemplo de componente de aplicacion custom icons en la aplicacion.</div>
  <div class="dl-comp-kit-demo-use__code">
    <pre>
      <code class="javascript">
      import DlUiIconsSet from '@/components/atoms/dl-ui-icons-set';
      export default {
        name       : 'dl-comp-kit-icons-set',
        components : {
          'dl-ui-icons-set' : DlUiIconsSet
        }
      };        
      </code>
    </pre>
  </div>
  <div class="dl-comp-kit-demo-use__subtitle">y su template</div>
  <div class="dl-comp-kit-demo-use__code">
    <pre>
      <code class="html">
      &lt;div>
        &lt;dl-ui-icons-set />
        &lt;svg class="app-icons-set" id="custom-icons-set">
        &lt;defs>
          &lt;symbol id="icomoon-bitbucket" viewBox="0 0 22 28">
          &lt;path
            d="M12.734 ... 1.641z"
          />
          &lt;/symbol>
          ...
        &lt;/defs>
        &lt;/svg>
      &lt;/div>      
      </code>
    </pre>
  </div>  
  `
};
