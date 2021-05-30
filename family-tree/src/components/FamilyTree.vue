<template>
  <div class="family-tree">
    <Relation
      v-for="(relation, idx) in family"
      :key="idx"
      :people="relation.people"
      :children="relation.children"
      :expanded="expanded"
    />
  </div>
</template>

<script>
import Relation from "./Relation";

export default {
  name: "FamilyTree",
  components: {
    Relation
  },
  props: {
    people: Object,
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      family: [],
      relations: [],
      relationMap: {},
      pendingParents: {}
    };
  },
  mounted: function() {
    this.parseRelations();
  },
  methods: {
    parseRelations: function() {
      const family = [];
      const people = {};
      for (const idx in this.people) {
        // Add to relation
        const person = this.people[idx];
        people[idx] = person;
        if (person.spouse && people[person.spouse]) {
          const relationshipIdx = this.relationMap[person.spouse];
          this.relations[relationshipIdx].people.push(person);
          this.relationMap[person.personId] = relationshipIdx;
        }
        // Create relation
        else {
          this.relationMap[person.personId] = this.relations.length;
          this.relations.push({
            people: [person]
          });
        }
        const relIdx = this.relationMap[person.personId];
        const relation = this.relations[relIdx];

        // Add to parent
        if (
          (person.father && this.people[person.father]) ||
          (person.mother && this.people[person.mother])
        ) {
          if (people[person.father]) {
            const parentRelIdx = this.relationMap[person.father];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else if (people[person.mother]) {
            const parentRelIdx = this.relationMap[person.mother];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else {
            if (person.father) {
              this.pendingParents[person.father] =
                this.pendingParents[person.father] || [];
              this.pendingParents[person.father].push(person.personId);
            }
            if (person.mother) {
              this.pendingParents[person.mother] =
                this.pendingParents[person.mother] || [];
              this.pendingParents[person.mother].push(person.personId);
            }
          }
        } else {
          if (family.indexOf(relation) == -1) {
            family.push(relation);
          }
        }

        // Clean pending parents
        if (Object.keys(this.pendingParents).indexOf("" + person.personId) > -1) {
          relation.children = relation.children || [];
          const currentParent = this.pendingParents[person.personId];
          for (let i = 0; i < currentParent.length; i++) {
            const currChildRelIdx = this.relationMap[currentParent[i]];
            if (
              relation.children.indexOf(this.relations[currChildRelIdx]) == -1
            ) {
              relation.children.push(this.relations[currChildRelIdx]);
            }
          }
          delete this.pendingParents[person.personId];
        }
      }

      this.family = family.filter(
        rel =>
          !rel.people.filter(
            person =>
              (person.father && people[person.father]) ||
              (person.mother && people[person.mother])
          ).length
      );
    }
  }
};
</script>
<style>
.family-tree {
  display: flex;
}
.family {
  display: flex;
  border: 2px solid #ccc;
  border-radius: 20px;
}
</style>
