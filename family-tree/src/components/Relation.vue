<template>
  <div class="relation">
    <div class="family">
      <Person v-for="(person,idx) in people" :key="idx" :personInfo="person" />
    </div>
    <template v-if="children">
      <div
        class="expand-children"
        :class="{expanded: expanded || showChildren}"
        @click="showChildren=!showChildren"
      ></div>
      <CollapseTransition>
        <div class="all-children" v-if="expanded || showChildren">
          <Relation
            v-for="(relation, idx) in children"
            :key="idx"
            :people="relation.people"
            :children="relation.children"
            :expanded="expanded"
          />
        </div>
      </CollapseTransition>
    </template>
  </div>
</template>
<script>
import Person from "./Person";
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "Relation",
  components: {
    Person,
    CollapseTransition
  },
  props: {
    people: Array,
    children: Array,
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      showChildren: false
    };
  }
};
</script>
<style scoped>
.relation {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.expand-children {
  height: 20px;
  width: 20px;
  display: inline-block;
  border-radius: 50%;
  background: #080;
  vertical-align: middle;
  text-align: center;
  line-height: 18px;
  transition: background 1s ease;
}
.expand-children:hover {
  background: #12b012;
}
.expand-children.expanded {
  background: #ba2222;
}
.expand-children.expanded:hover {
  background: #f00;
}
.expand-children::after {
  content: "+";
  font-size: 16px;
  color: white;
  cursor: pointer;
}
.expand-children.expanded::after {
  content: "-";
}
.all-children {
  display: flex;
}
</style>