<template>
  <div class="ov-container">

    <div id="map" class="map"></div>

    <div class="dialog-style">
      <el-button type="primary" @click="showModal">
        Modal
      </el-button>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!--        // 弹出层-->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>

    <!--        <div class="css_animation"></div>-->
  </div>
</template>

<script>
  import 'ol/ol.css';
  import Map from 'ol/Map';
  import OSM from 'ol/source/OSM';
  import View from 'ol/View';
  import Tile from "ol/layer/Tile";
  import XYZ from "ol/source/XYZ";
  import Overlay from 'ol/Overlay'
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import Style from 'ol/style/Style';
  import Icon from 'ol/style/Icon';
  import Point from 'ol/geom/Point';
  import Feature from 'ol/Feature';


  export default {
    name: "mapsPr",
    data() {
      return {
        map: null,
        coordinate:null,
        datamap:[{
          jd: 123.4151,
          wd: 41.7624
        }],
        dialogVisible: false
      }
    },
    mounted(){
      this.initMap()

      //初始化坐标值设置
      this.coordinate =
              "X:" +
              this.map
                      .getView()
                      .getCenter()[0]
                      .toFixed(4) +
              ",Y:" +
              this.map
                      .getView()
                      .getCenter()[1]
                      .toFixed(4);
      this.map.on("pointermove", event => {
        this.coordinate =
                "X:" +
                event.coordinate[0].toFixed(4) +
                ",Y:" +
                event.coordinate[1].toFixed(4);
      });
    },

    methods: {
      showModal() {
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {
                });
      },
      initMap() {
        var radius = 0;

        // Open Street Map 地图层
        var openStreetMapLayer = new Tile({
          source: new XYZ({
            url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'

          })
        });

        //layers、target、view是地图最基本的部分，是必需的
        // 创建地图
        var map = new Map({
          target: document.getElementById("map"),
          layers: [
            openStreetMapLayer
          ],
          view: new View({
            // 设置成都为地图中心
            // center: [104.06, 30.67],

            // 设置沈阳卫星图center = [117.16593571717, 39.07954943065484];
            center: [123.4132969379425, 41.7663024391555],
            // center: [117.16593571717, 39.07954943065484],
            projection: 'EPSG:4326',
            zoom: 10
          }),
        });

/////////////////////////在地图上添加图标////////////////////////////////////////////////////////

        //创建图标样式
        var iconStyle = new Style({
          image: new Icon({
            // scale: 0.03,
            opacity: 1,
            // src: "https://openlayers.org/en/latest/examples/data/icon.png"
            src: require("../../assets/Mark.png")
          }),
        });


        // 1.创建Featrue,设置geometry属性
        var feature = new Feature({

          geometry: new Point([this.datamap[0].jd, this.datamap[0].wd]),
          name: "Point"
        });

        //3.传入source
        var source = new VectorSource({
          features: [feature]
        });
        //创建图标层
        var vectorLayer = new VectorLayer({
          // source: vectorSource,
          source: source,
          style: iconStyle
        });


        // map.addLayer(openStreetMapLayer);
        map.addLayer(vectorLayer);

///////////////////////点击图标弹出框框/////////////////##############################

        var container = document.getElementById("popup");
        var content = document.getElementById("popup-content");
        var popupCloser = document.getElementById("popup-closer");

        var overlay = new Overlay({
          element: container,
          autoPan: true
        });

        map.on('click',function(e){
          var pixel = map.getEventPixel(e.originalEvent);
          console.log(pixel);
          map.forEachFeatureAtPixel(pixel,function(feature){
            //console.log(feature);
            //return feature;
            var coodinate = e.coordinate;
            content.innerHTML = "<p>你点击的坐标为：" + coodinate + "</p>";
            overlay.setPosition(coodinate);
            map.addOverlay(overlay);
          });
        });
        popupCloser.addEventListener('click',function(){
          overlay.setPosition(undefined);
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  .ov-container {
    background: #fff;
    padding: 10px;

    .map {
      position: relative;
      width: 100%;
      height:calc(100vh - 100px);
      border-radius: 10px;
    }

    .dialog-style {
      position: absolute;
      top: 100px;
      left: 200px;

      .el-button {
        background: rgba(22,1,1, 0.7);
        opacity: 0.5;
        color: #fff;
        border-color: #E1DED9;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      }
    }

    a.skiplink {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    a.skiplink:focus {
      clip: auto;
      height: auto;
      width: auto;
      background-color: #fff;
      padding: 0.3em;
    }
    #map:focus {
      outline: #4A74A8 solid 0.15em;
    }
  }

  .css_animation{
    height:50px;
    width:50px;
    border-radius: 25px;
    background: rgba(255, 0, 0, 0.9);
    transform: scale(0);
    animation: myfirst 3s;
    animation-iteration-count: infinite;
  }

  @keyframes myfirst{
    to{
      transform: scale(2);
      background: rgba(0, 0, 0, 0);
    }
  }

  .ol-popup {
    position: absolute;
    background-color: #eeeeee;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }

  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: #eeeeee;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }

  .ol-popup-closer:after {
    content: "✖";
  }
</style>
