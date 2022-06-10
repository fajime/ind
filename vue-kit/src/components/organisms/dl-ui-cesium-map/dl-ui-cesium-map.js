/* eslint-disable max-lines */
/* istanbul ignore file */
const Cesium = require('cesium/Source/Cesium');
import layerTool from './dl-ui-cesium-map__layer-tool';
import drawTool from './dl-ui-cesium-map__draw-tool';
import popupTool from './dl-ui-cesium-map__popup-tool';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-cesium-map',
  components : {
    layerTool,
    drawTool,
    popupTool
  },
  emits : ['ready', 'update:camera'],
  // eslint-disable-next-line require-jsdoc
  data() {
    return {
      viewer : {}
    };
  },
  props : {
    /**
     * lang props
     */
    lang : {
      type    : Object,
      default : () => ({}),
      desc    : 'An object with lang translations for different Tools. Example: "drawTool: { ...labels:values... }" to overwrite drawTool defaults.'
    },
    /**
     * Animation widget
     */
    animation : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the Animation widget will not be created.'
    },
    /**
     * BaseLayerPicker widget
     */
    baseLayerPicker : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the BaseLayerPicker widget will not be created.'
    },
    /**
     * FullscreenButton widget
     */
    fullscreenButton : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the FullscreenButton widget will not be created.'
    },
    /**
     * VRButton widget
     */
    vrButton : {
      type    : Boolean,
      default : false,
      desc    : 'If set to true, the VRButton widget will be created.'
    },
    /**
     * Geocoder widget
     */
    geocoder : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the Geocoder widget will not be created.'
    },
    /**
     * HomeButton widget
     */
    homeButton : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the HomeButton widget will not be created.'
    },
    /**
     * InfoBox widget
     */
    infoBox : {
      type    : Boolean,
      default : true,
      desc    : 'If set to false, the InfoBox widget will not be created.'
    },
    /**
     * SceneModePicker widget
     */
    sceneModePicker : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the SceneModePicker widget will not be created.'
    },
    /**
     * SelectionIndicator widget
     */
    selectionIndicator : {
      type    : Boolean,
      default : true,
      desc    : 'If set to false, the SelectionIndicator widget will not be created.'
    },
    /**
     * Timeline widget
     */
    timeline : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the Timeline widget will not be created.'
    },
    /**
     * navigation help button
     */
    navigationHelpButton : {
      type    : Boolean,
      default : false,
      desc    : 'If set to false, the navigation help button will not be created.'
    },
    /**
     * navigation instructions initially visible
     */

    navigationInstructionsInitiallyVisible : {
      type    : Boolean,
      default : false,
      desc    : 'True if the navigation instructions should initially be visible, or false if the should not be shown until the user explicitly clicks the button.'
    },
    /**
     * each geometry instance rendered in 3D
     */
    scene3DOnly : {
      type    : Boolean,
      default : false,
      desc    : 'Each geometry instance rendered in 3D'
    },
    /**
     * clock should attempt to advance simulation time
     */
    shouldAnimate : {
      type    : Boolean,
      default : true,
      desc    : 'Clock should attempt to advance simulation time'
    },
    /**
     * clock view model to use to control current time
     */
    clockViewModel : {
      type    : Object,
      default : () => ({}),
      desc    : 'Clock view model to use to control current time'
    },
    /**
     * view model for the current base imagery layer
     */
    selectedImageryProviderViewModel : {
      type    : Object,
      default : () => ({}),
      desc    : 'View model for the current base imagery layer'
    },
    /**
     * array of ProviderViewModels to be selectable from the BaseLayerPicker
     */
    imageryProviderViewModels : {
      type    : Object,
      default : () => ({}),
      desc    : 'array of ProviderViewModels to be selectable from the BaseLayerPicker'
    },
    /**
     * view model for the current base terrain layer
     */
    selectedTerrainProviderViewModel : {
      type    : Object,
      default : () => ({}),
      desc    : 'view model for the current base terrain layer'
    },
    /**
     * array of ProviderViewModels to be selectable from the BaseLayerPicker
     */
    terrainProviderViewModels : {
      type    : Object,
      default : () => ({}),
      desc    : 'array of ProviderViewModels to be selectable from the BaseLayerPicker'
    },
    /**
     * imagery Provider
     */
    imageryProvider : {
      type    : Object,
      default : () => ({}),
      desc    : 'imagery Provider'
    },
    /**
     * terrain Provider
     */
    terrainProvider : {
      type    : Object,
      default : () => ({}),
      desc    : 'terrain Provider'
    },
    /**
     * element or id to be placed into fullscreen mode
     */
    fullscreenElement : {
      type    : Element,
      default : () => {},
      desc    : 'element or id to be placed into fullscreen mode'
    },
    /**
     * this widget should control the render loop
     */
    useDefaultRenderLoop : {
      type    : Boolean,
      default : true,
      desc    : 'this widget should control the render loop'
    },
    /**
     * target frame rate when using the default render loop
     */
    targetFrameRate : {
      type    : Number,
      default : null,
      desc    : 'target frame rate when using the default render loop'
    },
    /**
     * display an HTML panel to the user containing the error
     */
    showRenderLoopErrors : {
      type    : Boolean,
      default : true,
      desc    : 'display an HTML panel to the user containing the error'
    },
    /**
     * track the clock settings of newly added DataSources
     */
    automaticallyTrackDataSourceClocks : {
      type    : Boolean,
      default : true,
      desc    : 'track the clock settings of newly added DataSources'
    },
    /**
     * Context and WebGL creation properties corresponding to options passed to Scene
     */
    contextOptions : {
      type    : Object,
      default : () => ({}),
      desc    : 'Context and WebGL creation properties corresponding to options passed to Scene'
    },
    /**
     * initial scene mode (2d, 2.5d, 3d)
     */
    sceneMode : {
      type    : Number,
      default : 3,
      desc    : 'initial scene mode (2d, 2.5d, 3d)'
    },
    /**
     * map projection to use in 2D and Columbus View modes.
     */
    mapProjection : {
      type    : Object,
      default : () => ({}),
      desc    : 'map projection to use in 2D and Columbus View modes.'
    },
    /**
     * globe to use in the scene
     */
    globe : {
      type    : Object,
      default : () => ({}),
      desc    : 'globe to use in the scene'
    },
    /**
     * use order independent translucency
     */
    orderIndependentTranslucency : {
      type    : Boolean,
      default : true,
      desc    : 'use order independent translucency'
    },
    /**
     * DOM element or ID that will contain the CreditDisplay
     */
    creditContainer : {
      type    : String,
      default : null,
      desc    : 'DOM element or ID that will contain the CreditDisplay'
    },
    /**
     * DOM element or ID that will contain the credit pop up created by the CreditDisplay
     */
    creditViewport : {
      type    : String,
      default : null,
      desc    : 'DOM element or ID that will contain the credit pop up created by the CreditDisplay'
    },
    /**
     * collection of data sources visualized by the widget
     */
    dataSources : {
      type    : Object,
      default : () => ({}),
      desc    : 'collection of data sources visualized by the widget'
    },
    /**
     * scalar used to exaggerate the terrain
     */
    terrainExaggeration : {
      type    : Number,
      default : 1.0,
      desc    : 'scalar used to exaggerate the terrain'
    },
    /**
     * Determines if shadows are cast by light sources
     */
    shadows : {
      type    : Boolean,
      default : false,
      desc    : 'Determines if shadows are cast by light sources'
    },
    /**
     * Determines if the terrain casts or receives shadows from light sources
     */
    terrainShadows : {
      type    : Number,
      default : 3,
      desc    : 'Determines if the terrain casts or receives shadows from light sources'
    },
    /**
     * Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction
     */
    mapMode2D : {
      type    : Number,
      default : 1,
      desc    : 'Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction'
    },
    /**
     * ProjectionPicker widget
     */
    projectionPicker : {
      type    : Boolean,
      default : false,
      desc    : 'ProjectionPicker widget'
    },
    /**
     * rendering a frame will only occur when needed as determined by changes within the scene
     */
    requestRenderMode : {
      type    : Boolean,
      default : true,
      desc    : 'rendering a frame will only occur when needed as determined by changes within the scene'
    },
    /**
     * maximum change in simulation time allowed before a render is requested
     */
    maximumRenderTimeChange : {
      type    : Number,
      default : 0.0,
      desc    : 'maximum change in simulation time allowed before a render is requested'
    },
    /**
     * display credits on the viewer
     */
    credits : {
      type    : Boolean,
      default : true,
      desc    : 'display credits on the viewer'
    },
    /**
     * display default logo on the viewer
     */
    logo : {
      type    : Boolean,
      default : false,
      desc    : 'display default logo on the viewer'
    },
    /**
     * set accessToken of Cesium ion
     */
    accessToken : {
      type    : String,
      default :
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NmVjOGQxOS05Y2I1LTRmZTktODc5My02M2U3ZmM2OTI4MmQiLCJpZCI6MjgwMjAsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1OTA1MTYzMTl9.J22LELApdPe0TgtkBH1CXKm-rOcO5c6Nr8BFx4wjUb0',
      desc : 'set accessToken of Cesium ion'
    },
    /**
     * Scene camera position. Default positioning to Madrid
     */
    camera : {
      type    : Object,
      default : () => ({
        position : {
          lng    : -3.70379,
          lat    : 40.416775,
          height : 10059568.497290563
        },
        heading : 360,
        pitch   : -90,
        roll    : 0
      }),
      desc : 'Scene camera position. Default positioning to Madrid'
    },
    /**
     * Time zone code
     */
    tzCode : {
      type    : String,
      default :
        new Date().getTimezoneOffset() === 0
          ? 'UTC'
          : `${'UTC+'}${-(new Date().getTimezoneOffset() / 60)}`,
      desc : 'Time zone code'
    },
    /**
     * The time difference (minutes) of UTC time.
     */
    utcOffset : {
      type    : Number,
      default : -new Date().getTimezoneOffset(),
      desc    : 'The time difference (minutes) of UTC time.'
    },
    /**
     * Wether to show the custom drawing widget or not.
     */
    drawTool : {
      type    : Boolean,
      default : false,
      desc    : 'If the drawing widget should be displayed.'
    },
    /**
     * Wether to show the layer tool widget or not.
     */
    layerTool : {
      type    : Boolean,
      default : false,
      desc    : 'If the layer tool widget should be displayed.'
    },
    /**
     * List of layers to display in layer control tool
     */
    layers : {
      type    : Array,
      default : () => [],
      desc    : `List of layers to display in layer control tool. Tool displays if (length > 0 && layerTool == true). Layers fields are 'name', 'imageryProvider' (required Cesium objectt), 'alpha' and 'show'`
    },
    /**
     * Popup config
     */
    popupConfig : {
      type    : Object,
      default : () => ({
        visible : false,
        x       : 0,
        y       : 0
      }),
      desc : 'Basic config for a popup display, if desired (visibility and coordinates)'
    }
  },
  watch : {
    /**
     * Watcher
     * @override
     */
    animation(val) {
      const { viewer, viewerContainer } = this;
      if (
        Cesium.defined(viewer.animation) &&
        !viewer.animation.isDestroyed() &&
        !val
      ) {
        const animationContainer = viewer.animation.container;
        viewerContainer.removeChild(animationContainer);
        viewer.animation.destroy();
        viewer._animation = undefined;
      }
      else if (
        !Cesium.defined(viewer.animation) ||
        viewer.animation.isDestroyed()
      ) {
        const animationContainer = document.createElement('div');
        animationContainer.className = 'cesium-viewer-animationContainer';
        this.viewerContainer.appendChild(animationContainer);
        const animation = new Cesium.Animation(
          animationContainer,
          new Cesium.AnimationViewModel(viewer.clockViewModel)
        );
        animation.viewModel.dateFormatter = this.localeDateTimeFormatter;
        animation.viewModel.timeFormatter = this.localeTimeFormatter;
        viewer._animation = animation;
      }
      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    baseLayerPicker(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.baseLayerPicker) &&
        !viewer.baseLayerPicker.isDestroyed() &&
        !val
      ) {
        viewer.baseLayerPicker.destroy();
        viewer._baseLayerPicker = undefined;
        // viewer.imageryLayers.remove(viewer.imageryLayers.get(viewer.imageryLayers.length - 1)); Remove also imagery?
      }
      else if (
        !Cesium.defined(viewer.baseLayerPicker) ||
        viewer.baseLayerPicker.isDestroyed()
      ) {
        const createBaseLayerPicker =
          (!Cesium.defined(viewer.globe) || this.globe !== false) &&
          (!Cesium.defined(viewer.baseLayerPicker) ||
            this.baseLayerPicker !== false);

        if (createBaseLayerPicker && Cesium.defined(this.imageryProvider)) {
          throw new Cesium.DeveloperError(`options.imageryProvider is not available when using the BaseLayerPicker widget.
Either specify options.selectedImageryProviderViewModel instead or set options.baseLayerPicker to false.`);
        }
        if (
          !createBaseLayerPicker &&
          Cesium.defined(this.selectedImageryProviderViewModel)
        ) {
          throw new Cesium.DeveloperError(`options.selectedImageryProviderViewModel is not available when not using the BaseLayerPicker widget.
Either specify options.imageryProvider instead or set options.baseLayerPicker to true.`);
        }
        if (createBaseLayerPicker && Cesium.defined(this.terrainProvider)) {
          throw new Cesium.DeveloperError(`options.terrainProvider is not available when using the BaseLayerPicker widget.
Either specify options.selectedTerrainProviderViewModel instead or set options.baseLayerPicker to false.`);
        }
        if (
          !createBaseLayerPicker &&
          Cesium.defined(this.selectedTerrainProviderViewModel)
        ) {
          throw new Cesium.DeveloperError(`options.selectedTerrainProviderViewModel is not available when not using the BaseLayerPicker widget.
Either specify options.terrainProvider instead or set options.baseLayerPicker to true.`);
        }
        if (createBaseLayerPicker) {
          const imageryProviderViewModels = Cesium.defaultValue(
            this.imageryProviderViewModels,
            Cesium.createDefaultImageryProviderViewModels()
          );
          const terrainProviderViewModels = Cesium.defaultValue(
            this.terrainProviderViewModels,
            Cesium.createDefaultTerrainProviderViewModels()
          );
          const baseLayerPicker = new Cesium.BaseLayerPicker(toolbar, {
            globe                            : viewer.scene.globe,
            imageryProviderViewModels,
            selectedImageryProviderViewModel : imageryProviderViewModels[0],
            terrainProviderViewModels,
            selectedTerrainProviderViewModel : terrainProviderViewModels[0]
          });
          const elements = toolbar.getElementsByClassName(
            'cesium-baseLayerPicker-dropDown'
          );

          const baseLayerPickerDropDown = elements[0];
          viewer._baseLayerPickerDropDown = baseLayerPickerDropDown;
          viewer._baseLayerPicker = baseLayerPicker;
          viewer.imageryLayers.raiseToTop(viewer.imageryLayers.get(0));
          resizeToolbar(toolbar, baseLayerPicker);
        }
      }
      viewer.widgetResized.raiseEvent();
    },
    camera : {
      /**
       * Watcher
       * @override
       */
      handler(val) {
        const { viewer } = this;
        viewer.camera.setView({
          destination : Cesium.Cartesian3.fromDegrees(
            val.position.lng,
            val.position.lat,
            val.position.height
          ),
          orientation : {
            heading : Cesium.Math.toRadians(val.heading || 360),
            pitch   : Cesium.Math.toRadians(val.pitch || -90),
            roll    : Cesium.Math.toRadians(val.roll || 0)
          }
        });
      },
      deep : true
    },
    /**
     * Watcher
     * @override
     */
    fullscreenButton(val) {
      const { viewer, viewerContainer } = this;
      if (
        Cesium.defined(viewer.fullscreenButton) &&
        !viewer.fullscreenButton.isDestroyed() &&
        !val
      ) {
        const fullscreenContainer = viewer.fullscreenButton.container;
        viewerContainer.removeChild(fullscreenContainer);
        viewer.fullscreenButton.destroy();
        viewer._fullscreenButton = undefined;
      }
      else if (
        !Cesium.defined(viewer.fullscreenButton) ||
        viewer.fullscreenButton.isDestroyed()
      ) {
        const fullscreenContainer = document.createElement('div');
        fullscreenContainer.className = 'cesium-viewer-fullscreenContainer';
        viewerContainer.appendChild(fullscreenContainer);
        const fullscreenButton = new Cesium.FullscreenButton(
          fullscreenContainer,
          this.$refs.viewer
        );
        viewer._fullscreenButton = fullscreenButton;
      }
      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    fullscreenElement(val) {
      const { viewer } = this;
      if (!Cesium.defined(viewer.fullscreenButton)) {
        return;
      }
      if (Cesium.defined(val)) {
        this.viewer.fullscreenButton.viewModel.fullscreenElement = val;
      }
    },
    /**
     * Watcher
     * @override
     */
    geocoder(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.geocoder) &&
        !viewer.geocoder.isDestroyed() &&
        !val
      ) {
        const geocoderContainer = viewer.geocoder.container;
        toolbar.removeChild(geocoderContainer);
        viewer.geocoder.destroy();
        viewer._geocoder = undefined;
      }
      else if (
        !Cesium.defined(viewer.geocoder) ||
        viewer.geocoder.isDestroyed()
      ) {
        const geocoderContainer = document.createElement('div');
        geocoderContainer.className = 'cesium-viewer-geocoderContainer';
        toolbar.appendChild(geocoderContainer);
        const geocoder = new Cesium.Geocoder({
          container        : geocoderContainer,
          geocoderServices : Cesium.defined(this.geocoder)
            ? Array.isArray(this.geocoder)
              ? this.geocoder
              : [this.geocoder]
            : undefined,
          scene : viewer.scene,
          viewer
        });
        viewer._eventHelper.add(
          geocoder.viewModel.search.beforeExecute,
          viewer._clearObjects,
          viewer
        );
        viewer._geocoder = geocoder;
        resizeToolbar(toolbar, geocoderContainer);
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    homeButton(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.homeButton) &&
        !viewer.homeButton.isDestroyed() &&
        !val
      ) {
        viewer.homeButton.destroy();
        viewer._homeButton = undefined;
      }
      else if (
        !Cesium.defined(viewer.homeButton) ||
        viewer.homeButton.isDestroyed()
      ) {
        const homeButton = new Cesium.HomeButton(toolbar, viewer.scene);
        if (Cesium.defined(viewer.geocoder)) {
          viewer._eventHelper.add(
            homeButton.viewModel.command.afterExecute,
            () => {
              const viewModel = viewer.geocoder.viewModel;
              viewModel.searchText = '';
              if (viewModel.isSearchInProgress) {
                viewModel.search();
              }
            }
          );
        }
        viewer._eventHelper.add(
          homeButton.viewModel.command.beforeExecute,
          viewer._clearTrackedObject,
          viewer
        );
        viewer._homeButton = homeButton;
        resizeToolbar(toolbar, homeButton);
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    imageryProvider(val) {
      // , oldvalue
      const { viewer } = this;
      if (Cesium.defined(val)) {
        /* for (let i = 0; i < viewer.imageryLayers.length; i++) {
           if (viewer.imageryLayers._layers[i].imageryProvider === oldvalue) {
            viewer.imageryLayers.remove(viewer.imageryLayers[i]);
           }
           }
           viewer.imageryLayers.addImageryProvider(val); */
        //  Adapted for oneo: this will always replace the bottom layer
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
        const baseLayer = viewer.imageryLayers.addImageryProvider(val);
        viewer.imageryLayers.lowerToBottom(baseLayer);
      }
    },
    /**
     * Watcher
     * @override
     */
    infoBox(val) {
      const { viewer, viewerContainer } = this;
      if (
        Cesium.defined(viewer.infoBox) &&
        !viewer.infoBox.isDestroyed() &&
        !val
      ) {
        const infoBoxContainer = viewer.infoBox.container;
        viewerContainer.removeChild(infoBoxContainer);
        viewer.infoBox.destroy();
        viewer._infoBox = undefined;
      }
      else if (
        !Cesium.defined(viewer.infoBox) ||
        viewer.infoBox.isDestroyed()
      ) {
        const infoBoxContainer = document.createElement('div');
        infoBoxContainer.className = 'cesium-viewer-infoBoxContainer';
        viewerContainer.appendChild(infoBoxContainer);
        const infoBox = new Cesium.InfoBox(infoBoxContainer);
        const infoBoxViewModel = infoBox.viewModel;
        viewer._eventHelper.add(
          infoBoxViewModel.cameraClicked,
          viewer._onInfoBoxCameraClicked,
          viewer
        );
        viewer._eventHelper.add(
          infoBoxViewModel.closeClicked,
          viewer._onInfoBoxClockClicked,
          viewer
        );
        viewer._infoBox = infoBox;
      }
      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    navigationHelpButton(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.navigationHelpButton) &&
        !viewer.navigationHelpButton.isDestroyed() &&
        !val
      ) {
        viewer.navigationHelpButton.destroy();
        viewer._navigationHelpButton = undefined;
      }
      else if (
        !Cesium.defined(viewer.navigationHelpButton) ||
        viewer.navigationHelpButton.isDestroyed()
      ) {
        let showNavHelp = true;
        try {
          if (Cesium.defined(window.localStorage)) {
            const hasSeenNavHelp = window.localStorage.getItem(
              'cesium-hasSeenNavHelp'
            );
            if (Cesium.defined(hasSeenNavHelp) && Boolean(hasSeenNavHelp)) {
              showNavHelp = false;
            }
            else {
              window.localStorage.setItem('cesium-hasSeenNavHelp', 'true');
            }
          }
        }
        catch (e) {
          // console.log(e);
        }
        const navigationHelpButton = new Cesium.NavigationHelpButton({
          container                    : toolbar,
          instructionsInitiallyVisible : Cesium.defaultValue(
            this.navigationInstructionsInitiallyVisible,
            showNavHelp
          )
        });
        viewer._navigationHelpButton = navigationHelpButton;
        resizeToolbar(toolbar, navigationHelpButton);
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    projectionPicker(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.projectionPicker) &&
        !viewer.projectionPicker.isDestroyed() &&
        !val
      ) {
        viewer.projectionPicker.destroy();
        viewer._projectionPicker = undefined;
      }
      else if (
        !Cesium.defined(viewer.projectionPicker) ||
        viewer.projectionPicker.isDestroyed()
      ) {
        const projectionPicker = new Cesium.ProjectionPicker(
          toolbar,
          viewer.scene
        );
        viewer._projectionPicker = projectionPicker;
        resizeToolbar(toolbar, projectionPicker);
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    sceneMode(val) {
      const { viewer } = this;
      if (
        Cesium.SceneMode.COLUMBUS_VIEW === val ||
        Cesium.SceneMode.MORPHING === val ||
        Cesium.SceneMode.SCENE2D === val ||
        Cesium.SceneMode.SCENE3D === val
      ) {
        viewer.scene.mode = val;
      }
    },
    /**
     * Watcher
     * @override
     */
    sceneModePicker(val) {
      const { viewer, resizeToolbar } = this;
      const toolbar = viewer._toolbar;
      if (
        Cesium.defined(viewer.sceneModePicker) &&
        !viewer.sceneModePicker.isDestroyed() &&
        !val
      ) {
        viewer.sceneModePicker.destroy();
        viewer._sceneModePicker = undefined;
      }
      else if (
        !Cesium.defined(viewer.sceneModePicker) ||
        viewer.sceneModePicker.isDestroyed()
      ) {
        if (this.sceneModePicker === true && this.scene3DOnly) {
          throw new Cesium.DeveloperError(
            'options.sceneModePicker is not available when options.scene3DOnly is set to true.'
          );
        }
        if (!this.scene3DOnly && this.sceneModePicker === true) {
          const sceneModePicker = new Cesium.SceneModePicker(
            toolbar,
            viewer.scene
          );
          viewer._sceneModePicker = sceneModePicker;
          resizeToolbar(toolbar, sceneModePicker);
        }
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    selectionIndicator(val) {
      const { viewer, viewerContainer } = this;
      if (
        Cesium.defined(viewer.selectionIndicator) &&
        !viewer.selectionIndicator.isDestroyed() &&
        !val
      ) {
        const selectionIndicatorContainer = viewer.selectionIndicator.container;
        viewerContainer.removeChild(selectionIndicatorContainer);
        viewer.selectionIndicator.destroy();
        viewer._selectionIndicator = undefined;
      }
      else if (
        !Cesium.defined(viewer.selectionIndicator) ||
        viewer.selectionIndicator.isDestroyed()
      ) {
        const selectionIndicatorContainer = document.createElement('div');
        selectionIndicatorContainer.className =
          'cesium-viewer-selectionIndicatorContainer';
        viewerContainer.appendChild(selectionIndicatorContainer);
        const selectionIndicator = new Cesium.SelectionIndicator(
          selectionIndicatorContainer,
          viewer.scene
        );
        viewer._selectionIndicator = selectionIndicator;
      }
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    shadows(val) {
      this.viewer.scene.shadowMap.enabled = val;
    },
    /**
     * Watcher
     * @override
     */
    shouldAnimate(val) {
      this.viewer.clock.shouldAnimate = val;
    },
    /**
     * Watcher
     * @override
     */
    terrainExaggeration(val) {
      this.viewer.scene._terrainExaggeration = val;
    },
    /**
     * Watcher
     * @override
     */
    terrainProvider(val) {
      this.viewer.terrainProvider = val;
    },
    /**
     * Watcher
     * @override
     */
    timeline(val) {
      const { viewer, viewerContainer, onTimelineScrubfunction } = this;
      if (
        Cesium.defined(viewer.timeline) &&
        !viewer.timeline.isDestroyed() &&
        !val
      ) {
        const timelineContainer = viewer.timeline.container;
        viewerContainer.removeChild(timelineContainer);
        viewer.timeline.destroy();
        viewer._timeline = undefined;
      }
      else if (
        !Cesium.defined(viewer.timeline) ||
        viewer.timeline.isDestroyed()
      ) {
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'cesium-viewer-timelineContainer';
        viewerContainer.appendChild(timelineContainer);
        const timeline = new Cesium.Timeline(timelineContainer, viewer.clock);
        timeline.makeLabel = time => this.localeDateTimeFormatter(time);
        timeline.addEventListener('settime', onTimelineScrubfunction, false);
        timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);
        viewer._timeline = timeline;
      }
      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    },
    /**
     * Watcher
     * @override
     */
    useDefaultRenderLoop(val) {
      this.viewer.useDefaultRenderLoop = val;
    },
    /**
     * Watcher
     * @override
     */
    vrButton(val) {
      const { viewer, viewerContainer, enableVRUI } = this;
      if (
        Cesium.defined(viewer.vrButton) &&
        !viewer.vrButton.isDestroyed() &&
        !val
      ) {
        const vrContainer = viewer.vrButton.container;
        viewerContainer.removeChild(vrContainer);
        viewer.vrButton.destroy();
        viewer._vrButton = undefined;
      }
      else if (
        !Cesium.defined(viewer.vrButton) ||
        viewer.vrButton.isDestroyed()
      ) {
        const vrContainer = document.createElement('div');
        vrContainer.className = 'cesium-viewer-vrContainer';
        viewerContainer.appendChild(vrContainer);
        const vrButton = new Cesium.VRButton(
          vrContainer,
          viewer.scene,
          viewerContainer
        );
        const viewModelCommand = vrButton.viewModel._command;
        vrButton.viewModel._command = function (VRButtonViewModel) {
          viewModelCommand();
          enableVRUI(viewer, VRButtonViewModel.isVRMode);
        };
        viewer._vrButton = vrButton;
      }
      viewer.forceResize();
      viewer.widgetResized.raiseEvent();
    }
  },
  /**
   * Vue hook
   * @override
   */
  mounted() {
    this.init();
  },
  /**
   * Vue hook
   * @override
   */
  created() {
    this._mounted = false;
  },
  /**
   * Vue hook
   * @override
   */
  destroyed() {
    const { viewer } = this;

    viewer.destroy();
    this.viewer = null;
    this._mounted = false;
  },
  methods : {
    /**
     * Enable VRUI mode
     *  @param {Object} viewer viewer instance
     *  @param {Boolean} enabled flag
     */
    enableVRUI(viewer, enabled) {
      const geocoder = viewer._geocoder;
      const homeButton = viewer._homeButton;
      const sceneModePicker = viewer._sceneModePicker;
      const projectionPicker = viewer._projectionPicker;
      const baseLayerPicker = viewer._baseLayerPicker;
      const animation = viewer._animation;
      const timeline = viewer._timeline;
      const fullscreenButton = viewer._fullscreenButton;
      const infoBox = viewer._infoBox;
      const selectionIndicator = viewer._selectionIndicator;
      const visibility = enabled ? 'hidden' : 'visible';
      if (Cesium.defined(geocoder)) {
        geocoder.container.style.visibility = visibility;
      }
      if (Cesium.defined(homeButton)) {
        homeButton.container.style.visibility = visibility;
      }
      if (Cesium.defined(sceneModePicker)) {
        sceneModePicker.container.style.visibility = visibility;
      }
      if (Cesium.defined(projectionPicker)) {
        projectionPicker.container.style.visibility = visibility;
      }
      if (Cesium.defined(baseLayerPicker)) {
        baseLayerPicker.container.style.visibility = visibility;
      }
      if (Cesium.defined(animation)) {
        animation.container.style.visibility = visibility;
      }
      if (Cesium.defined(timeline)) {
        timeline.container.style.visibility = visibility;
      }
      if (
        Cesium.defined(fullscreenButton) &&
        fullscreenButton.viewModel.isFullscreenEnabled
      ) {
        fullscreenButton.container.style.visibility = visibility;
      }
      if (Cesium.defined(infoBox)) {
        infoBox.container.style.visibility = visibility;
      }
      if (Cesium.defined(selectionIndicator)) {
        selectionIndicator.container.style.visibility = visibility;
      }
      if (viewer._container) {
        const right =
          enabled || !Cesium.defined(fullscreenButton)
            ? 0
            : fullscreenButton.container.clientWidth;
        viewer._vrButton.container.style.right = `${right}px`;
        viewer.forceResize();
      }
    },
    /**
     * Main initialisation
     * @returns {Boolean} True if executed
     */
    init() {
      if (this._mounted) {
        return false;
      }
      // this.Cesium = Cesium;
      const $el = this.$refs.viewer;
      Cesium.Ion.defaultAccessToken = this.accessToken;
      const {
        animation,
        baseLayerPicker,
        fullscreenButton,
        vrButton,
        geocoder,
        homeButton,
        infoBox,
        sceneModePicker,
        selectionIndicator,
        timeline,
        navigationHelpButton,
        navigationInstructionsInitiallyVisible,
        scene3DOnly,
        shouldAnimate,
        clockViewModel,
        selectedImageryProviderViewModel,
        imageryProviderViewModels,
        selectedTerrainProviderViewModel,
        terrainProviderViewModels,
        imageryProvider,
        terrainProvider,
        fullscreenElement,
        useDefaultRenderLoop,
        targetFrameRate,
        showRenderLoopErrors,
        automaticallyTrackDataSourceClocks,
        contextOptions,
        sceneMode,
        mapProjection,
        globe,
        orderIndependentTranslucency,
        creditContainer,
        creditViewport,
        dataSources,
        terrainExaggeration,
        shadows,
        terrainShadows,
        mapMode2D,
        projectionPicker,
        requestRenderMode,
        maximumRenderTimeChange
      } = this;

      const options = {
        animation,
        baseLayerPicker,
        fullscreenButton,
        vrButton,
        geocoder,
        homeButton,
        infoBox,
        sceneModePicker,
        selectionIndicator,
        timeline,
        navigationHelpButton,
        navigationInstructionsInitiallyVisible,
        scene3DOnly,
        shouldAnimate,
        clockViewModel,
        selectedImageryProviderViewModel,
        imageryProviderViewModels,
        selectedTerrainProviderViewModel,
        terrainProviderViewModels,
        imageryProvider : this.isObjectEmpty(imageryProvider)
          ? null
          : imageryProvider,
        terrainProvider,
        fullscreenElement : this.isObjectEmpty(fullscreenElement)
          ? this.$refs.viewer
          : fullscreenElement,
        useDefaultRenderLoop,
        targetFrameRate,
        showRenderLoopErrors,
        automaticallyTrackDataSourceClocks,
        contextOptions,
        sceneMode,
        mapProjection,
        globe,
        orderIndependentTranslucency,
        creditContainer,
        creditViewport,
        dataSources,
        terrainExaggeration,
        shadows,
        terrainShadows,
        mapMode2D,
        projectionPicker,
        requestRenderMode,
        maximumRenderTimeChange
      };
      this.clearEmpties(options);
      const viewer = new Cesium.Viewer($el, options);
      // fix iframe sandbox error executing scripts
      viewer.infoBox.frame.removeAttribute('sandbox');
      viewer.infoBox.frame.src = 'about:blank';

      if (Cesium.defined(this.camera)) {
        viewer.camera.setView({
          destination : Cesium.Cartesian3.fromDegrees(
            this.camera.position.lng,
            this.camera.position.lat,
            this.camera.position.height
          ),
          orientation : {
            heading : Cesium.Math.toRadians(this.camera.heading || 360),
            pitch   : Cesium.Math.toRadians(this.camera.pitch || -90),
            roll    : Cesium.Math.toRadians(this.camera.roll || 0)
          }
        });
      }
      /* By default, the `camera.changed` event will trigger when the camera has changed by 50%
         To make it more sensitive, we can bring down this sensitivity */
      viewer.camera.percentageChanged = 0.01; // 10%
      viewer.camera.changed.addEventListener(() => {
        const notSceneChange =
          viewer.camera.heading !== undefined &&
          viewer.camera.pitch !== undefined &&
          viewer.camera.roll !== undefined;
        /* Eye: changing scene mode sets camera with no heading, pitch and roll, triggers error */
        if (notSceneChange) {
          const cartographic = viewer.camera.positionCartographic;
          const camera = {
            position : {
              lng    : Cesium.Math.toDegrees(cartographic.longitude),
              lat    : Cesium.Math.toDegrees(cartographic.latitude),
              height : cartographic.height
            },
            heading : Cesium.Math.toDegrees(viewer.camera.heading),
            pitch   : Cesium.Math.toDegrees(viewer.camera.pitch),
            roll    : Cesium.Math.toDegrees(viewer.camera.roll)
          };
          this.$emit('update:camera', camera);
        }
      });
      if (Cesium.defined(viewer.animation)) {
        viewer.animation.viewModel.dateFormatter = this.localeDateTimeFormatter;
        viewer.animation.viewModel.timeFormatter = this.localeTimeFormatter;
      }
      if (Cesium.defined(viewer.timeline)) {
        viewer.timeline.makeLabel = time =>
          this.localeDateTimeFormatter(time);
        viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);
      }
      this.viewerContainer = viewer._element;
      if (Cesium.defined(Cesium.SuperMapImageryProvider) && !this.logo) {
        const credit = viewer.scene.frameState.creditDisplay;
        credit.container.removeChild(credit._logoContainer);
      }
      if (!this.credits) {
        viewer.cesiumWidget.creditContainer.style.display = 'none';
      }
      if (!this.logo) {
        const logoCreditElem = document.querySelector(
          '.cesium-credit-logoContainer'
        );
        logoCreditElem.style.display = 'none';
      }
      viewer.widgetResized = new Cesium.Event();
      viewer.imageryLayers.layerAdded.addEventListener(this.layerAdded);
      this.viewer = viewer;
      this.$emit('ready', { Cesium, viewer });
      this.$refs.loadingOverlay.style.display = 'none';
      this._mounted = true;
      return true;
    },
    /**
     * Raise layer after being added
     * @param {Object} layer Layer
     */
    layerAdded(layer) {
      if (this.viewer.baseLayerPicker) {
        this.viewer.imageryLayers.raiseToTop(layer);
      }
    },
    /**
     * locale DateTime Formatter
     * @param {Object} datetime Original date
     * @param {Boolean} viewModel flag
     * @param {Boolean} ignoredate flag
     * @returns {Date} Formatted Date
     */
    localeDateTimeFormatter(datetime, viewModel, ignoredate) {
      if (this.utcOffset) {
        datetime = Cesium.JulianDate.addMinutes(datetime, this.utcOffset, {});
      }
      const gregorianDT = Cesium.JulianDate.toGregorianDate(datetime);
      let objDT;
      if (ignoredate) {
        objDT = '';
      }
      else {
        objDT = new Date(
          gregorianDT.year,
          gregorianDT.month - 1,
          gregorianDT.day
        );
        objDT = `${gregorianDT.day} ${objDT.toLocaleString('en-us', {
          month : 'short'
        })} ${gregorianDT.year}`;
        if (viewModel || gregorianDT.hour + gregorianDT.minute === 0) {
          return objDT;
        }
        objDT += ' ';
      }
      return (
        objDT +
        Cesium.sprintf(
          `%02d:%02d:%02d ${this.tzCode}`,
          gregorianDT.hour,
          gregorianDT.minute,
          gregorianDT.second
        )
      );
    },
    /**
     * locale Time Formatter
     * @param {time} time Original time
     * @param {Boolean} viewModel flag
     * @returns {Date} Formatted time
     */
    localeTimeFormatter(time, viewModel) {
      return this.localeDateTimeFormatter(time, viewModel, true);
    },
    /**
     * Resize Toolbar on changes
     * @param {Object} parent Parent container
     */
    resizeToolbar(parent) {
      Array.prototype.slice.call(parent.children).forEach(element => {
        switch (element.className) {
          case 'cesium-viewer-geocoderContainer':
            element.customIndex = 1;
            break;
          case 'cesium-button cesium-toolbar-button cesium-home-button':
            element.customIndex = 2;
            break;
          case 'cesium-sceneModePicker-wrapper cesium-toolbar-button':
            element.customIndex = 3;
            break;
          case 'cesium-projectionPicker-wrapper cesium-toolbar-button':
            element.customIndex = 4;
            break;
          case 'cesium-button cesium-toolbar-button':
          case 'cesium-baseLayerPicker-dropDown':
            element.customIndex = 5;
            break;
          case 'cesium-navigationHelpButton-wrapper':
            element.customIndex = 6;
            break;
          default:
            break;
        }
      });
      const arr = [];
      Array.prototype.slice.call(parent.children).forEach(element => {
        arr.push(element);
      });
      arr.sort((a, b) => a.customIndex - b.customIndex);
      for (let i = 0; i < arr.length; i++) {
        parent.appendChild(arr[i]);
      }
    },
    /**
     * Determine if an object is empty
     * @param {Object} o object
     * @returns {Boolean} if empty
     */
    isObjectEmpty(o) {
      // eslint-disable-next-line guard-for-in
      for (const attr in o) {
        return !1;
      }
      return !0;
    },
    /**
     * Remove empty values from the object
     * @param {*} o Object
     */
    clearEmpties(o) {
      for (const attr in o) {
        if (o[attr] === null || o[attr] === undefined) {
          delete o[attr];
        }
        else if (typeof o[attr] === 'object') {
          if (this.isObjectEmpty(o[attr])) {
            delete o[attr];
          }
        }
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
