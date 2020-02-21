<template>
  <div id="app">
    <!-- <FamilyTable :people="allData" /> -->
    <div class="family">
      <Relation
        v-for="(relation, idx) in family"
        :key="idx"
        :people="relation.people"
        :children="relation.children"
      />
    </div>
  </div>
</template>

<script>
import Relation from "./components/Relation";
import FamilyTable from "./components/FamilyTable";
import axios from "axios";

export default {
  name: "App",
  components: {
    Relation,
    FamilyTable
  },
  data: function() {
    return {
      allData: [],
      family: [],
      relations: [],
      people: {},
      relationMap: {},
      pendingParents: {}
    };
  },
  mounted() {
    axios
      .get(
        "https://v2-api.sheety.co/6969442d9e95310b90a6eb3a9ca14fa3/familyTree/person"
      )
      .then(response => {
        this.allData = response.data.person;
        this.parseRelations(response.data.person);
      });
  },
  methods: {
    parseRelations: function(people) {
      const family = [];
      for (let i = 0; i < people.length; i++) {
        const person = people[i];
        this.people[person.id] = person;
        // Add to relation
        if (person.spouse && this.people[person.spouse]) {
          const relationshipIdx = this.relationMap[person.spouse];
          this.relations[relationshipIdx].people.push(person);
          this.relationMap[person.id] = relationshipIdx;
        }
        // Create relation
        else {
          this.relationMap[person.id] = this.relations.length;
          this.relations.push({
            people: [person]
          });
        }
        const relIdx = this.relationMap[person.id];
        const relation = this.relations[relIdx];

        // Add to parent
        if (person.father || person.mother) {
          if (this.people[person.father]) {
            const parentRelIdx = this.relationMap[person.father];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else if (this.people[person.mother]) {
            const parentRelIdx = this.relationMap[person.mother];
            this.relations[parentRelIdx].children =
              this.relations[parentRelIdx].children || [];
            this.relations[parentRelIdx].children.push(relation);
          } else {
            if (person.father) {
              this.pendingParents[person.father] =
                this.pendingParents[person.father] || [];
              this.pendingParents[person.father].push(person.id);
            }
            if (person.mother) {
              this.pendingParents[person.mother] =
                this.pendingParents[person.mother] || [];
              this.pendingParents[person.mother].push(person.id);
            }
          }
        } else {
          if (family.indexOf(relation) == -1) {
            family.push(relation);
          }
        }

        // Clean pending parents
        if (Object.keys(this.pendingParents).indexOf("" + person.id) > -1) {
          relation.children = relation.children || [];
          const currentParent = this.pendingParents[person.id];
          for (let i = 0; i < currentParent.length; i++) {
            const currChildRelIdx = this.relationMap[currentParent[i]];
            if (
              relation.children.indexOf(this.relations[currChildRelIdx]) == -1
            ) {
              relation.children.push(this.relations[currChildRelIdx]);
            }
          }
          delete this.pendingParents[person.id];
        }
      }

      this.family = family.filter(
        rel =>
          !rel.people.filter(person => person.father || person.mother).length
      );
    }
  }
};
</script>

<style>
#app {
}
.family {
  display: flex;
}
</style>
