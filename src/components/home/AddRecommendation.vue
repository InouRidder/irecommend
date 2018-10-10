<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="row">
              <i class="close material-icons" @click="$emit('close')">close</i>
            <form class="col s12" @submit.prevent="addRecommendation">
              <div class="row">
                <div class="input-field col s12">
                  <input id="title" type="text" class="validate" v-model="title">
                  <label for="title">Title</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="textarea2" class="materialize-textarea" data-length="120" v-model="description"></textarea>
                  <label for="textarea2">Textarea</label>
                </div>
              </div>
              <div class="row">
                <div class="col s12 types">
                  <label>
                    <input type="checkbox" value="Eat" v-model="selectedTypes"/>
                    <span>Eat</span>
                  </label>
                  <label>
                    <input type="checkbox" value="Do" v-model="selectedTypes"/>
                    <span>Do</span>
                  </label>
                  <label>
                    <input type="checkbox" value="See" v-model="selectedTypes"/>
                    <span>See</span>
                  </label>
                </div>
              </div>
            <div class="row center-align">
              <h4 class="red-text" v-if="feedback">
                {{feedback}}
              </h4>
              <button class="btn waves-effect waves-light" @click.prevent="addRecommendation">Add!
                <i class="material-icons right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'AddRecommendation',
    props: ['coords'],
    data() {
      return {
        feedback: null,
        title: null,
        description: null,
        selectedTypes: [],
        tags: [],
        types: ["Eat", "Do", "See"]
      }
    },
    methods: {
      addRecommendation() {
        if (this.title && this.description && this.selectedTypes.length > 0) {
          this.feedback = null
          this.$emit('addRecommendation', {title: this.title, description: this.description, selectedTypes: this.selectedTypes })
        } else {
          this.feedback = "Please fill in all fields"
        }
      }
    }

  }
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

@media (max-width: 500px) {

  .modal-container {
    width: 100%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}

@media (min-width: 500px) {

  .modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}

.modal-default-button {
  float: right;
}
.types {
  display: flex;
  justify-content: space-between;
}

.close {
  float: right;
  cursor: pointer;
}


</style>
