<template>
  <div class="relation">
    <Person v-for="(person,idx) in people" :key="idx" :personInfo="person" />
    <template v-if="children">
      <div
        class="expand-children"
        :class="{expanded: showChildren}"
        @click="showChildren=!showChildren"
      ></div>
      <div class="all-children" v-if="showChildren">
        <Relation
          v-for="(relation, idx) in children"
          :key="idx"
          :people="relation.people"
          :children="relation.children"
        />
      </div>
    </template>
  </div>
</template>
<script>
import Person from "./Person";

export default {
  name: "Relation",
  components: {
    Person
  },
  props: {
    people: Array,
    children: Array
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
  margin: 40px 0;
  padding-left: 50px;
  border-left: 2px solid #000;
}
.expand-children {
  height: 40px;
  width: 40px;
  display: inline-block;
  border-radius: 50%;
  background: green;
  vertical-align: middle;
  text-align: center;
  line-height: 36px;
}
.expand-children.expanded {
  background: red;
}
.expand-children::after {
  content: "+";
  font-size: 35px;
  color: white;
  cursor: pointer;
}
.expand-children.expanded::after {
  content: "-";
}
</style>