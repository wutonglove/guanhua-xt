<template>
  <div id='mind-map' @contextmenu="dismMenu">
    <div class="mind_wrap" @click="changeSelect" @keydown="changeSelect">
      <div :id="mindId" @mousedown="dragstart" @mouseup="dragend" @mousemove="dragin" ref="mind">
      </div>
    </div>
    <div class='map_ctrl'>
      <div class="map_ctrl_box">
        <div class="edit_ctrl">
          <ul class="btn_group" v-for="btns in ctrlBtnList">
            <li class="btn_item"
                :class="{disable:ctrlDisable}"
                v-for="btn in btns"
                @click="runComand(btn)"
            >
              <a href="javascript:void(0)">
                <i-icon :type="btn.icon"></i-icon>
                <span class="text">{{btn.name}}</span>
              </a>
            </li>
          </ul>
          <ul class="btn_group">
            <li class="btn_item" :class="{disable:ctrlDisable}">
              <i-select v-model="curFontSize"
                        size="small"
                        placement="top"
                        placeholder="字号"
                        :disabled="ctrlDisable"
                        style="width:70px"
                        @on-change="changeFSZ"
              >
                <i-option v-for="item in [12,16,18,24,32,48]" :value="item" :key="item">{{item + 'px'}}</i-option>
              </i-select>
            </li>
          </ul>
        </div>
        <div class="save_ctrl">
          <i-button size="large" class="preview_btn" @click="preview">预览</i-button>
          <i-button type="info" size="large" @click="save">保存</i-button>
        </div>
      </div>
      <mind-ctrl class="float_ctrl_box" @on-zoom="zoomed" :mindId="mindId"></mind-ctrl>
    </div>
    <insert-file-dialog @on-insert="insert"></insert-file-dialog>
    <unfold></unfold>
  </div>
</template>

