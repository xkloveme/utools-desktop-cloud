<template>
  <Window :uuid='uuid' :startpos_x="startpos_x" :startpos_y="startpos_y" :zindex="zindex"  :minimized="minimized" @resize_start="show_blocker=true" @resize_end="show_blocker=false">
    <template v-slot:header>
        <!-- <img src="../../assets/images/icons/vscode.png" alt="" style="pointer-events:none;" class=" tw-w-8 tw-h-7 tw-ml-4"> -->
      <!-- <div class="tw-flex tw-items-center tw-select-none" style="pointer-events:none;"> 
     
        <div class=" tw-ml-4 tw-font-semibold tw-tracking-wider tw-h-8 tw-rounded-lg tw-px-4 tw-py-1  tw-text-white tw-bg-mygray-b13 hover:tw-bg-mygray-b14 " style="pointer-events:auto;max-width:400px;white-space:nowrap;text-overflow: ellipsis;overflow: hidden;">Visual Studio Code </div>
      </div> -->
    </template>
    <template v-slot:content>
         <input type="text" v-model="value">
    </template>
  </Window>
</template>

<script>
import Window from '../WindowBasic/Window.vue'

export default {
  name: 'WindowTerminal',
  components: {
    Window,
  },
  data(){
    return {
      show_blocker:false,
      value:'',
    }
  },
  props:{
    uuid:String,
    startpos_x:{
      default:60,
    },
    startpos_y:{
      default:30
    },
    zindex:{
      type:Number,
      default:99999,
    },
    minimized:{
      type:Boolean,
      default:false,
    },
  },
  created(){
  },
  mounted(){
  },
  watch:{
  },
  computed:{
  },
  methods:{
    go_focus(){
      this.$store.commit('refresh_window_focus', {'type':'vscode'})
    },
    handleChangeUrl(){
      console.log(1)
    }
  }
}
</script>

<style scoped>
.zoomined-frame{
  /* width: 80% !important;
  height: 80% !important;
  -webkit-transform: scale(1.25);
  transform: scale(1.25);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0; */
  width: 100%;
  height: 100%;
}
</style>