<script>
  import JsMind from 'jsmind';
  import jsonp from 'api/jsonp';
  import 'jsmind/style/jsmind.css';
  import $ from 'jquery';

  import IButton from 'iview/src/components/button';
  import IIcon from 'iview/src/components/icon';
  import IMenu from 'iview/src/components/menu';
  import IMenuItem from 'iview/src/components/menu-item';
  import IMenuGroup from 'iview/src/components/menu-group';
  import ISelect from 'iview/src/components/select';
  import IOption from 'iview/src/components/select/option';

  import MindCtrl from 'components/empty-part/mind-ctrl/mind-ctrl';
  import InsertFileDialog from 'base/insertFile/insertFile';
  import Unfold from 'base/unfoldDialog/unfoldDialog';
  import {mapMutations} from 'vuex';

  const MindConfig = {
    container: 'map_cnt',
    editable: true,
    theme: 'orange'
  };

  export default {
    data() {
      return {
        mindId: MindConfig.container,
        dragstate: false,
        oriStyle: '',
        startX: null,
        startY: null,
        ctrlBtnList: [
          [
            {
              name: '插入下级节点',
              icon: 'fork-repo',
              command: 'newNode'
            },
            {
              name: '插入图片节点',
              icon: 'image',
              command: 'newImgNode'
            }
          ],
          [
            {
              name: '上移',
              icon: 'arrow-up-c',
              command: 'before'
            },
            {
              name: '下移',
              icon: 'arrow-down-c',
              command: 'after'
            },
            {
              name: '置顶',
              icon: 'ios-upload',
              command: 'first'
            },
            {
              name: '置底',
              icon: 'ios-download',
              command: 'last'
            }
          ],
          [
            {
              name: '编辑',
              icon: 'compose',
              command: 'edit'
            },
            {
              name: '删除',
              icon: 'trash-b',
              command: 'delete'
            }
          ]
        ],
        curFontSize: '',
        selectNode: null
      };
    },
    mounted() {
      window.jsMind = JsMind;
      jsonp('/static/plugs/jsmind/jsmind.draggable.js')
        .then(() => {
          return jsonp('/static/plugs/jsmind/jsmind.screenshot.js');
        })
        .then(() => {
          this.initMind();
        });
    },
    computed: {
      ctrlDisable() {
        return !this.selectNode;
      }
    },
    methods: {
      initMind() {
        this.jm = new JsMind(MindConfig);
        let data = {
          meta: {
            name: '',
            author: '',
            version: '1.0'
          },
          format: 'node_array',
          data: [{id: 'root', isroot: true, topic: '中心主题'}]
        };
        this.jm.show(data);
      },
      changeSelect() {
        this.selectNode = this.jm.get_selected_node();
        if (this.selectNode) {
          this.curFontSize = this.selectNode.data['font-size'] || '';
        } else {
          this.curFontSize = '';
        }
      },
      dragstart(e) {
        if (e.which === 3) {
          this.dragstate = true;
          this.startX = e.x;
          this.startY = e.y;
          let _style = $(this.$refs.mind).find('canvas').css('transform');
          this.oriStyle = _style === 'none' ? '' : _style;
        }
      },
      dragin(e) {
        if (this.dragstate) {
          let offsetX = e.x - this.startX;
          let offsetY = e.y - this.startY;
          let _style = {
            transform: `${this.oriStyle} translate(${offsetX}px,${offsetY}px)`
          };
          $(this.$refs.mind).find('canvas').css(_style);
          $(this.$refs.mind).find('.theme-orange').css(_style);
        }
      },
      dragend(e) {
        this.dragstate = false;
        this.startX = null;
        this.startY = null;
        this.oriStyle = '';
      },
      dismMenu(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      runComand(btn) {
        if (!this.selectNode) return;
        switch (btn.command) {
          case 'newNode':
            this.addNewNode();
            break;
          case 'newImgNode':
            this.addImgNode();
            break;
          case 'first':
            this.moveToFirst();
            break;
          case 'last':
            this.moveToLast();
            break;
          case 'before':
            this.moveBefore();
            break;
          case 'after':
            this.moveAfter();
            break;
          case 'edit':
            this.openEdit();
            break;
          case 'delete':
            this.deleteNode();
            break;
        }
      },
      addNewNode() {
        let nodeid = JsMind.util.uuid.newid();
        let topic = '*分支主题*';
        this.jm.add_node(this.selectNode, nodeid, topic);
        this.jm.select_node(nodeid);
        this.openEdit();
      },
      showInsert() {
        this.setFileDia({
          name: '插入图片',
          type: 'image',
          status: true
        });
      },
      insert(file) {
        this.getBase64(file.original)
          .then((url) => {
            return this.getImgSize(url);
          })
          .then((img) => {
            let ratio = img.w / img.h;
            let width = +img.w > 400 ? 400 : img.w;
            let height = +img.w > 400 ? (400 / ratio) : img.h;
            let data = {
              'background-image': img.src,
              width,
              height
            };
            let nodeid = JsMind.util.uuid.newid();
            let topic = null;
            this.jm.add_node(this.selectNode, nodeid, topic, data);
            this.jm.select_node(nodeid);
          });
      },
      addImgNode() {
        this.showInsert();
      },
      moveToFirst() {
        let selectedId = this.selectNode.id;
        this.jm.move_node(selectedId, '_first_');
      },
      moveToLast() {
        let selectedId = this.selectNode.id;
        this.jm.move_node(selectedId, '_last_');
      },
      moveBefore() {
        let selectedId = this.selectNode.id;
        let prevNode = this.jm.find_node_before(selectedId);
        if (prevNode) {
          let prevNodeId = prevNode.id;
          this.jm.move_node(selectedId, prevNodeId);
        }
      },
      moveAfter() {
        let selectedId = this.selectNode.id;
        let afterNode = this.jm.find_node_after(selectedId);
        afterNode = this.jm.find_node_after(afterNode);
        if (afterNode) {
          let afterId = afterNode.id;
          this.jm.move_node(selectedId, afterId);
        }
      },
      openEdit() {
        if (!this.selectNode) return;
        let nodeid = this.selectNode.id;
        this.jm.begin_edit(nodeid);
      },
      deleteNode() {
        if (!this.selectNode) return;
        let nodeid = this.selectNode.id;
        this.jm.remove_node(nodeid);
      },
      changeFSZ() {
        if (!this.selectNode) return;
        let nodeid = this.selectNode.id;

        if (typeof +this.curFontSize === 'number' && this.curFontSize !== '') {
          this.jm.set_node_font_style(nodeid, this.curFontSize);
        }
      },
      zoomed(zoom) {
        $('#' + this.mindId).css({transform: `scale(${zoom / 50})`});
      },
      preview() {
        this.$emit('on-preview');
      },
      save() {
        this.$emit('on-save');
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };

          if (file) {
            reader.readAsDataURL(file);
          }
        });
      },
      getImgSize(url) {
        return new Promise((resolve, reject) => {
          let img = document.createElement('img');
          img.src = url;
          img.onload = function () {
            resolve({src: img.src, w: img.naturalWidth, h: img.naturalHeight});
          };
        });
      },
      getQuestionData(urlSnippet) {
        var mindData = this.jm.get_data('node_array');
        var mindString = JsMind.util.json.json2string(mindData);
        let questionData = {
          title: document.title,
          mindData: mindString,
          questionType: 'mind-map'
        };
        let localData = questionData;
        return {
          questionData,
          localData
        };
      },
      ...mapMutations({
        setFileDia: 'SET_FILEDIALOGINFO'
      })
    },
    components: {
      IButton,
      IIcon,
      IMenu,
      IMenuItem,
      IMenuGroup,
      ISelect,
      IOption,
      MindCtrl,
      InsertFileDialog,
      Unfold
    }
  };
</script>

<style lang='stylus'>
  #mind-map
    width: 100%
    height: 100%
    background-color: #F8EFDE
    position: relative
    display: flex
    flex-direction: column
    .mind_wrap
      flex: 1
      bottom: 60px
      overflow: hidden
      #map_cnt
        width: 100%
        height: 100%
        .jsmind-inner
          overflow: hidden
    .map_ctrl
      flex: 0 0 60px
      height: 60px
      line-height: 50px
      background-color: #F0F0F0
      border-top: 1px solid #CFCFCF
      position: relative
      .map_ctrl_box
        width: 100%
        max-width: 880px
        display: flex
        margin: 0 auto
        padding: 3px 0
        .edit_ctrl
          flex: 1
          .btn_group
            display: inline-block
            text-align: center
            font-size: 14px
            height: 100%
            line-height: 26px
            vertical-align: middle
            border-right: 1px solid #D8D8D8
            padding: 0 15px
            .btn_item
              display: inline-block
              &:not(.disable):hover
                background-color: rgba(0, 0, 0, .1)
              a
                display: block
                width: 100%
                height: 100%
                color: #000
                padding: 0 5px
                &:hover
                  color: #11B0B6
              &.disable
                a
                  color: #aaa
                  cursor: default
            &:nth-child(1)
              width: 145px
            &:nth-child(2)
              width: 145px
            &:nth-child(3)
              width: 85px
            &:nth-child(4)
              width: 100px
              .btn_item
                margin-top: 13px
        .save_ctrl
          flex: 0 0 200px
          .preview_btn
            margin-right: 20px
      .float_ctrl_box
        position: absolute
        top: -60px
        left: 20px
        z-index: 1000
</style>
